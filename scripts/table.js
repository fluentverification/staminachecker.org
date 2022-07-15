
let FILE_FOUND = 200;
let FILE_PARSE_READY = 4;
/**
 * This only allows us to get data from the same origin url,
 * meaning we can only get CSV data from https://staminachecker.org/*
 *
 * NOTE: the "url" parameter is a SUB-DIRECTORY of the browser origin!
 * So do not pass in URLs like https://staminachecker.org/dir/file.csv.
 * Instead, pass in dir/file.csv
 * */
function getCSVDataAndAppendToTable(url, tableId, headerInfo, clearTable=true) {
	let origin = window.location.origin;
	let table = document.getElementById(tableId);
	if (clearTable) {
		table.innerHTML = "";
	}
	// Add header
	table.innerHTML += "<tbody>";
	table.innerHTML += headerInfo.map(colName => "<th>" + colName + "</th>");
	table.innerHTML += "</thead>";
	// Get the full URL of the request
	let requestURL = origin + "/" + url;
	console.log("Appending data at url " + requestURL);
	// Get the data from that URL
	var tableFile = new XMLHttpRequest();
	tableFile.onreadystatechange = function() {
		console.log("Loading file...");
		if (tableFile.readyState === FILE_PARSE_READY && tableFile.status === FILE_FOUND) {
			table.innerHTML += "<tbody>";
			// Parse the data
			rawTextData = tableFile.responseText;
			console.log(rawTextData);
			lines = rawTextData.split('\n');
			table.innerHTML += (
				lines.map(line =>
					"<tr>" + line.split(',').map(td => "<td>" + td + "</td>") + "</tr>"
				)
			);
			table.innerHTML += "</tbody>";
		}
		else {
			console.log("Could not find file at URL: " + requestURL + "!");
		}
	}
	tableFile.open("GET", requestURL, true);
	tableFile.send();
	// Some cleanup
	table.innerHTML = table.innerHTML.replace(/,/g, "");
	table.innerHTML = table.innerHTML.replace("/<tbody><\/tbody>/g", "");
}
