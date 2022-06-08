
function closeCollapsible(id, headerId) {
	let collapsible = document.getElementById(id);
	let header = document.getElementById(headerId);
	collapsible.style.display = "none";
	var txtValue = header.innerHTML;
	header.innerHTML = "&#9660;" + txtValue.slice(1, txtValue.length);
	header.onclick = () => openCollapsible(id, headerId);
}

function openCollapsible(id, headerId) {
	let collapsible = document.getElementById(id);
	let header = document.getElementById(headerId);
	collapsible.style.display = "block";
	var txtValue = header.innerHTML;
	header.innerHTML = "&#9650;" + txtValue.slice(1, txtValue.length);
	header.onclick = () => closeCollapsible(id, headerId);
}
