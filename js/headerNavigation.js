//dynamically build some elements to reduce editing

// Fetch the HTML content from "_static_pages/home.html"
fetch("../_html-blocks/block-header.html")
	.then((response) => response.text())
	.then((html) => {
		// Create a temporary div element to hold the fetched HTML
		const tempDiv = document.createElement("div");
		tempDiv.innerHTML = html;

		// Get the header element from the fetched HTML
		const headerElement = tempDiv.querySelector("header");

		// Prepend the header element to the body of the current document
		document.body.prepend(headerElement);
	})
	.catch((error) => {
		console.error("Error fetching the HTML file:", error);
	});

// Fetch the HTML content from "_static_pages/block-footer.html"
fetch("../_html-blocks/block-footer.html")
	.then((response) => response.text())
	.then((html) => {
		// Create a temporary div element to hold the fetched HTML
		const tempDiv = document.createElement("div");
		tempDiv.innerHTML = html;

		// Get the footer element from the fetched HTML
		const footerElement = tempDiv.querySelector("footer");

		// Append the footer element to the main element of the current document
		const mainElement = document.querySelector("main");
		mainElement.appendChild(footerElement);
	})
	.catch((error) => {
		console.error("Error fetching the HTML file:", error);
	});

// Fetch the HTML content from "_static_pages/block-footer.html"
fetch("../_html-blocks/block-grid_content.html")
	.then((response) => response.text())
	.then((html) => {
		console.log("fetched");
		// Create a temporary div element to hold the fetched HTML
		const tempDiv = document.createElement("div");
		tempDiv.innerHTML = html;

		// Get the element with the id "cardTournaments" from the fetched HTML
		const cardTournamentsElement = tempDiv.querySelector("#cardTournaments");
		console.log("cardTournamentsElement", cardTournamentsElement);

		// Find the element with attribute html-data="use_CardTournaments"
		const elementToReplace = document.querySelector(
			'[html-data="use_CardTournaments"]'
		);

		// Replace the element with cardTournamentsElement
		if (elementToReplace) {
			elementToReplace.parentNode.replaceChild(
				cardTournamentsElement,
				elementToReplace
			);
		} else {
			console.error(
				'Element with attribute html-data="use_CardTournaments" not found.'
			);
		}
	})
	.catch((error) => {
		console.error("Error fetching the HTML file:", error);
	});

// Fetch the HTML content from "_static_pages/block-footer.html"
fetch("../_html-blocks/block-grid_content.html")
	.then((response) => response.text())
	.then((html) => {
		console.log("fetched");
		// Create a temporary div element to hold the fetched HTML
		const tempDiv = document.createElement("div");
		tempDiv.innerHTML = html;

		// Get the element with the id "cardTournaments" from the fetched HTML
		const cardPickupElement = tempDiv.querySelector("#cardPickup");
		console.log("cardPickupElement", cardPickupElement);

		// Find the element with attribute html-data="use_CardTournaments"
		const elementToReplace = document.querySelector(
			'[html-data="use_CardPickup"]'
		);

		// Replace the element with cardTournamentsElement
		if (elementToReplace) {
			elementToReplace.parentNode.replaceChild(
				cardPickupElement,
				elementToReplace
			);
		} else {
			console.error(
				'Element with attribute html-data="use_CardPickup" not found.'
			);
		}
	})
	.catch((error) => {
		console.error("Error fetching the HTML file:", error);
	});

// Fetch the HTML content from "_static_pages/block-footer.html"
fetch("../_html-blocks/block-grid_content.html")
	.then((response) => response.text())
	.then((html) => {
		console.log("fetched");
		// Create a temporary div element to hold the fetched HTML
		const tempDiv = document.createElement("div");
		tempDiv.innerHTML = html;

		// Get the element with the id "cardTournaments" from the fetched HTML
		const cardLeaguesElement = tempDiv.querySelector("#cardLeagues");
		console.log("cardLeaguesElement", cardLeaguesElement);

		// Find the element with attribute html-data="use_CardTournaments"
		const elementToReplace = document.querySelector(
			'[html-data="use_CardLeagues"]'
		);

		// Replace the element with cardTournamentsElement
		if (elementToReplace) {
			elementToReplace.parentNode.replaceChild(
				cardLeaguesElement,
				elementToReplace
			);
		} else {
			console.error(
				'Element with attribute html-data="use_CardLeagues" not found.'
			);
		}
	})
	.catch((error) => {
		console.error("Error fetching the HTML file:", error);
	});

$(document).ready(function () {
	$("[data-copies]").each(function () {
		var copies = $(this).data("copies");

		for (var i = 1; i < copies; i++) {
			$(this).clone().insertAfter($(this));
		}
	});
});
