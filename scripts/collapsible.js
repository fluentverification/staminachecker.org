
function closeCollapsible(id, headerId) {
	let collapsible = document.getElementById(id);
	let header = document.getElementById(headerId);
	let headerIcon = document.getElementById(headerId + "-icon");
	collapsible.style.display = "none";
	var txtValue = headerIcon.innerHTML;
	headerIcon.innerHTML = "&#9776;" + txtValue.slice(1, txtValue.length);
	header.onclick = () => openCollapsible(id, headerId);
}

function openCollapsible(id, headerId) {
	let collapsible = document.getElementById(id);
	let header = document.getElementById(headerId);
	let headerIcon = document.getElementById(headerId + "-icon");
	collapsible.style.display = "block";
	var txtValue = headerIcon.innerHTML;
	headerIcon.innerHTML = "&times;" + txtValue.slice(1, txtValue.length);
	header.onclick = () => closeCollapsible(id, headerId);
}

