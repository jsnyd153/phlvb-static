//create sample column element
$("main").prepend(
	'<section style="padding:0;"id="units"><div id="main_grid_column" style="grid-column: 2 / span 1"></div></section>'
);

$(window).on("load resize", function () {
	// calculate the width of the sample 1 column element to set value of --fr_unit prop
	const mainGridColumn = $("#main_grid_column");
	const width = mainGridColumn.outerWidth();
	$("html").css("--fr_unit", width + "px");

	$(".reel--wrapper").each(function () {
		const wrapper = $(this);
		const renderedWidth = wrapper.outerWidth();
		const autoColumn =
			"calc((1000 - " + parseInt(renderedWidth) + " ) / 11 * 1%)";
		$(this).css("--autoGrid", autoColumn);
	});
});
