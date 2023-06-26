//Feature Hero animation (text area, background images)
$(" .feature_hero--section").each(function () {
	const container = $(this);
	const firstImage = $(this).find(
		".feature_hero--background_media-image:first-child"
	);
	const secondImage = $(this).find(
		".feature_hero--background_media-image:last-child"
	);
	const textArea = $(this).find(".feature_hero--text_area");

	ScrollTrigger.defaults({
		toggleActions: "restart complete restart reset",
		start: "0% top",
		end: "200% center",
		scrub: 1,
		// markers: true, //for debugging
	});

	var tlone = gsap
		.timeline({
			paused: true,
			scrollTrigger: { trigger: container },
		})
		.fromTo(firstImage, { opacity: 1, y: "-10%" }, { opacity: 0, y: "20%" });

	var tlone = gsap
		.timeline({
			paused: true,
			scrollTrigger: { trigger: container },
		})
		.fromTo(secondImage, { opacity: 1, y: "20%" }, { opacity: 0, y: "-20%" });
	var tlone = gsap
		.timeline({
			paused: true,
			scrollTrigger: { trigger: container },
		})
		.fromTo(textArea, { opacity: 1, y: "0%" }, { opacity: 1, y: "40%" });
});

// genric image animation
// $(".media_content.mask-reveal").each(function () {
// 	const container = $(this);
// 	$(container).append('<div class="faux-mask"></div>');
// 	const mask = $(this).find(".faux-mask");

// 	ScrollTrigger.defaults({
// 		toggleActions: "restart complete reverse reset",
// 		start: "-50% center",
// 		end: "50% center",
// 		scrub: false,
// 		// markers: true, //for debugging
// 	});

// 	var tlone = gsap
// 		.timeline({
// 			paused: true,
// 			scrollTrigger: { trigger: container },
// 		})
// 		.to(mask, { x: "-100%", duration: 0.75 });
// });
