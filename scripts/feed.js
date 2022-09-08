function grabFeed() {
	return fetch("./feed/feed.json").then(response => response.json());
}

async function getFeedJSON() {
	let pages = await grabFeed().then(function(result) { return result; });
	return await pages;
}
