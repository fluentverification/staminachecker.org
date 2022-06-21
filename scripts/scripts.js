var darkMode = (document.cookie.includes("color-scheme=dark")) || window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

var showCookieInfo = document.cookie == "";

var expirationDate = new Date();
expirationDate.setFullYear(expirationDate.getFullYear() + 1);
var expireCookie = "expires=" + expirationDate.toUTCString();

window.onload = function() {
	if (darkMode) {
		setDarkMode();
	}
	else {
		document.cookie = "color-scheme=light " + expireCookie;
	}
	// If showCookieInfo
	if (showCookieInfo) {
		let cookieBanner = document.getElementById('cookie-banner');
		if (cookieBanner != null) {
			cookieBanner.style.display = "block";
		}
	}
}
/**
 * This script lets us monitor the window size and reset the navbar if it's larger than 800px
 * */
console.log("Adding event listener for window");
window.addEventListener('resize', function(event) {
	console.log(screen.width);
	if (screen.width > 900) {
		console.log("Setting navbar to normal full-width");
		let elements = document.getElementsByClassName("navbutton");
		console.log(elements);
		Array.prototype.forEach.call(elements, e => e.style.display = "block");
		document.getElementById("active").style.display = "block";
		document.getElementById("navbar").style.display = "block";
		document.getElementById("openbutton").style.display = "none";
		document.getElementById("closebutton").style.display = "none";
	}
	else {
		closeNav();
	}
}, true);

function toggleDarkMode() {
	if (darkMode) {
		setLightMode();
	}
	else {
		setDarkMode();
	}
	darkMode = !darkMode;
}

function setDarkMode() {
	console.log("Setting dark mode");
	document.cookie = "color-scheme=dark " + expireCookie;
	var rt = document.querySelector(':root');
	rt.style.setProperty('--color', 'white');
	rt.style.setProperty('--color-two', '#f7f7f7');
	rt.style.setProperty('--background', '#222222');
	rt.style.setProperty('--background-two', '#262626');
	rt.style.setProperty('--background-three', '#363636');
	rt.style.setProperty('--link-base', 'var(--accent-medium)');

	let usuLogo = document.getElementById('usu-logo');
	if (usuLogo != null) { usuLogo.src = "images/u-state-white.png"; }
// 	Array.prototype.forEach.call(elements, e => e.classList.add("contents-dark"));
}

function setLightMode() {
	console.log("Setting light mode");
	document.cookie = "color-scheme=light " + expireCookie;
	var rt = document.querySelector(':root');
	rt.style.setProperty('--color', '#363636');
	rt.style.setProperty('--color-two', '#515151');
	rt.style.setProperty('--background', '#ffffff');
	rt.style.setProperty('--background-two', '#efefef');
	rt.style.setProperty('--background-three', '#ebebeb');
	rt.style.setProperty('--link-base', 'var(--accent-dark)');

	let usuLogo = document.getElementById('usu-logo');
	if (usuLogo != null) { usuLogo.src = "images/u-state-aggie-blue.png"; }
}
/**
 * This function opens the navbar when the screen is less than 800px
 * */
function openNav() {
	console.log("Opening navbar");
	let elements = document.getElementsByClassName("navbutton");
	console.log(elements);
	// This little "=>" operator is the coolest JavaScript thing ever
	Array.prototype.forEach.call(elements, e => e.style.display = "block");
	document.getElementById("active").style.display = "block";
	document.getElementById("closebutton").style.display = "block";
	document.getElementById("openbutton").style.display = "none";
	document.getElementById("navbar").style.display = "block";
}
/**
 * This function closes the navbar when the screen is less than 800px
 * */
function closeNav() {
	console.log("Closing navbar");
	let elements = document.getElementsByClassName("navbutton");
	console.log(elements);
	Array.prototype.forEach.call(elements, e => e.style.display = "none");
	document.getElementById("active").style.display = "none";
	document.getElementById("closebutton").style.display = "none";
	document.getElementById("openbutton").style.display = "block";
// 	document.getElementById("navbar").style.display = "none";
}

function copyIeee() {
	copyCitation('ieee');
}

function copyMla() {
	copyCitation('mla');
}

function copyCitation(id) {
	console.log("Copying citation " + id);
	var citation = document.getElementById(id);

	// Select and copy

	navigator.clipboard.writeText(citation.innerHTML);

	// Alert that we have copied text
	alert("Citation copied!");
}
