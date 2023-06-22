$(".language--selector button").click(function () {
	$(this).parents(".language--selector").toggleClass("active");
});
$("button.burger--button").click(function () {
	$(this).parents(".header_nav--container").toggleClass("nav_open");
});
$("#close_nav").click(function () {
	$(this).parents(".header_nav--container").removeClass("nav_open");
});
