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
