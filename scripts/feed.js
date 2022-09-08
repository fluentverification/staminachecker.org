function grabFeed() {
	return fetch("./feed/feed.json").then(response => response.json());
}

async function getFeedJSON() {
	let pages = await grabFeed().then(function(result) { return result; });
	return await pages;
}

function populateRSSFeed() {
	const feedJson = (await getFeedJSON());
	let feedbox = document.getElementById('feedbox');
	feedbox.innerHTML = "";
	feedJson.feed.forEach(function(feedItem) {
		feedbox.innerHTML += "<a href='#'>" + 
			"<h3>" + feedItem.title + "</h3>" +
			"<h4>" + feedItem.date + "</h4>" +
			feedItem.description
		+ "</a>";
	});
}
