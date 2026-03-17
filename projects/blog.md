# NanoGPT Speedrunning

The [modded-nanogpt](https://github.com/KellerJordan/modded-nanogpt) speedrun is a competition to train GPT-2 (124M) to 3.28 cross-entropy loss on the FineWeb validation set as fast as possible on 8xH100. As of writing, the record is 86.1s, > 30x faster than the original 45' [llm.c baseline](https://github.com/karpathy/llm.c/discussions/481).

As a somewhat-bitter-lesson-pilled researcher, I'm interested in this competition because it let's me try ideas on both ends of what makes good practical research: new architectures/training methods as well as optimizations. So, in this blog I'll walk through my two NanoGPT submissions: test-time training ("Notable run") and a kernel optimization ("Record #76").

## Test-time training (notable run)

![TTT lowers loss across checkpoints loaded from the baseline run](https://github.com/user-attachments/assets/5e0bf8f7-c4e7-4ecf-9123-634143be7984)


[PR #205](https://github.com/KellerJordan/modded-nanogpt/pull/205) · Jan 2026

The idea of turning each test sample into an unsupervised learning problem -- test-time training (TTT) -- [comes originally from image classification](https://yueatsprograms.github.io/ttt/home.html) and has been extended to language models in many recent works ([Bansal et al.](https://arxiv.org/abs/2512.13898), [Kuwataka & Suzuki](https://arxiv.org/abs/2509.25741), [Tandon et al.](https://arxiv.org/abs/2512.23675)). In short, it works because learning to model `P(x)` often helps in predicting `P(y|x)`.

Here, we use a very simple instantiation based on the insight that modeling the context can help predict what comes after the context. Don't change training at all; instead, before predicting `P(token | context)` during validation, take a gradient step to improve `P(context)`. The model resets after every sequence, so there's no dependence on the validation set — it's still just `P(token | context, θ)`, except θ gets a quick update on x first.

In this very-low-data speedrun setting, it is clear why this could help: the training sees very little contexts, so any slight difference in distribution could hurt the model, and this helps to mitigate that. Furthermore, over 1/3 of validation sequences are longer than the longest sliding window during training (1664 tokens), and over 1/4 are longer than the validation window (2560 tokens). So ~13% of tokens are predicted without conditioning on part of the sequence. TTT lets us encode that missing context in the weights instead.

![Many validation sequences exceed the model's context window](https://github.com/user-attachments/assets/f02e209d-26a9-40aa-8fe8-45ea42e243d1)

Naively applying this idea is prohibitively expensive: to measure validation loss on token `x_t`, we need to train on context `x_{0...t-1}`, meaning `L` forward-backward passes for each sequence of length `L` (instead of a single forward pass to calculate the loss without TTT).

I first tried updating all parameters, but this was unstable. The issue is the optimizer split: modded-nanogpt uses Adam for embeddings and a few other params, and NorMuon (a Muon variant) for the bulk of the network. NorMuon normalizes its updates to stay near the orthogonal manifold — during training this is fine because the gradients come from large batches (~50k tokens/GPU) and the learning rate is scheduled. During TTT you're taking gradient steps on a single sequence of ~512 tokens. The gradient is extremely noisy relative to what NorMuon expects, and because NorMuon normalizes the update regardless, that noise gets projected into a full-magnitude step. Adam is much more forgiving here: its running variance estimates naturally dampen noisy gradients, so even without being well-calibrated for the TTT regime, it doesn't blow up. Freezing NorMuon params and only updating Adam params fixed the instability and was also slightly faster.

The implementation breaks each sequence into chunks. For each chunk: evaluate loss, then take a gradient step (Adam only, NorMuon frozen). Mean sequence is <700 tokens with `chunk_size=512` and `grad_steps=1`, so it's <2 forward-backward passes per sequence on average. Note that this is still much more expensive, but the goal of this implementation was a simple proof-of-concept rather than a well-optimized implementation.

```python
for seq in validation_sequences:
    model.load_state_dict(initial_model_state)  # reset per sequence
    optimizer.reset()
    
    for i in range(num_chunks):
        chunk_loss = model(seq[:chunk_end], mask=chunk_only)
        total_loss += chunk_loss
        
        train_loss = model(seq[train_start:chunk_end])
        train_loss.backward()
        optimizer.step()  # Adam only
```

This let us cut training from 1600 to 1570 steps — a 3.4s improvement — while still hitting the loss target. Put differently, an average of ~1.3 gradient steps per sequence at test time gave the same loss improvement as 30 additional training steps over the full dataset. That's a good sign that this isn't just "training more" — the per-sequence adaptation is doing something qualitatively different from extra SGD on the training distribution.

```
losses = [3.2766, 3.2778, 3.2769]    mean = 3.2771
times  = [95.515, 95.520, 95.498]    mean = 95.511s
```

This was added to the README as a "notable run" rather than an official record — TTT adds ~2 minutes of eval time, which is expensive for other competitors and complicates dev iteration. Fair enough; they want to keep the competition simple and cheap to test against.

One interesting finding from the PR discussion: training just a per-dimension scaling factor on the final layer barely helps (~0.01 loss), but training the full MLP while freezing everything else recovers ~half the benefit. So the TTT updates are doing something more than learning a unigram model, but the updates are still pretty simple.

![TTT improvement is zero for early token positions, showing it's not just "training on test"](https://github.com/user-attachments/assets/4a17872a-07af-4c89-a787-0626921ed669)

## Backward transpose kernel (official record)

[PR #240](https://github.com/KellerJordan/modded-nanogpt/pull/240) · Mar 2026

This one was a lot simpler. During the backward pass of `FusedSoftcappedCrossEntropy`, there's a `.T.contiguous()` call to prepare a weight matrix for the FP8 weight-gradient matmul. On the large tensors involved (up to 49152 × 50304 in stage 3), this dispatches a generic elementwise copy kernel. I replaced it with a tiled Triton transpose kernel.

The reason this helps is a memory coalescing issue. On a GPU, threads in a warp need to read/write adjacent memory addresses to get full bandwidth — this is coalescing. A naive transpose copy can only get coalescing on one side: either your reads are coalesced (iterating over rows of the source) and writes are scattered, or vice versa. PyTorch's generic `copy_` kernel for `.T.contiguous()` falls into this trap — it launches a 75k-block elementwise kernel with non-coalesced writes that wastes a ton of memory bandwidth. And because these matrices are huge (up to 2.5B elements), that slow kernel sits on the SMs long enough to also block NCCL all-reduce from overlapping. A tiled transpose kernel fixes both sides: load a 64×128 tile from the source with coalesced reads, transpose in-register via `tl.trans()`, then write the transposed tile to the destination — also coalesced. Both reads and writes hit full bandwidth, so the kernel approaches the memory-bandwidth limit. For the stage 3 matrix (49152 × 50304 in fp8, ~2.3 GB), that's 2.17ms → 1.77ms. The offsets also need to be int64 since that matrix exceeds int32 address space at ~2.5B elements.

Per-call microbenchmarks on 1xH100:

```
CE backward stage 1: (16384, 50304)  0.769ms → 0.588ms  1.31x
CE backward stage 2: (32768, 50304)  1.451ms → 1.179ms  1.23x
CE backward stage 3: (49152, 50304)  2.170ms → 1.768ms  1.23x
```

End-to-end over 6 runs:

```
Baseline: 88.377s ± 0.097
This PR:  87.936s ± 0.193
Delta:    -0.441s
```

![End-to-end timing results](https://github.com/user-attachments/assets/ae2db527-31d1-4da7-a285-1c44dcb7bd25)

This one got merged. Record at the time: 86.8s.
