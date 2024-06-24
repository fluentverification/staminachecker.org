function toggleAllAPIEnabled(enabled) {
	if (enabled) {
		document.querySelectorAll(".api-necc").forEach(e => e.classList.remove("disabled-box"));
		document.querySelector("#api-url-down").style.display = "hidden";
	}
	else {
		document.querySelectorAll(".api-necc").forEach(e => e.classList.add("disabled-box"));
		document.querySelector("#api-url-down").style.display = "block";
	}
}

window.onload = function() {
	// Assume API_URL is defined here.
	let response = await fetch(API_URL + "/egg");
	if (response.status === 200) { toggleAllAPIEnabled(true); }
	else { toggleAllAPIEnabled(false); }
};
