function grabFeed() {
	return fetch("./feed/feed.json").then(response => response.json());
}

async function getFeedJSON() {
	let pages = await grabFeed().then(function(result) { return result; });
	return await pages;
}

async function populateFeed() {
	const feedJson = (await getFeedJSON());
	let feedbox = document.getElementById('feedbox');
	feedbox.innerHTML = "";
	feedJson.feed.forEach(function(feedItem) {
		feedbox.innerHTML += "<div>" +
		"<h3>" + feedItem.title + "</h3>" +
		"<h4>" + feedItem.date + "</h4>" +
		feedItem.description
		+ "</div>";
	});
}
