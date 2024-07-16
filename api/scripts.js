function toggleAllAPIEnabled(enabled, banner=true) {
	if (enabled) {
		document.querySelectorAll(".api-necc").forEach(e => {
			e.classList.remove("api-necc");
			e.classList.add("api-necc2");
		});
		if (banner) { document.querySelector("#api-url-down").style.display = "none"; }
	}
	else {
		document.querySelectorAll(".api-necc2").forEach(e => {
			e.classList.remove("api-necc2");
			e.classList.add("api-necc");
		});
		if (banner) { document.querySelector("#api-url-down").style.display = "block"; }
	}
}
