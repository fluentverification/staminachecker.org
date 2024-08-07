
function closeCollapsible(id, headerId) {
	let collapsible = document.getElementById(id);
	let header = document.getElementById(headerId);
	let headerIcon = document.getElementById(headerId + "-icon");
	collapsible.style.display = "none";
	collapsible.style.overflowY = "hidden";
	collapsible.style.height = "0px";
	var txtValue = headerIcon.innerHTML;
	headerIcon.innerHTML = "&#9776;" + txtValue.slice(1, txtValue.length);
	header.onclick = () => openCollapsible(id, headerId);
}

function openCollapsible(id, headerId) {
	let collapsible = document.getElementById(id);
	let header = document.getElementById(headerId);
	let headerIcon = document.getElementById(headerId + "-icon");
	collapsible.style.display = "block";
	collapsible.style.overflowY = "visible";
	collapsible.style.height = "auto";
	var txtValue = headerIcon.innerHTML;
	headerIcon.innerHTML = "&times;" + txtValue.slice(1, txtValue.length);
	header.onclick = () => closeCollapsible(id, headerId);
}

