function popout(popoutId) {
	let popElem = document.getElementById(popoutId);
	popElem.classList.add("popout-expanded");
	let closeButton = document.getElementById(popoutId + "-close");
	closeButton.style.display = "block";
}

function closePopup(popoutId) {
	let popElem = document.getElementById(popoutId);
	popElem.classList.remove("popout-expanded");
	let closeButton = document.getElementById(popoutId + "-close");
	closeButton.style.display = "none";
}
