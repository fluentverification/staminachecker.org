let colorScheme = localStorage.getItem("color-scheme");

var darkMode = (colorScheme != null && colorScheme == "dark") || window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

var showPrivacyInfo = colorScheme == null;

// var expirationDate = new Date();
// expirationDate.setFullYear(expirationDate.getFullYear() + 1);
// var expireCookie = "expires=" + expirationDate.toUTCString();

function updateFieldInCookie(fieldName, value) {
	let curCookie = document.cookie;
	document.cookie = "";
	var foundField = false;
	curCookie.split(";").forEach((c) => {
		if (curCookie.startsWith(fieldName)) {
			document.cookie += fieldName + "=" + value + ";";
			foundField = true;
		}
		else {
			document.cookie += c + ";";
		}
	});
	if (!foundField) {
		document.cookie += fieldName + "=" + value + ";";
	}
	return document.cookie;
}

function findFieldInCookie(searchField) {
	if (document.cookie == "") { return; }
	let cookieFields = document.cookie.split(";");
	// can't use Array.forEach.
	for (const c of cookieFields) {
		let [field, value] = c.split("=");
		field = field.trim();
		value = value.trim();
		// 		console.log(field + " : " + value);
		if (searchField == field) {
			// 			console.log("\"" + searchField + "\" is the the same as \"" + field + "\"");
			return value;
		}
		// 		else {
		// 			console.log("\"" + searchField + "\" is not the the same as \"" + field + "\"");
		// 		}
	}
	return null;
}

window.onload = function() {
	if (darkMode) {
		setDarkMode();
	}
	else {
		setLightMode();
		// localStorage("color-scheme", "light");
// 		document.cookie = "color-scheme=light; " + expireCookie + "; SameSite=none; Secure=true;";
	}
	// If showPrivacyInfo
	if (showPrivacyInfo) {
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
// 	console.log(screen.width);
	if (screen.width > 900) {
// 		console.log("Setting navbar to normal full-width");
		let elements = document.getElementsByClassName("navbutton");
// 		console.log(elements);
		Array.prototype.forEach.call(elements, e => e.style.display = "block");
		// active may be null
		let ac = document.getElementById("active");
		if (ac != null) {
			ac.style.display = "block";
		}
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
	localStorage.setItem("color-scheme", "dark");
// 	document.cookie = "color-scheme=dark; " + expireCookie + "; SameSite=none; Secure=true;";
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
	localStorage.setItem("color-scheme", "light");
// 	document.cookie = "color-scheme=light " + expireCookie + " SameSite=none Secure=true";
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
	// active may be null
	let ac = document.getElementById("active");
	if (ac != null) {
		ac.style.display = "block";
	}
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
	// active may be null
	let ac = document.getElementById("active");
	if (ac != null) {
		ac.style.display = "none";
	}
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
	alert("Copied!");
}

/**
 * Grrrrr.......damn you Tim Cook!
 *
 * Some explanation: basically, MacOS's font-rendering is wack, and so in order to
 * get the breeze icons to render properly, we have to add a bunch of wack margins
 * and change position and stuff. This "fix" is hackey, but it should kind of work.
 *
 * The bug only appears on MacOS/iOS and ONLY if NOT using Firefox.
 * */
/*function fixIconsOnMacAndIos() {
	var isMacLike = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
	var isIOS = /(iPhone|iPod|iPad)/i.test(navigator.platform);
	var isFirefoxLike = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

	if ((isMacLike || isIOS) && !isFirefoxLike) {
		// Fix le icons
		var styles = ".icon:before { position: relative; top: 250px;} #search-icon:before { position: fixed; top: 212px;} @media screen and (max-width: 900px) { #search-icon:before { position: relative; } }";
		var styleSheet = document.createElement("style")
		styleSheet.innerText = styles;
		document.head.appendChild(styleSheet);
	}
}*/

fixIconsOnMacAndIos();
