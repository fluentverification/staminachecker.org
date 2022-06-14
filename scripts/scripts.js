var darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

if (darkMode) {
	setDarkMode();
}
/**
 * This script lets us monitor the window size and reset the navbar if it's larger than 800px
 * */
console.log("Adding event listener for window");
window.addEventListener('resize', function(event) {
	console.log(screen.width);
	if (screen.width > 850) {
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
	var elements = document.querySelectorAll("a");
	Array.prototype.forEach.call(elements, e =>
		{if (!(e.classList.contains('navbar') || e.classList.contains('button') ) ){
			e.classList.add("a-dark");
		}}
	);
	var elements = document.getElementsByClassName("content");
	Array.prototype.forEach.call(elements, e => e.classList.add("content-dark"));
	var elements = document.getElementsByClassName("banner");
	Array.prototype.forEach.call(elements, e => e.classList.add("banner-dark"));
	var elements = document.getElementsByClassName("banner-content");
	Array.prototype.forEach.call(elements, e => e.classList.add("banner-content-dark"));
	var elements = document.getElementsByClassName("form");
	Array.prototype.forEach.call(elements, e => e.classList.add("form-dark"));
	var elements = document.getElementsByClassName("inline-code");
	Array.prototype.forEach.call(elements, e => e.classList.add("inline-code-dark"));
	var elements = document.getElementsByClassName("code");
	Array.prototype.forEach.call(elements, e => e.classList.add("code-dark"));
	var elements = document.getElementsByClassName("citation");
	Array.prototype.forEach.call(elements, e => e.classList.add("citation-dark"));
	var elements = document.getElementsByClassName("footer");
	Array.prototype.forEach.call(elements, e => e.classList.add("footer-dark"));
	var elements = document.querySelectorAll(".footer-links");
	Array.prototype.forEach.call(elements, e =>
		{ e.classList.add("footer-links-dark"); e.style.color = "#ffffff";});
	var elements = document.querySelectorAll("input");
	Array.prototype.forEach.call(elements, e => e.classList.add("input-dark"));
	var elements = document.querySelectorAll("select");
	Array.prototype.forEach.call(elements, e => e.classList.add("select-dark"));
	var elements = document.querySelectorAll("textarea");
	Array.prototype.forEach.call(elements, e => e.classList.add("textarea-dark"));
	var elements = document.querySelectorAll("body");
	Array.prototype.forEach.call(elements, e => e.classList.add("body-dark"));
	var elements = document.querySelectorAll("collapsible-header");
	Array.prototype.forEach.call(elements, e => e.classList.add("collapsible-header-dark"));
}

function setLightMode() {
	console.log("Setting light mode");
	var elements = document.getElementsByClassName("content");
	Array.prototype.forEach.call(elements, e => e.classList.remove("content-dark"));
	var elements = document.getElementsByClassName("banner");
	Array.prototype.forEach.call(elements, e => e.classList.remove("banner-dark"));
	var elements = document.getElementsByClassName("banner-content");
	Array.prototype.forEach.call(elements, e => e.classList.remove("banner-content-dark"));
	var elements = document.getElementsByClassName("form");
	Array.prototype.forEach.call(elements, e => e.classList.remove("form-dark"));
	var elements = document.getElementsByClassName("inline-code");
	Array.prototype.forEach.call(elements, e => e.classList.remove("inline-code-dark"));
	var elements = document.getElementsByClassName("code");
	Array.prototype.forEach.call(elements, e => e.classList.remove("code-dark"));
	var elements = document.getElementsByClassName("citation");
	Array.prototype.forEach.call(elements, e => e.classList.remove("citation-dark"));
	var elements = document.getElementsByClassName("footer");
	Array.prototype.forEach.call(elements, e => e.classList.remove("footer-dark"));
	var elements = document.querySelectorAll(".footer-links-dark table a");
	Array.prototype.forEach.call(elements, e => e.classList.remove("footer-links-dark"));
	var elements = document.querySelectorAll("a");
	Array.prototype.forEach.call(elements, e => e.classList.remove("a-dark"));
	var elements = document.querySelectorAll("input");
	Array.prototype.forEach.call(elements, e => e.classList.remove("input-dark"));
	var elements = document.querySelectorAll("select");
	Array.prototype.forEach.call(elements, e => e.classList.remove("select-dark"));
	var elements = document.querySelectorAll("textarea");
	Array.prototype.forEach.call(elements, e => e.classList.remove("textarea-dark"));
	var elements = document.querySelectorAll("body");
	Array.prototype.forEach.call(elements, e => e.classList.remove("body-dark"));
	var elements = document.querySelectorAll("collapsible-header");
	Array.prototype.forEach.call(elements, e => e.classList.remove("collapsible-header-dark"));
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
