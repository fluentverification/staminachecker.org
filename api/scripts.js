function toggleAllAPIEnabled(enabled) {
	if (enabled) {
		document.querySelectorAll(".api-necc").forEach(e => {
			e.classList.remove("api-necc");
			e.classList.add("api-necc2");
		});
		document.querySelector("#api-url-down").style.display = "hidden";
	}
	else {
		document.querySelectorAll(".api-necc2").forEach(e => {
			e.classList.remove("api-necc2");
			e.classList.add("api-necc");
		});
		document.querySelector("#api-url-down").style.display = "block";
	}
}

window.onload = async function() {
	// Assume API_URL is defined here.
	// document.querySelectorAll(".api-necc").forEach(e => e.classList.add("disabled-box"));
	let response = await fetch(API_URL + "/egg");
	if (response.status === 200) { toggleAllAPIEnabled(true); }
	else { toggleAllAPIEnabled(false); }
};
