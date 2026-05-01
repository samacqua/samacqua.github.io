# Fixing flow model evals

[Flow models](https://flow-maps.github.io/) are a very promising alternative to autoregression, especially in the few-step regime. Yet, the current way of evaluating these models is ripe for misinterpretation and needs rethinking.

Unlike autoregressive models, flow models cannot tractably calculate the likelihood of a given string of text. So the standard evaluation is to first sample text from your trained flow model, then score these generated samples using two proxy metrics:

- **Generative perplexity (gen. ppl):** Calculate the perplexity of samples under a pretrained model (`gpt2-large` is the standard). This is analogous but distinct from the standard evaluation of calculating perplexity using your model itself on some held out data.
- **Entropy:** compute the empirical token entropy ($-\sum_i p_i \log p_i$) of each generated sample, then average across samples. This is to ensure that the generated samples are not degenerate (e.g. *"aaaaa..."* has low gen. perplexity but also an entropy of 0).

How can we evaluate these evaluation metrics? Let's apply this framework to a family of models for which we have a clear understanding of model quality: the [GPT-2 family](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf). As we scale from `gpt2-small` (117M) to `gpt2-medium` (342M) to `gpt2-large` (762M) to `gpt2-xl` (1.5B) the perplexity and accuracy across many domains smoothly improves. However, when you sample from these models (t=1) and calculate the generative perplexity (defined above), `gpt2-small` seems better than `gpt2-medium`, and `gpt2-large` seems better than `gpt2-xl` while the entropies only vary by < 0.4 nats.

<div style="display: flex; gap: 1.5rem; align-items: flex-start;">
  <div style="flex: 1;">
    <table>
      <thead>
        <tr>
          <th>model</th>
          <th style="text-align: right;">val. ppl</th>
          <th style="text-align: right;">gen. ppl</th>
          <th style="text-align: right;">entropy (data=5.44)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>gpt2-small</td>
          <td style="text-align: right;">24.7004</td>
          <td style="text-align: right; background: #f3d1b5; font-weight: 700;">122.3149</td>
          <td style="text-align: right;">5.8842</td>
        </tr>
        <tr>
          <td>gpt2-medium</td>
          <td style="text-align: right; background: #f3d1b5; font-weight: 700;">18.5578</td>
          <td style="text-align: right;">193.0853</td>
          <td style="text-align: right;">6.0724</td>
        </tr>
        <tr>
          <td>gpt2-large</td>
          <td style="text-align: right; background: #e8edf3; font-weight: 700;">15.6704</td>
          <td style="text-align: right; background: #fff2b8; font-weight: 700;">35.9183</td>
          <td style="text-align: right;">5.7023</td>
        </tr>
        <tr>
          <td>gpt2-xl</td>
          <td style="text-align: right; background: #fff2b8; font-weight: 700;">14.0935</td>
          <td style="text-align: right; background: #e8edf3; font-weight: 700;">41.2730</td>
          <td style="text-align: right;">5.7145</td>
        </tr>
      </tbody>
    </table>
    <p style="margin: 0.65rem 0 0; color: #666; font-size: 0.92rem; line-height: 1.45;">Gold, silver, and copper mark the best, second-best, and third-best generative perplexity scores.</p>
  </div>
  <div style="flex: 1;">
    <img src="assets/model_size_vs_gen_ppl_matrix_scored_by_gpt2-large.png" alt="Model size vs generative perplexity and validation perplexity" style="width: 100%;" />
  </div>
</div>

**This should raise a red flag: the standard evaluation for flow models does not track the scaling of GPT-2 models.** I'll present three issues which explain what went wrong, and I'll propose solutions (which the field is already converging towards) at the end. The issues:

1. **It is trivial to generate "SOTA" flow model results by trading off a little entropy for a lot of PPL**
2. **The best-scoring model is not the best language model, but the most `gpt2-large`-like**
3. **Entropy only measures intra-sample diversity: inter-sample diversity is an after thought**

Importantly, flow map language models are unambiguously better at small step sizes. I only present papers where these issues caveat minor results instead of the paper's main claim because the point of this is not to invalidate previous results, but to establish more robust evaluation norms. Unless otherwise noted, gen. ppl is scored using `gpt2-large`.

## The issues

### 1. It is trivial to generate "SOTA" flow model results by trading off a little entropy for a lot of PPL

There is an inherent tradeoff to gen. ppl and entropy. I can easily construct a low gen. ppl sequence with very high entropy (e.g. *"aaaaaa..."* has `gen. ppl = 1.01` and `entropy = 0.0`), or a high gen. ppl sequence with very low entropy (e.g. completely random tokens has `gen. ppl ~= 150,000` and `entropy = 6.92`). The question is if the variance of entropy in reported results is enough to tangibly change the results.

First, let's see if the variance in entropy between `gpt2-small` (`entropy=5.88`) and `gpt2-medium` (`entropy=6.07`) can explain why we report `gpt2-medium` as having worse generative perplexity than `gpt2-small`. We can probe the sensitivity of generative perplexity to entropy in autoregressive models by sweeping over temperatures used to generate sequences: lower temperature generations create low entropy, low gen. ppl samples, and higher temperature generations create high entropy, high gen. ppl samples. Below, we sweep sampling from `gpt2-small` and `gpt2-medium` with `t=0` to `t=1` and plot the gen. ppl vs. entropy for each point.

<video controls width="100%">
  <source src="assets/ppl-v-ent.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

So the generative perplexity is *incredibly* sensitive to entropy. Accounting for the 0.19 nats difference between the entropy of `gpt2-small` and `gpt2-medium` at `t=1` can change the interpretation from "`gpt2-small` is much better (122.3 << 193.1)" to "`gpt2-medium` is much better (84.4 << 122.3). Despite this, the four most prominent papers reporting generative perplexity on OpenWebText (OWT) with 1024 sampling steps have significant variance between the models in their results: 4.95-5.12 (DFM), 5.33-5.71 (LMFM), 5.25-5.62 (LangFlow), and 5.55-5.63 (Duo). 

<video controls width="100%">
  <source src="assets/results-chronological.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

In fact, if you plot generative perplexity vs. entropy for each of these paper's models and baselines, what you find is that every single paper that has lower perplexity also has lower entropy. Further, if you take a model like DUO and sweep temperature like we did above, it is not stronger than its baselines, and it has not been beaten by any recent baseline. What this means is that, **for high-step diffusions/flows in language modeling, the field has not progressed since 2023 but rather has converged towards methods that give lower entropy samples at default settings.**

To further drive home that this unaccounted-for entropy difference is a problem, let's sweep temperatures for all of the GPT-2 models and use the variance window from LangFlow as a "valid entropy" window.

<video controls width="100%">
  <source src="assets/ppl-v-ent-all.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

With this variation, one could conclude that `gpt2-small` (entropy=5.33, gen. ppl=23.3) is better than `gpt2-large` (entropy=5.71, gen. ppl=37.0)!

Now, if you pay close attention to the previous animation, you may have noticed that `gpt2-large` is still slightly better than `gpt2-xl` -- even when entropy matched. Why is this? It is because -- even when fixing the entropy problem -- the model with the best generative perplexity is *not* the one that models the data the best, but the one that matches the scorer the best (in this blog, and in the field enerally, `gpt2-large`).

#### Proposal to fix the entropy problem

Fixing this is straightforward: sweep PPL and entropy as we have done here and as is suggested by [CANDI](https://arxiv.org/pdf/2510.22510). Include the entire curve in the results. If you are reporting a scalar gen. ppl quantity, report interpolated gen. PPL at the entropy of the data (5.463 for OWT). This completely eliminates any variance attributable to difference in entropy.

### 2. The best-scoring model is not the best language model, but the most `gpt2-large`-like

`gpt2-large` is an imperfect model of language. Even just comparing to `gpt2-xl`, it has lower accuracy and higher PPL on every measured benchmark:

![gpt2 results](assets/gpt2-table.png)
From [Language Models are Unsupervised Multitask Learners](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf).

However, as shown earlier, `gpt2-large` gives a better gen. ppl to its own samples than to `gpt2-xl` samples. In fact, `gpt2-large` assigns a higher probability to its own entropy-matched samples than to actual samples of the data. This is unsurprising: by definition, the highest probability (lowest gen. PPL) strings are those greedily (`t=0`) generated by the scoring model. 

You can also dream up many clear examples to show that the current evaluation is penalizing "correct" behavior: when scoring completions of `10753 * 1099 = ` (just a random multiplication problem, given with 50 in-context examples), `gpt2-large` gives a PPL of `22.1773` to the correct answer (`11,817,547`) but a PPL of `9.86017` to the greedy completion (`1,073,868,851`). **gen. ppl is not scoring which model matches the data better, but rather it is scoring which model matches (imperfect) `gpt2-large` better.**

Further, this means that the eval is architecturally biased towards left-to-right autoregressive models. As a way to see this, we trained 2 models: one left-to-right AR model on OWT, and one right-to-left AR model on OWT. We find two checkpoints that have ~the same validation perplexity. Because left-to-right AR is fundamentally easier, this is ~25k steps for right-to-left and ~20k steps for left-to-right. Then, we can plot the entropy v. temperature curve, and note that the right-to-left model is worse compared to the equivalent (by validation ppl) left-to-right model.

![forward v. reverse](assets/for-rev.png)
Validation set perplexity v. generative perplexity of 256 samples under `gpt2-large` for checkpoints from training a model on OWT. For the same validation perplexity, a model trained left-to-right has lower generative perplexity loss than a model trained right-to-left. This demonstrates generative perplexity under an autoregressive model is biased to giving autoregressive models a better score.

#### Proposal

Fixing this is not straightforward: it is inherent to the idea of using another model as the ground truth. But, if we are going to treat a language model as the ground truth language distribution, we might as well use the better one: `gpt2-xl`.

### 3. Entropy only measures intra-sample diversity: inter-sample diversity is an after thought

In some recent flow model papers, entropy is referred to as a "diversity" measure. However, this entropy is computed within each generated sequence and then averaged across generated sequences:

$$
\frac{1}{M}\sum_{m=1}^{M}
\left(
-\sum_{v \in V} \hat p_m(v)\log \hat p_m(v)
\right)
$$

where $\hat p_m(v)$ is the empirical frequency of token $v$ in generated sample $m$. This means that if a model generated the same low gen. ppl, high entropy sequence, under these two metrics it would seem like an incredibly strong model.

To give an example, if the model recited the following sequence from OWT every single sample, it's PPL would be 4.283 with an entropy of 5.42 -- less than half of the PPL of `gpt2-xl` at the same entropy:

> Rice, 42, was the highest-ranking officer of the six police officers charged in Gray's arrest and death. Prosecutors had alleged that Rice and others caused Gray's death by failing to secure him in a seat belt in the back of the van, where Gray suffered severe spinal cord injuries last year.\n\nRice was suspended without pay from May 1, 2015, when he was charged by the state's attorney's office, until July 18 of this year, when Circuit Judge Barry Williams found Rice not guilty of all charges.\n\n\"Being suspended without pay for over a year has been financially devastating to Lt. Rice and his family,\" said Michael Belsky, Rice's attorney.\n\nWilliams said prosecutors failed to meet their burden of proving the charges against Rice beyond a reasonable doubt, instead asking the court to rely on \"presumptions or assumptions\" \u2014 something it cannot do. He said the court \"cannot be swayed by sympathy, prejudice or public opinion.\"\n\nCAPTION Baltimore State's Attorney Marilyn Mosby talks about why her team decided to drop the charges against the officers in the Freddie Gray case. (Kevin Richardson/Baltimore Sun video) Baltimore State's Attorney Marilyn Mosby talks about why her team decided to drop the charges against the officers in the Freddie Gray case. (Kevin Richardson/Baltimore Sun video) CAPTION \"I think most of the blame falls to the prosecutor who failed to prosecute the case and brought cases that she didn't have the evidence for,\" Gov. Larry Hogan said. (Erin Cox/Baltimore Sun video) \"I think most of the blame falls to the prosecutor who failed to prosecute the case and brought cases that she didn't have the evidence for,\" Gov. Larry Hogan said. (Erin Cox/Baltimore Sun video)\n\nMayor Stephanie Rawlings-Blake has said Rice now faces an administrative review.\n\nGray, 25, died April 19, 2015, one week after his arrest. His death sparked weeks of protests and activism against police brutality, and two nights of looting and rioting.\n\nLast month, the spending panel authorized $87,705 in back pay for Officer Caesar Goodson Jr., the driver of the van in which Gray sustained his injuries. He, too, was cleared of all charges at trial. Williams also acquitted Officer Edward Nero, and prosecutors dropped all charges against the other three police officers.\n\nLbroadwater@baltsun.com\n\nTwitter.com/lukebroadwater<|endoftext|>MIAMI, August 9 \u2013 The Miami HEAT announced their 2016-17 preseason schedule today, which is highlighted by the team\u2019s three home games at AmericanAirlines Arena. The HEAT will open the preseason on the road on Tuesday, October 4, when they take on the Washington Wizards at 7PM. They will make their first appearance in Miami a week later, when they host the Brooklyn Nets at 7:30PM on Tuesday, October 11. They will also face off with the Orlando Magic in Miami on October 18 at 7:30PM, and conclude the home preseason schedule vs. the Philadelphia 76ers on October 21 at 7:30PM.\n\nTickets for the three home games at AmericanAirlines Arena are on sale now and can be purchased by logging on to HEAT.com, Ticketmaster.com, by visiting any Ticketmaster outlet, or by calling 1-800-4NBA-TIX. Tickets can also be purchased at the AmericanAirlines Arena Ticket Office Monday through Friday from 10AM to 5PM. Ticket prices start at $10 plus applicable fees.\n\nIn addition to the three home games at AmericanAirlines Arena, the HEAT will host two neutral site games vs. the Minnesota Timberwolves. Miami returns to the Sprint Center in Kansas City, MO, for the sixth time on October 8. Tickets to that game are available by visiting SprintCenter.com, Price Chopper Box Office at Sprint Center or by calling (888) 929-7849. The HEAT will also return to the KFC Yum! Center in Louisville, KY, for the third straight season, on October 15. Tickets are available at the KFC Yum! Center Box Office, all Ticketmaster outlets, Ticketmaster.com or by calling (800) 745-3000. Miami will also play road contests against the San Antonio Spurs on October 14, and the Charlotte Hornets on October 21.\n\nThe complete broadcast schedule for the preseason will be released at a later date.\n\nThe preseason schedule is as follows:\n\nDATE OPPONENT LOCATION TIME TICKETS Oct. 4 at Washington Verizon Center, Washington, DC 7:00 PM Oct. 8 vs. Minnesota Sprint Center, Kansas City, MO 7:30 PM Oct. 11 vs. Brooklyn AmericanAirlines Arena, Miami, FL 7:30 PM Buy Tickets Oct. 14 at San Antonio AT&T Center, San Antonio, TX 7:30 PM Oct. 15 vs. Minnesota KFC Yum! Center,

Obviously, this is very unlikely to occur in any reasonable setup. The point is that **entropy is not measuring diversity of samples at all**, only diversity within a sample.

The field is aware of this. In [Flow Map Language Models](https://arxiv.org/pdf/2602.16813), they report self-BLEU scores (geometric average of ngram overlap) in the appendix to check for "mode collapse". This is very useful but now interpretation of results relies on 3 variables: gen. ppl, per-sample entropy, and self-BLEU, which makes it hard to tell when a new method is an improvement or just trading off diversity for quality.

#### Proposal

Report self-BLEU as in Flow Language Models. This is not perfect, but it does act as a crude measure of diversity.
## The fixes

As mentioned throughout, there are many ways to easily improve these evals, and the field is already working towards them. As mentioned earlier, [Flow Map Language Models](https://arxiv.org/pdf/2602.16813) reports self-BLEU scores, [LangFlow](https://arxiv.org/pdf/2604.11748) reports PPL bounds on actual validation data. Here, we give a few concrete ideas which address the earlier outlined issues.

### Small changes: report entropy-matched gen. ppl, self-BLEU, and use `gpt2-xl` as the scorer

As mentioned at the end of each section, the three problems can be ameliorated through small changes.

As we showed, you can dramatically change the PPL of a model by reducing its entropy a small amount. To make interpreting results easily, we should report gen. ppl *at the entropy of the data*. This avoids any variance between methods attributable to difference in entropy.

Additionally, we showed that gen. ppl and entropy do not measure inter-sample diversity at all. To address this, as in [Flow Map Language Models](https://arxiv.org/pdf/2602.16813), report self-BLEU scores.

Finally, we showed that using any model as a scorer means that it gives higher scores to models which make the same mistakes. And since we do not have access to the true data generating distribution of language, we must settle for an imperfect scorer. With this being the case, we might as well use the *better* drop-in replacement model of language: `gpt2-xl` instead of `gpt2-large`.

### Larger changes: Report PPL bounds and focus on downstream metrics

The changes above are patching an imperfect framework. I think a bigger improvement is to report PPL bounds on actual data (as in [LangFlow](https://arxiv.org/pdf/2604.11748)) and to focus on downstream metrics (like Sudoku in [Flow Map Language Models](https://arxiv.org/pdf/2602.16813)). Calculating PPL bounds on real data sidesteps all of the outlined problems. One issue is that calculating this PPL bound is quite slow, the gap between the bound and the true PPL is unknown, and also new models must derive their own PPL bounds. Work in this area (faster, more general, tighter bounds) is great.

Furthermore, why do we care about PPL in the first place? On one hand, it is very natural: it is a function of the probability of sequences under the model, it gives ~number of tokens that the model is guessing between with equal probability. On the other hand, we want these models to *do* useful things: solve our problems, answer questions. So, by focusing on these downstream metrics which only require drawing samples, we can go beyond this gen. ppl fixation.

## Open questions

In writing this up, there are a few things I couldn't get a satisfying answer to.

### 1. Why are flow model gen. ppl scorers largely independent of the scorer

If we run generate tokens with a list of models and score them with every model, we get the plot below (left). Note that this confounds sample entropy and does not control for the problem above.

![scorers](assets/grouped_ppl_by_generator.png)

As you can see, there is lots of variance across the scorers for a given generator for all but 3 models: `gpt2`, `FLM`, and `LangFlow`.

Why is this? I ran per-token scoring and for these models, it isn't that there is more agreement per token (lower variance), but rather that the disagreement is there (high variance) but it seems to cancel out when averaged across tokens. I don't have an intuitive explanation for why this is or what it means.

### 2. What is the best way to tradeoff entropy v. ppl in flow models?

In autoregressive models and (some) masked diffusion models, it is trivial to tradeoff entropy and gen. ppl: just change the temperature. However, in a flow model, I'm not sure what the relevant lever to pull is.
