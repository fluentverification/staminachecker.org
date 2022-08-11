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
	const script = document.createElement('script');
	let origin = window.location.origin;
	script.src = origin + '/scripts/searchIndex.js';
	document.head.append(script);
// 	alert("The STAMINA wiki is still under development. This has not been implemeted yet.");
	// Check to see if element exists
	let search = document.getElementById('search-overlay-fullpage');
	if (search != null) {
		search.style.display = "block";
		return;
	}
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
	let q = document.getElementById('query').value;
	searchCustom(q);
}
window.onload = function () { closeSidebar(); }
