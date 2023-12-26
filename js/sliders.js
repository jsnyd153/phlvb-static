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

// $(".image_slider").each(function () {
// 	var $Speed = 1000;
// 	var $Timer = 5000;
// 	var sliderData = $(this).attr("slider-data");

// 	var imageSwiper = new Swiper(".image_slider--slider_area", {
// 		mousewheel: {
// 			forceToAxis: true,
// 		},
// 		speed: $Speed,
// 		autoplay: {
// 			delay: $Timer,
// 		},
// 		loop: true, // Not recommended to enable!!!
// 		longSwipesRatio: 0.01,
// 		followFinger: false,
// 		grabCursor: true,
// 		watchSlidesProgress: true,
// 		// parallax: true,
// 		lazy: {
// 			loadPrevNext: true,
// 		},
// 		hashNavigation: {
// 			watchState: true,
// 		},
// 		pagination: {
// 			el: `[slider-data="` + sliderData + `"].swiper-pagination`,
// 			clickable: true,
// 		},
// 	});
// });

$(".image_slider").each(function (index, element) {
	var $this = $(this);
	var $Speed = 1000;
	var $Timer = 5000;

	//append index value to to elements so that multiple instances of the image slider don't interfere with each other
	$this.find(".image_slider--slider_area").addClass("slider_area-" + index);
	$this
		.parents(".media_area")
		.find(".swiper-pagination")
		.addClass("swiper-pagination-" + index);

	var swiper = new Swiper(".slider_area-" + index, {
		mousewheel: {
			forceToAxis: true,
		},
		speed: $Speed,
		autoplay: {
			delay: $Timer,
		},
		loop: true,
		longSwipesRatio: 0.01,
		followFinger: false,
		grabCursor: true,
		watchSlidesProgress: true,
		lazy: {
			loadPrevNext: true,
		},
		pagination: {
			el: ".swiper-pagination-" + index,
			clickable: true,
		},
	});
});

$("a.arrow").each(function () {
	const arrowSVG =
		'<svg viewBox="0 0 19 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 6H17.075" class="stroke" /><path d="M11.3828 1L17.0745 6L11.3828 11" class="stroke" /></svg>';
	$(this).append(arrowSVG);
});
