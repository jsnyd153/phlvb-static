$(".accordion--trigger").click(function () {
	$(this).attr("aria-expanded", function (i, attr) {
		return attr == "true" ? "false" : "true";
	});
});
