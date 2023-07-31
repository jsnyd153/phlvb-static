//https://www.youtube.com/watch?v=fI9VM5zzpu8

const tabsContainer = document.querySelector(".tab-container");
const tabsList = tabsContainer.querySelector(".tab-list");
const tabButtons = tabsList.querySelectorAll(".tab-button");
const tabPanels = tabsContainer.querySelectorAll(".tab-content");

tabsList.setAttribute("role", "tablist");

tabsList.querySelectorAll("li").forEach((listitem) => {
	listitem.setAttribute("role", "presentation");
});

tabButtons.forEach((tab, index) => {
	tab.setAttribute("role", "tab");
	if (index === 0) {
		tab.setAttribute("aria-selected", "true");
		// we'll add something here
	} else {
		tab.setAttribute("tabindex", "-1");
		tabPanels[index].setAttribute("hidden", "");
	}
});

tabPanels.forEach((panel) => {
	panel.setAttribute("role", "tabpanel");
	panel.setAttribute("tabindex", "0");
});

tabsContainer.addEventListener("click", (e) => {
	const clickedTab = e.target.closest("a");
	if (!clickedTab) return;
	e.preventDefault();

	switchTab(clickedTab);
});

tabsContainer.addEventListener("keydown", (e) => {
	switch (e.key) {
		case "ArrowLeft":
			moveLeft();
			break;
		case "ArrowRight":
			moveRight();
			break;
		case "Home":
			e.preventDefault();
			switchTab(tabButtons[0]);
			break;
		case "End":
			e.preventDefault();
			switchTab(tabButtons[tabButtons.length - 1]);
			break;
	}
});

function moveLeft() {
	const currentTab = document.activeElement;
	if (!currentTab.parentElement.previousElementSibling) {
		switchTab(tabButtons[tabButtons.length - 1]);
	} else {
		switchTab(
			currentTab.parentElement.previousElementSibling.querySelector("a")
		);
	}
}

function moveRight() {
	const currentTab = document.activeElement;
	if (!currentTab.parentElement.nextElementSibling) {
		switchTab(tabButtons[0]);
	} else {
		switchTab(currentTab.parentElement.nextElementSibling.querySelector("a"));
	}
}

function switchTab(newTab) {
	console.log(newTab);
	const activePanelId = newTab.getAttribute("href");
	//should get index without jquery to keep this consistent but I'm bad at javascript
	const activePanelIndex = $(newTab).parent("li").index();
	const activePanel = tabsContainer.querySelector(activePanelId);

	tabButtons.forEach((button) => {
		button.setAttribute("aria-selected", false);
		button.setAttribute("tabindex", "-1");
	});

	tabPanels.forEach((panel) => {
		panel.setAttribute("hidden", true);
	});

	activePanel.removeAttribute("hidden", false);

	newTab.setAttribute("aria-selected", true);
	newTab.setAttribute("tabindex", "0");
	newTab.focus();

	tabsContainer.setAttribute("tab-state", activePanelIndex);
}
