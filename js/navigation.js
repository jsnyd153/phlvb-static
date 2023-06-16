$(".language--selector button").click(function () {
	$(this).parents(".language--selector").toggleClass("active");
});
$("button.burger--button").click(function () {
	$(this).parents(".header_nav--container").toggleClass("nav_open");
});
$("#close_nav").click(function () {
	$(this).parents(".header_nav--container").removeClass("nav_open");
});

// // Function to calculate the percentage of item passed the top edge of the browser
// function calculatePassedPercentage() {
// 	// Get the element representing the item using jQuery
// 	const item = $(".graphic_hero--section");

// 	// Get the item's position relative to the viewport
// 	const itemRect = item[0].getBoundingClientRect();

// 	// Calculate the distance from the top edge of the viewport to the item's top edge
// 	const itemTop = itemRect.top;

// 	// Calculate the height of the item
// 	const itemHeight = itemRect.height;

// 	// Calculate the scroll position
// 	const scrollTop = $(window).scrollTop();

// 	// Calculate the distance from the top edge of the viewport to the item's bottom edge
// 	const itemBottom = itemTop + itemHeight;

// 	// Calculate the distance from the top edge of the viewport to the top edge of the browser window
// 	const windowTop = scrollTop;

// 	// Calculate the percentage of item passed the top edge of the browser
// 	const percentagePassed =
// 		Math.max(0, (windowTop - itemTop) / itemHeight) * 100;

// 	// Return the calculated percentage, limited to a maximum of 100
// 	return Math.min(100, percentagePassed);
// }

// // Function to handle scroll event
// function handleScroll() {
// 	const percentagePassed = calculatePassedPercentage();
// 	console.log(`Percentage passed: ${percentagePassed}%`);
// 	$(".header_nav--container").css("--bg_opacity", `${percentagePassed}`);
// }

// // Attach event listener to the scroll event using jQuery
// $(window).scroll(handleScroll);

// // Call the calculatePassedPercentage() function initially to get the correct percentage on page load
// $(document).ready(function () {
// 	const initialPercentagePassed = Math.min(100, calculatePassedPercentage());
// 	console.log(`Initial percentage passed: ${initialPercentagePassed}%`);
// });
