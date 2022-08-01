function grabData() {
	return fetch("./scripts/searchIndex.json").then(response => response.json());
}

async function getPages() {
	let pages = await grabData().then(function(result) { return result; });
	return await pages;
}



let createHTML = function (article, id, query="") {
	console.log("Q:" + query);
	let contentSlice = "";
	if (query == "") {
		contentSlice = article.content.slice(0, 150);
	}
	else {
		let qIndex = article.content.toLowerCase().indexOf(query.toLowerCase());
		console.log("Index is " + qIndex);
		contentSlice += "..." + article.content.slice(qIndex - 25, qIndex);
		contentSlice += "<span class='rtext'>" + article.content.slice(qIndex, qIndex + query.length);
		contentSlice += "</span>" + article.content.slice(qIndex + query.length, 100 + qIndex + query.length);
	}
	console.log(contentSlice)
	let html =
	'<div id="search-result-' + id + '">' +
	'<a class="search-result" href="' + article.url + '">' +
	'<span class="aside">' +
	article.date +
	'</span>' +
	'<h2>' + article.title + '</h2>' +
	contentSlice + '...<br><br><span style="color: var(--accent-low-sat);">' +
	article.url +
	'</span></a>' +
	'</div>';
	return html;
};

function displayResults(results, query="") {
	let resultsDiv = document.getElementById('search-results');
	// Show results
	if (results.length < 1) {
		resultsDiv.innerHTML += "<div class='error-small'>No results</div>";
		return;
	}
	let html = '<p>Found ' + results.length + ' matching results</p>';
	html += results.map(function (article, index) {
		return createHTML(article, index, query);
	}).join('');
	
	resultsDiv.innerHTML = html;
}

async function searchCustom(query) {
	console.log("Searching for query: " + query);
	let reg = new RegExp(query, 'gi');
	let titlePriority = [];
	let bodyPriority = [];
	
	let pages = (await getPages()).search;
	
	// Actually perform search
	pages.forEach(function (article) {
		if (reg.test(article.title)) return titlePriority.push(article);
			if (reg.test(article.content)) bodyPriority.push(article);
	});
	
	// Combine the results
	let results = [].concat(titlePriority, bodyPriority);
	
	displayResults(results, query);
}
