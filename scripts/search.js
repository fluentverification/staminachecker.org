function showSearchBar() {
	let search = document.getElementById('search-overlay');
	let searchIcon = document.getElementById('search-icon');
	if (search.style.display == "block") {
		search.style.display = "none";
		searchIcon.classList.remove("icon_go-next");
		searchIcon.classList.add("icon_edit-find");
	}
	else {
		search.style.display = "block";
		searchIcon.classList.add("icon_go-next");
		searchIcon.classList.remove("icon_edit-find");
	}
}
function search(id='search') {
	let query = document.getElementById(id).value;
	console.log("Searching for " + query);
	document.location.assign("https://staminachecker.org/search.html?q=" + query);
}


/*
 * Taken from https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
 * */
function getParameterByName(name, url = window.location.href) {
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
	results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
