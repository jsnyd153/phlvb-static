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

	let onLoad = gsap.timeline();
	onLoad.from(firstImage, { opacity: 0, x: "-30%", duration: 0.5 });
	let onLoad2 = gsap.timeline();
	onLoad2.from(secondImage, { opacity: 0, x: "30%", duration: 0.5 });

	// setTimeout(() => {
	ScrollTrigger.defaults({
		toggleActions: "restart complete restart reset",
		start: "0% top",
		end: "200% center",
		scrub: 1,
		immediateRender: false,
		overwrite: "auto",
		// markers: true, //for debugging
	});

	var tlOne = gsap
		.timeline({
			paused: true,
			scrollTrigger: { trigger: container },
		})
		.fromTo(firstImage, { opacity: 1, y: "-10%" }, { opacity: 0, y: "20%" });

	var tlTwo = gsap
		.timeline({
			paused: true,
			scrollTrigger: { trigger: container },
		})
		.fromTo(secondImage, { opacity: 1, y: "20%" }, { opacity: 0, y: "-20%" });
	var tlThree = gsap
		.timeline({
			paused: true,
			scrollTrigger: { trigger: container },
		})
		.fromTo(textArea, { opacity: 1, y: "0%" }, { opacity: 1, y: "10%" });
	// }, "500");
});

// genric image animation
$(".media_content.mask-reveal").each(function () {
	const container = $(this);
	$(container).append('<div class="faux-mask"></div>');
	const mask = $(this).find(".faux-mask");

	ScrollTrigger.defaults({
		toggleActions: "restart none none none",
		start: "-50% center",
		end: "50% center",
		scrub: false,
		// markers: true, //for debugging
	});

	var tlone = gsap
		.timeline({
			paused: true,
			scrollTrigger: { trigger: container },
		})
		.to(mask, { x: "-100%", duration: 0.75 });
});

setTimeout(() => {
	$(".card.event_card, .card.league_card, .card.tournament_card").each(
		function () {
			const card = $(this);
			const container = $(this).parents("section");

			// Outlines the container
			// $(container).css("border", "1px solid red");

			ScrollTrigger.defaults({
				toggleActions: "restart complete reverse reset",
				start: "20% bottom",
				// end: "10% bottom",
				scrub: false,
				markers: "true", //for debugging
			});

			var tlone = gsap
				.timeline({
					paused: true,
					scrollTrigger: { trigger: card },
				})
				.fromTo(
					card,
					{ y: "30%", opacity: 0, duration: 0.5 },
					{ y: "0%", opacity: 1 }
				);
		}
	);
}, "100");
