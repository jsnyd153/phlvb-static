const loadAnimationLength = 1500;
const loadTl = gsap.timeline({
	defaults: { opacity: 0, ease: "ease-in", duration: 1 },
});

window.addEventListener("DOMContentLoaded", () => {
	loadTl.add(pageFadeIn());
});

function pageFadeIn() {
	const tl = gsap.timeline();
	tl.add("start")
		.from(
			".graphic_hero--layer_2",
			{ scale: 0, duration: 0.75, ease: "power2.inOut", rotate: -35 },
			"start"
		)
		.from(
			".graphic_hero--layer_3",
			{
				scale: 2,
				duration: 1,
				ease: "power2.inOut",
				rotate: 35,
			},
			"start"
		)
		.from(
			".graphic_hero--layer_1",
			{ scale: 1.1, duration: 1.5, ease: "power2.inOut" },
			"start"
		);
	return tl;
}

setTimeout(() => {
	ScrollTrigger.defaults({
		trigger: ".graphic_hero--section",
		start: "00% 10%",
		end: "100% 0%",
		toggleActions: "play reverse restart reverse",
		// markers: "graphic_hero--section",
		scrub: 1,
	});

	var tl_layer2 = gsap
		.timeline({
			paused: true,
			scrollTrigger: { trigger: ".graphic_hero--section" },
		})
		.to(".graphic_hero--layer_2", { rotation: 135 });

	var tl_layer1 = gsap
		.timeline({
			paused: true,
			scrollTrigger: { trigger: ".graphic_hero--section" },
		})
		.to(".graphic_hero--layer_1 img", { scale: 1.25 });
	var tl_layer3 = gsap
		.timeline({
			paused: true,
			scrollTrigger: { trigger: ".graphic_hero--section" },
		})
		.to(".graphic_hero--layer_3 img", { scale: 1.05 });
}, loadAnimationLength);
