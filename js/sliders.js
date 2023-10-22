// $(".home_hero--section").each(function () {
// 	var layer1Swiper = new Swiper(".home_hero--layer_1", {
// 		// direction: "vertical",
// 		effect: "slide",
// 		//autoHeight: true,
// 		loop: false, // Not recommended to enable!!!
// 		allowTouchMove: false,
// 	});
// 	var layer3Swiper = new Swiper(".home_hero--layer_3", {
// 		// direction: "vertical",
// 		effect: "slide",
// 		//autoHeight: true,
// 		loop: false, // Not recommended to enable!!!
// 		allowTouchMove: false,
// 	});

// 	var $Speed = 1000;

// 	var layer2Swiper = new Swiper(".home_hero--layer_2", {
// 		mousewheel: true,
// 		speed: $Speed,
// 		loop: false, // Not recommended to enable!!!
// 		longSwipesRatio: 0.01,
// 		followFinger: false,
// 		grabCursor: true,
// 		watchSlidesProgress: true,
// 		parallax: true,
// 		pagination: {
// 			el: ".swiper-pagination",
// 			clickable: true,
// 		},
// 		lazy: {
// 			loadPrevNext: true,
// 		},
// 		navigation: {
// 			nextEl: ".swiper-button-next",
// 			prevEl: ".swiper-button-prev",
// 		},
// 	});

// 	layer2Swiper.controller.control = layer1Swiper;
// 	layer1Swiper.controller.control = layer3Swiper;
// });

// $(".quote_slider--section").each(function () {
// 	var $Speed = 1000;

// 	var quoteSwiper = new Swiper(".quote-slider", {
// 		mousewheel: {
// 			forceToAxis: true,
// 		},
// 		speed: $Speed,

// 		loop: true, // Not recommended to enable!!!
// 		longSwipesRatio: 0.01,
// 		followFinger: false,
// 		grabCursor: true,
// 		watchSlidesProgress: true,
// 		// parallax: true,
// 		lazy: {
// 			loadPrevNext: true,
// 		},
// 		navigation: {
// 			nextEl: ".quote_slider--button-next",
// 			prevEl: ".quote_slider--button-prev",
// 		},
// 	});
// });

$(".slider_hero--section").each(function () {
	var $Speed = 1000;
	var $Timer = 5000;
	var quoteSwiper = new Swiper(".slider_hero--slider_area", {
		mousewheel: {
			forceToAxis: true,
		},
		speed: $Speed,
		autoplay: {
			delay: $Timer,
		},
		loop: true, // Not recommended to enable!!!
		longSwipesRatio: 0.01,
		followFinger: false,
		grabCursor: true,
		watchSlidesProgress: true,
		// parallax: true,
		lazy: {
			loadPrevNext: true,
		},
		navigation: {
			nextEl: ".quote_slider--button-next",
			prevEl: ".quote_slider--button-prev",
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
	});
});

$(".image_slider").each(function () {
	var $Speed = 1000;
	var $Timer = 5000;
	var quoteSwiper = new Swiper(".image_slider--slider_area", {
		mousewheel: {
			forceToAxis: true,
		},
		speed: $Speed,
		autoplay: {
			delay: $Timer,
		},
		loop: true, // Not recommended to enable!!!
		longSwipesRatio: 0.01,
		followFinger: false,
		grabCursor: true,
		watchSlidesProgress: true,
		// parallax: true,
		lazy: {
			loadPrevNext: true,
		},
		navigation: {
			nextEl: ".quote_slider--button-next",
			prevEl: ".quote_slider--button-prev",
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
	});
});
