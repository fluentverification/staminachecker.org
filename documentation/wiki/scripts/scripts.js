let navOpen = true;
let wikiTreePopulated = false;

function closeSidebar() {
	console.log("Closing sidebar");
	let navbarContainer = document.getElementById('side-nav');
	let navbarList = document.getElementById('side-nav-list');
	let closeButtonIcon = document.getElementById('toggle-icon');
// 	let closeButtonLabel = document.getElementById('togglenav-label');
	let r = document.querySelector(':root');
	navbarList.style.display = "none";
	closeButtonIcon.classList.remove('icon_sidebar-collapse-left');
	closeButtonIcon.classList.add('icon_sidebar-expand-left');
	r.style.setProperty("--sidebar-width", "50px");
	r.style.setProperty("--sidebar-width-padded", "100px");
	r.style.setProperty("--label-display", "none");
	navOpen = false;
}

function openSidebar() {
	console.log("Opening sidebar");
	let navbarContainer = document.getElementById('side-nav');
	let navbarList = document.getElementById('side-nav-list');
	let closeButtonIcon = document.getElementById('toggle-icon');
// 	let closeButtonLabel = document.getElementById('togglenav-label');
	let r = document.querySelector(':root');
	navbarList.style.display = "block";
	closeButtonIcon.classList.add('icon_sidebar-collapse-left');
	closeButtonIcon.classList.remove('icon_sidebar-expand-left');
	r.style.setProperty("--sidebar-width", "200px");
	r.style.setProperty("--sidebar-width-padded", "250px");
	r.style.setProperty("--label-display", "inline");
	navOpen = true;
}

function toggleNav() {
	if (navOpen) {
		closeSidebar();
	}
	else {
// 		openSidebar();
		wikiTree(); // Also opens the sidebar
	}
}

function searchWiki() {
	// Import search script
	let origin = window.location.origin;
// 	alert("The STAMINA wiki is still under development. This has not been implemeted yet.");
	// Check to see if element exists
	let search = document.getElementById('search-overlay-fullpage');
	if (search != null) {
		if (search.style.display == "block") {
			search.style.display = "none";
		}
		else {
			search.style.display = "block";
		}
		return;
	}
	const script = document.createElement('script');
	script.src = origin + '/scripts/searchIndex.js';
	document.head.append(script);
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let content = document.querySelector('.content');
			content.innerHTML += xhttp.responseText;
		}
	}
	xhttp.open("GET", origin + "/documentation/wiki/searchOverlay.html", true);
	xhttp.send();
}

function grabTree() {
	return fetch("./wikiTree.json").then(response => response.json());
}

async function getTreeJSON() {
	let pages = await grabTree().then(function(result) { return result; });
	return await pages;
}

async function wikiTree() {
// 	alert("The STAMINA wiki is still under development. This has not been implemeted yet.");
	if (wikiTreePopulated && navOpen) {
		closeSidebar();
		return;
	}
	else if (wikiTreePopulated) {
		openSidebar();
		return;
	}
	const treeJson = (await getTreeJSON());
	let wikiTreeUL = document.getElementById('nav-list-title');
	// Iterate over all key-value pairs of the dictionary in wikiTree.json
	Object.keys(treeJson).forEach(function(htmlFile) {
		let pageTitle = treeJson[htmlFile];
		wikiTreeUL.innerHTML += "<li><a href='" + htmlFile + "'>" + pageTitle + "</a></li>";
	});
	wikiTreePopulated = true;
	openSidebar();
}
function closeOverlay() {
	document.getElementById('search-overlay-fullpage').style.display = "none";
}
function searchOnThisPage() {
	document.getElementById('search-results').innerHTML = "";
	let q = document.getElementById('query').value;
	searchCustom(q);
}

function escapeString(string) {
	
	let escapedString = string.replaceAll('\n', '\\n').replaceAll('"', '\\"').replaceAll("'", "\\'").replaceAll("/", "\\/");
	return btoa(string);
}

function copyAndConfirm(textToCopy) {
	navigator.clipboard.writeText(textToCopy);
	// Show the "copied" element
	let copyConfirm = document.getElementById("copy-confirmation");
	copyConfirm.style.display = "block";
	copyConfirm.style.opacity = "100%";
	copyConfirm.style.animation = "fade-in 1s ease";
	let hideButton = function() {
		copyConfirm.style.animationDirection = "reverse";
		copyConfirm.style.animation = "fade-in 2s ease";
		copyConfirm.style.display = "none";
		copyConfirm.style.opacity = "0%";
	}
	
	setTimeout(hideButton, 1500);
}

function addCopyButtons() {
	let allCodeBlocks = document.querySelectorAll('.code');
	allCodeBlocks.forEach(block => {
		let innerHTML = block.innerHTML;
		let command = block.innerText || block.textContent;
// 		console.log(command);
		let copyButton = "<button class=\"copy-button\" onclick=\"copyAndConfirm(atob(\'" + escapeString(command) + "\'))\"><i class=\"icon just-icon icon_edit-copy\"></i></button>";
		block.innerHTML = copyButton + innerHTML;
	});
	// Add confirmation button
	let content = document.querySelector('.content');
	content.innerHTML += '<div class="copy-confirmation" id="copy-confirmation">Copied successfully!<span class="close-button" onclick="document.getElementById(\'copy-confirmation\').style.display = \'none\';">&times;</span></div>';
}

window.onload = function () { 
	closeSidebar(); 
	addCopyButtons();
}
