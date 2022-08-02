let navOpen = true;

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
// 	closeButtonLabel.style.display = "none";
	let quickNavs = document.getElementsByClassName('quick-nav-label');
	Array.prototype.forEach.call(quickNavs, function (element) { element.style.display = "none"; });
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
// 	closeButtonLabel.style.display = "inline-block";
	let quickNavs = document.getElementsByClassName('quick-nav-label');
	Array.prototype.forEach.call(quickNavs, function (element) { element.style.display = "inline"; });
	navOpen = true;
}

function toggleNav() {
	if (navOpen) {
		closeSidebar();
	}
	else {
		openSidebar();
	}
}

window.onload = function () { closeSidebar(); }
