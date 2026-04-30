from __future__ import annotations

import math

from manim import (
    BLUE,
    DOWN,
    GREEN,
    GREY,
    RED,
    WHITE,
    Axes,
    Create,
    DashedLine,
    Dot,
    FadeIn,
    GrowFromCenter,
    LaggedStart,
    LEFT,
    Line,
    PURPLE,
    RIGHT,
    Scene,
    Text,
    UP,
    VGroup,
    VMobject,
)


DATA = [
    {"temperature": 0.0, "gen_ppl": 1.1191, "entropy": 3.0401},
    {"temperature": 0.1, "gen_ppl": 1.1659, "entropy": 3.1437},
    {"temperature": 0.2, "gen_ppl": 1.1573, "entropy": 3.0851},
    {"temperature": 0.3, "gen_ppl": 1.1927, "entropy": 3.1436},
    {"temperature": 0.4, "gen_ppl": 1.3019, "entropy": 3.3128},
    {"temperature": 0.5, "gen_ppl": 1.5607, "entropy": 3.5249},
    {"temperature": 0.6, "gen_ppl": 2.3834, "entropy": 3.9678},
    {"temperature": 0.7, "gen_ppl": 4.8982, "entropy": 4.5246},
    {"temperature": 0.8, "gen_ppl": 10.0824, "entropy": 4.9776},
    {"temperature": 0.9, "gen_ppl": 27.3548, "entropy": 5.3974},
    {"temperature": 0.925, "gen_ppl": 36.7649, "entropy": 5.5371},
    {"temperature": 0.95, "gen_ppl": 57.4317, "entropy": 5.6613},
    {"temperature": 0.975, "gen_ppl": 89.8616, "entropy": 5.8109},
    {"temperature": 1.0, "gen_ppl": 122.3149, "entropy": 5.8842},
]

REFERENCES = [
    {
        "name": "gpt2-small t=1",
        "entropy": 5.88,
        "temperature": 1.000,
        "gen_ppl": 122.3149,
        "color": GREY,
    },
    {
        "name": "CANDI",
        "entropy": 5.71,
        "temperature": 0.958,
        "gen_ppl": 66.4406,
        "color": RED,
    },
    {
        "name": "FLM",
        "entropy": 5.33,
        "temperature": 0.884,
        "gen_ppl": 23.3050,
        "color": PURPLE,
    },
]


class GPT2TemperatureSweep(Scene):
    def construct(self) -> None:
        title = Text(
            "Small Entropy Changes Can Move Generation PPL a Lot",
            font_size=34,
            weight="BOLD",
        ).to_edge(UP, buff=0.25)

        axes = Axes(
            x_range=[0, 1, 0.2],
            y_range=[0, 1, 0.25],
            x_length=10.8,
            y_length=5.6,
            tips=False,
            axis_config={"stroke_width": 2, "color": WHITE},
        ).shift(0.15 * DOWN)

        x_ticks = self.make_x_ticks(axes)
        ppl_ticks = self.make_ppl_ticks(axes)
        entropy_ticks = self.make_entropy_ticks(axes)
        base_labels, entropy_label = self.make_axis_labels(axes)

        self.play(FadeIn(title), Create(axes), run_time=1.2)
        self.play(FadeIn(x_ticks), FadeIn(ppl_ticks), FadeIn(base_labels), run_time=1.0)

        blue_line, blue_points = self.make_series(
            axes,
            [self.point_for_ppl(axes, row["temperature"], row["gen_ppl"]) for row in DATA],
            BLUE,
        )
        green_line, green_points = self.make_series(
            axes,
            [self.point_for_entropy(axes, row["temperature"], row["entropy"]) for row in DATA],
            GREEN,
        )

        self.play(Create(blue_line), run_time=2.0)
        self.play(LaggedStart(*[GrowFromCenter(point) for point in blue_points], lag_ratio=0.08), run_time=1.4)
        self.wait(0.35)

        self.play(FadeIn(entropy_ticks), FadeIn(entropy_label), run_time=1.0)
        self.wait(0.2)

        self.play(Create(green_line), run_time=2.0)
        self.play(LaggedStart(*[GrowFromCenter(point) for point in green_points], lag_ratio=0.08), run_time=1.4)
        self.wait(0.35)

        for reference in REFERENCES:
            self.animate_reference(axes, reference)
            self.wait(0.25)

        self.wait(1.5)

    def x_coord(self, temperature: float) -> float:
        return temperature

    def ppl_coord(self, gen_ppl: float) -> float:
        return math.log10(gen_ppl) / math.log10(150)

    def entropy_coord(self, entropy: float) -> float:
        return (entropy - 3.0) / 3.0

    def point_for_ppl(self, axes: Axes, temperature: float, gen_ppl: float):
        return axes.c2p(self.x_coord(temperature), self.ppl_coord(gen_ppl))

    def point_for_entropy(self, axes: Axes, temperature: float, entropy: float):
        return axes.c2p(self.x_coord(temperature), self.entropy_coord(entropy))

    def make_series(self, axes: Axes, points, color):
        line = VMobject(color=color, stroke_width=5)
        line.set_points_as_corners(points)
        dots = VGroup(*[Dot(point, radius=0.07, color=color) for point in points])
        return line, dots

    def make_x_ticks(self, axes: Axes):
        ticks = VGroup()
        for tick in [0.0, 0.2, 0.4, 0.6, 0.8, 1.0]:
            point = axes.c2p(tick, 0)
            label = Text(f"{tick:.1f}", font_size=22, weight="BOLD").next_to(point, DOWN, buff=0.18)
            ticks.add(label)
        return ticks

    def make_ppl_ticks(self, axes: Axes):
        ticks = VGroup()
        for tick in [1, 10, 100]:
            point = axes.c2p(0, self.ppl_coord(tick))
            label = Text(str(tick), font_size=22, color=BLUE, weight="BOLD").next_to(point, LEFT, buff=0.18)
            ticks.add(label)
        return ticks

    def make_entropy_ticks(self, axes: Axes):
        ticks = VGroup()
        for tick in [3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0]:
            point = axes.c2p(1, self.entropy_coord(tick))
            label = Text(f"{tick:.1f}", font_size=22, color=GREEN, weight="BOLD").next_to(point, RIGHT, buff=0.18)
            ticks.add(label)
        return ticks

    def make_axis_labels(self, axes: Axes):
        x_label = Text("Sampling Temperature", font_size=26, weight="BOLD").next_to(axes, DOWN, buff=0.45)
        y_label = (
            Text("Generation PPL (gpt2-large scorer)", font_size=24, color=BLUE, weight="BOLD")
            .rotate(math.pi / 2)
            .next_to(axes, LEFT, buff=0.75)
        )
        entropy_label = (
            Text("Sample Entropy", font_size=24, color=GREEN, weight="BOLD")
            .rotate(-math.pi / 2)
            .next_to(axes, RIGHT, buff=0.85)
        )
        return VGroup(x_label, y_label), entropy_label

    def animate_reference(self, axes: Axes, reference: dict) -> None:
        color = reference["color"]
        entropy_y = self.entropy_coord(reference["entropy"])
        intersection_x = self.x_coord(reference["temperature"])

        horizontal = Line(
            axes.c2p(0, entropy_y),
            axes.c2p(1, entropy_y),
            color=color,
            stroke_width=4,
        )
        vertical = DashedLine(
            axes.c2p(intersection_x, 1),
            axes.c2p(intersection_x, 0),
            color=color,
            stroke_width=3,
            dash_length=0.08,
        )
        point = Dot(
            self.point_for_ppl(axes, reference["temperature"], reference["gen_ppl"]),
            radius=0.095,
            color=color,
        )
        label = Text(
            f"{reference['name']} sample entropy = {reference['entropy']:.2f}",
            font_size=22,
            color=color,
            weight="BOLD",
        ).next_to(horizontal, UP, buff=0.08).align_to(axes, LEFT).shift(0.25 * RIGHT)

        self.play(Create(horizontal), FadeIn(label), run_time=1.2)
        self.play(Create(vertical), run_time=1.0)
        self.play(GrowFromCenter(point), run_time=0.45)
