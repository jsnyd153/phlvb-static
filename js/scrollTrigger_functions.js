gsap.registerPlugin(ScrollTrigger);

//====================
// Navigation
//====================

$(".header_nav--container").each(function () {
	const triggerEl = $("section:first-child");
	const targetEl = $(this).find(".nav_background");

	const tl = gsap.timeline();

	tl.fromTo(targetEl, { opacity: 0 }, { opacity: 1 });

	// ScrollTrigger
	ScrollTrigger.create({
		animation: tl,
		trigger: triggerEl,
		start: "-50%",
		end: "100%",
		// scrub: true,
		// markers: true,
	});
});

//====================
// Feature Hero
//====================

$(".feature_hero--section .feature_hero--page_nav").each(function () {
	const page_nav = $(this);
	const page_nav_content = $(this).prop("outerHTML");
	$(".sticky_nav").append(page_nav_content);
	const target = $(".sticky_nav");

	const tl = gsap.timeline();

	tl.to(target, { y: 0, duration: 0.01, ease: "power2.in" });

	// ScrollTrigger
	ScrollTrigger.create({
		animation: tl,
		trigger: page_nav,
		start: "-50%",
		end: "100%",
		// scrub: true,
		markers: true,
		toggleActions: "play play resume reset",
	});
});

// //====================
// // Feature Hero
// //====================

// $(" .img-container").each(function () {
// 	const image_container = $(this);

// 	const tl = gsap.timeline();

// 	tl.fromTo(
// 		image_container,
// 		{ yPercent: 10, opacity: 1 },
// 		{ yPercent: -5, opacity: 0, duration: 1, ease: "power2.out" }
// 	);

// 	// ScrollTrigger
// 	ScrollTrigger.create({
// 		animation: tl,
// 		trigger: image_container,
// 		start: "-50%",
// 		end: "100%",
// 		scrub: true,
// 		// markers: true,
// 	});
// });

// //====================
// // PLAY INTRO
// //====================

// $(" .play_intro--section").each(function () {
// 	const section = $(this);

// 	const text = $(".play_intro--text_area");
// 	const image = $(".play_intro--media_area");
// 	const image_mask = $(".play_intro--media_area span");

// 	const tl = gsap.timeline();

// 	tl.fromTo(
// 		text,
// 		{ yPercent: 5, opacity: 0 },
// 		{ yPercent: 0, opacity: 1, duration: 1, ease: "power2.out" }
// 	);

// 	//ScrollTrigger
// 	ScrollTrigger.create({
// 		animation: tl,
// 		trigger: section,
// 		start: "-80%",
// 		// markers: true,
// 		toggleActions: "restart pause pause reverse",
// 	});
// });

// $(" .play_intro--section").each(function () {
// 	const section = $(this);

// 	const text = $(".play_intro--text_area");
// 	const image = $(".play_intro--media_area");
// 	const image_mask = $(".play_intro--media_area span");

// 	const tl = gsap.timeline();

// 	tl.fromTo(
// 		image_mask,
// 		{ xPercent: 0 },
// 		{ xPercent: 100, duration: 1, ease: "power2.out" }
// 	);

// 	//ScrollTrigger
// 	ScrollTrigger.create({
// 		animation: tl,
// 		trigger: section,
// 		start: "-80%",
// 		// markers: true,
// 		toggleActions: "restart pause pause reverse",
// 	});
// });

// //====================
// // STORY BLOCK
// //====================

// $(" .story_block--section").each(function () {
// 	const section = $(this);

// 	const text = $(".single .story_block--text_area");

// 	const tl = gsap.timeline();
// 	tl.fromTo(
// 		text,
// 		{ xPercent: -10, opacity: 0 },
// 		{ xPercent: 0, opacity: 1, duration: 1, ease: "power2.out" }
// 	);

// 	//ScrollTrigger
// 	ScrollTrigger.create({
// 		animation: tl,
// 		trigger: section,
// 		start: "-80%",
// 		// markers: true,
// 		toggleActions: "restart pause pause reverse",
// 	});
// });

// $(".optix_volleyball-play-grass").each(function () {
// 	const img = $(this);

// 	const tl = gsap.timeline();

// 	tl.fromTo(
// 		img,
// 		{ yPercent: 50, rotation: 90 },
// 		{ yPercent: -50, rotation: 0, duration: 1 }
// 	);

// 	// ScrollTrigger
// 	ScrollTrigger.create({
// 		animation: tl,
// 		trigger: img,
// 		start: window.clientHeight + 30,
// 		end: "bottom",
// 		scrub: true,
// 		markers: true,
// 	});
// });
