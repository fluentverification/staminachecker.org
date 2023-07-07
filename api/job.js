// When debugging, use Flask on Port 5000
// var API_URL = "http://127.0.0.1:5000";
// This has not actually yet been deployed.
var API_URL = "https://left.engr.usu.edu/stamina"; // "https://api.staminachecker.org";
// const API_URL = "https://api.staminachecker.org/"
var uid_global = null;

// Converts the terminal output from the STAMINA docker into some pretty HTML
// Yes, this is hackey
const INFO_HEADER="\u001b[1m\u001b[34m[INFO]: \u001b[0m\u001b[0m";
const MSG_HEADER="\u001b[1m\u001b[32m[MESSAGE]: \u001b[0m\u001b[0m";
const WARN_HEADER="\u001b[1m\u001b[33m[WARNING]: \u001b[0m\u001b[0m";
const ERR_HEADER="\u001b[1m\u001b[31m[ERROR]: \u001b[0m\u001b[0m\u001b[1m";

const BOLD_START = "\u001b[1m";
const BOLD_END = "\u001b[0m";
const PURPLE_START = "\u001b[35m";

const H_LINE="========================================================================================";

// var logs = "";

/**
 * Does some really hackey text-parsing to present some information to the user.
 *
 * This is so hackey I understand why people make their code proprietary. Please don't think the actual STAMINA codebase is this hackey.
 * */

async function getLogData() {
	console.log("Making request to " + API_URL + "/checkjob" + " for uid: " + uid_global)
	fetch(API_URL + "/checkjob", {
		method:"POST"
		, mode: "cors"
		, body:uid_global // JSON.stringify({id:uid_global})
// 		, headers: {
// 			"Content-Type": "application/json"
// 		}
	}).then((response) => response.text()
		.then((text) => {
			// console.log(text)
			let out = document.getElementById("output");
			out.innerHTML = "";
// 			logs = text;
			var logFileText = "";
			text.split("\n").forEach(t => {
// 				console.log(t);
				// This is an "info" text
				if (t.startsWith(INFO_HEADER)) {
					let lineText = t.replace(INFO_HEADER, "");
					out.innerHTML += "<span class=info>"
					+ lineText
					+ "</span>";
					logFileText += "[INFO] " + lineText + "\n";
				}
				// This is a "good" msg text
				else if (t.startsWith(MSG_HEADER)) {
					let lineText = t.replace(MSG_HEADER, "");
					out.innerHTML += "<span class=good>"
					+ lineText
					+ "</span>";
					// I should probably do something a little better this.
					// This is really hackey
					if (t.includes("Finished running!")) {
						document.getElementById("status").innerHTML = "Finished";
					}
					logFileText += "[MESSAGE] " + lineText + "\n";
				}
				else if (t.startsWith(WARN_HEADER) || t.includes("WARN")) {
					let lineText = t.replace(WARN_HEADER, "").replace("WARN", "");
					out.innerHTML += "<span class=warn>"
					+ lineText
					+ "</span>";
					logFileText += "[WARNING] " + lineText + "\n";
				}
				else if (t.startsWith(ERR_HEADER)) {
					let lineText = t.replace(ERR_HEADER, "");
					out.innerHTML += "<span class=err>"
					+ lineText
					+ "</span>";
					if (t.includes("exit")) {
						document.getElementById("status").innerHTML = "Exited with error";
					}
					logFileText += "[ERROR] " + lineText + "\n";
				}
				else if (t == H_LINE) {
					out.innerHTML += "<span class=hline></span>"
					logFileText += H_LINE + "\n";
				}
				else if (t == "Killed.")
				{
					document.getElementById("status").innerHTML = "Killed (by user or by timeout)";
					out.innerHTML += "<span class=\"err killed\">"
					+ t
					+ "</span>";
					logFileText += "Killed.\n";
				}
				else {
					if (t.trim() == "") { return; }
					out.innerHTML += "<span class=line>"
					// This is soo hacky
					+ t.replace(BOLD_START + PURPLE_START, "<b><span style='color:#bb1cbb'>")
						.replace(BOLD_END + BOLD_END, "</span></b>")
						.replace(BOLD_START, "<b>")
						.replace(BOLD_END, "</b>")
					+ "</span>";
// 					console.log(t);
					if (t.includes("Probability Minimum:")) {
						console.log(t);
						var tToAdd = t.replace("Probability Minimum:", "").replaceAll(BOLD_END, "").replace(PURPLE_START, "").replace(BOLD_START, "");
						console.log(tToAdd);
						document.getElementById("pmin").innerHTML = tToAdd;
						document.querySelectorAll(".results").forEach(t => t.style.display = "block");
						logFileText += "Probability Minimum: " + tToAdd + "\n";
					}
					else if (t.includes("Probability Maximum:")) {
						var tToAdd = t.replace("Probability Maximum:", "").replaceAll(BOLD_END, "").replace(PURPLE_START , "").replace(BOLD_START, "");
						document.getElementById("pmax").innerHTML = tToAdd;
						logFileText += "Probability Maximum: " + tToAdd + "\n";
					}
					else if (t.includes("Window:")) {
						var tToAdd = t.replace("Window:", "").replace(BOLD_END, "");
						document.getElementById("w").innerHTML = tToAdd;
						logFileText += "Window: " + tToAdd + "\n";
					}
					else {
						logFileText += t.replace(BOLD_START, "").replace(BOLD_END, "") + "\n";
					}
				}
			});
			let saveLogs = document.getElementById("save-logs");
			var logFile = new Blob([logFileText], {type:"text/plain"});
			saveLogs.href = URL.createObjectURL(logFile);
			saveLogs.download = "stamina_logs_" + uid_global + ".txt"
		}));
	let now = new Date();
	document.getElementById("check-time").innerHTML = now.toLocaleString();
}

async function getMyJobs() {
	console.log("Making request to " + API_URL + "/myjobs");
	fetch(API_URL + "/myjobs", {
		method:"GET"
	}
	).then((response) => response.json()
		.then((json) => {
			console.log(json);
			let jobs = document.getElementById("jobs");
			jobs.innerHTML = "";
			if ("error" in json) {
				let error = json["error"];
				if (error.includes("no active jobs")) {
					jobs.innerHTML += "<div class=card>You have no active jobs. Try creating a job at <a href=https://staminachecker.org/run>https://staminachecker.org/run</a></div>";
				}
				else {
					jobs.innerHTML += "<div class=error>Got the following error when attempting to access jobs:<br>"
				+ error + "</div>";
				}
			}
			else {
				let apiUrlNoHttp = API_URL.replace("http://", "").replace("https://", "");
				json.forEach((job) => {
					let jobKilled = job.status == "killed";
					let jobExited = job.status == "exited";
					let jobPruned = job.status == "pruned";
					var addlClass = "";
					if (jobKilled || jobExited || jobPruned) {
						addlClass = "disabled";
					}
					jobs.innerHTML += "<div class=job id=job-card-" + job.uid + ">"
					// Job name
					+ "<h2><span id=job-name-" + job.uid + ">" + job.name + "</span>&nbsp;"
					// Edit button
					+ "<span onclick=requestRenameJob('" + job.uid + "')><i class=\"clickable-icon icon icon_document-edit\"></i></span>"
					// Delete Button
					+ "<span onclick=requestDeleteJob('" + job.uid + "')><i class=\"clickable-icon icon icon_edit-delete\"></i></span>"
					+ "</h2>"
					// UID
					+ "<div>UID: " + job.uid + "</div>"
					// Status
					+ "<div id=job-" + job.uid + "-status>Status: " + job.status + "</div>"
					// Pmin and Pmax, if applicable
					+ getPminPmaxIfApplicable(job)
					// View Button
					+ "<a class=button-small href=job.html?uid=" + job.uid
					// API URL
// 					+ "&api_url=" + apiUrlNoHttp
					+ " target=_blank rel=\"noopener noreferrer\"><i class=\"icon just-icon icon_go-next\"></i>View</a>"
					// Kill Button
					+ "<a class=\"button-small-error " + addlClass + "\" onclick='killJob(\"" + job.uid + "\")' id=kill-job-" + job.uid + "><i class=\"icon just-icon icon_process-stop\"></i>Kill</a>"
					// Hidden logs
					+ "<div class=job-card-logs>" + job.logs
							.replaceAll(INFO_HEADER, "[INFO] ")
							.replaceAll(WARN_HEADER, "[WARN] ")
							.replaceAll(MSG_HEADER, "[MESSAGE] ")
							.replaceAll(ERR_HEADER, "[ERROR] ")
							.replaceAll(BOLD_START, "")
							.replaceAll(BOLD_END, "")
							.replaceAll(PURPLE_START, "")
							.replaceAll("\n", "<br>")
					+ "</div>"
					+ "</div>";
				});
			}
		}));
	let now = new Date();
	document.getElementById("check-time").innerHTML = now.toLocaleString();
}

/**
 * Sends an HTTP request to the /kill endpoint for the STAMINA to stop
 * a job with a certain UID.
 * */
function killJob(uid) {
	fetch(API_URL + "/kill", {
		method: "POST"
		, mode: "cors"
		, body: uid
	}).then((response) => response.text()
		.then((text) => {
			console.log(text);
			// Should really do some kind of flag here
			if (text == "Success") {
				let btn = document.getElementById("kill-job-"+uid);
				btn.classList.add("disabled");
				btn.onclick = "";
				let statusLabel = document.getElementById("job-"+uid+"-status").innerHTML = "Status: killed";
			}
	}));
}

/**
 * Sends an HTTP request to the /rename endpoint for STAMINA to rename a job
 * with a certain UID.
 * */
function renameJob(uid, newName) {
	fetch(API_URL + "/rename", {
		method: "POST"
		, mode: "cors"
// 		, headers: new Headers({
// 			"Content-Type": "application/json"
// 			, "Access-Control-Allow-Origin":"*"
// 			, "Access-Control-Allow-Headers": "*"
// 		})
		, body: JSON.stringify({
			id: uid
			, name: newName
		})
	}).then((response) => {
		if (response.status == 200) {
			document.getElementById("job-name-" + uid).innerHTML = newName;
		}
		else {
			response.text()
				.then((text) => {
					alert("Got status \"" + response.status + "\" when trying to rename Job!\nError: " + text);
				});
		}
	});
}

function requestRenameJob(uid) {
	let name = prompt("New name for job:");
	if (name == null) {
		return;
	}
	else if (name == "") {
		alert("Job name cannot be empty!");
		return;
	}
	renameJob(uid, name);
}

function requestDeleteJob(uid) {
	if (!confirm("Are you sure? This will delete your job with UID: " + uid)) {
		return;
	}
	fetch(API_URL + "/jobs", {
		method: "DELETE"
		, mode: "cors"
		, body: uid
	}).then((response) => {
		if (response.status == 200) {
			document.getElementById("job-card-" + uid).remove();
		}
		else {
			alert("Could not delete job");
		}
	});
}

function requestDeleteAllJobs() {
	if (!confirm("Are you sure? This will delete ALL of your jobs!")) { return; }
	fetch(API_URL + "/myjobs", {
		method: "DELETE"
		, mode: "cors"
	}).then((response) => {
		if (response.status == 200) {
			alert("Success!");
			document.getElementById("jobs").innerHTML = "";
		}
		else {
			alert("Failed");
		}
	});
}

// function confirmRequestDeleteAllJobs() {
// 	if (confirm("Are you sure? This will delete ALL jobs.\nYou will NOT be able to access job logs after this.")) {
// 		requestDeleteAllJobs();
// 	}
// }

function getPminPmaxIfApplicable(job) {
	var toReturn = "";
	var pMin = null;
	var pMax = null;
	job.logs.split("\n").forEach((line) => {
		if (line.includes("Probability Minimum:")) {
			pMin = line.replace("Probability Minimum:", "")
					.replaceAll(BOLD_END, "")
					.replace(PURPLE_START, "")
					.replace(BOLD_START, "");
		}
		else if (line.includes("Probability Maximum:")) {
			pMax = line.replace("Probability Maximum:", "")
					.replaceAll(BOLD_END, "")
					.replace(PURPLE_START, "")
					.replace(BOLD_START, "");
		}
	});
	if (pMin != null) {
		toReturn += "<div>P<sub>min</sub>:" + pMin + "</div>";
	}
	if (pMax != null) {
		toReturn += "<div>P<sub>max</sub>:" + pMax + "</div>";
	}
	return toReturn;
}

function changeApiUrl() {
	API_URL = prompt("Please insert a new API URL (current one is " + API_URL + "):");
	if (API_URL == "") {
		alert("API URL cannot be empty. Will use old one: " + API_URL);
		return;
	}
	else if (API_URL == null) {
		return;
	}
	refreshApiUrl();
}

function getAPIUrlFromCookieOrURL() {
	// Highest priority is URL parameter
	let apiURLQuery = getParameterByName("api_url");
	if (apiURLQuery != null) {
		console.log("Found API URL in URL Query.");
		API_URL = "https://" + apiURLQuery.replace("http://", "").replace("https://", "");
	}
	else {
		// Next priority is local storage
		let apiStorage = localStorage.getItem("api-url");
		if (apiStorage != null) {
			API_URL = apiStorage;
		}
		else {
			// Final priority is in the cookie
			let apiCookie = findFieldInCookie("api-url");
			if (apiCookie != null) {
				console.log("Found API URL in cookie");
				API_URL = apiCookie;
			}
		}
	}
}

function refreshApiUrl() {
	document.getElementById("api-url").innerHTML = API_URL;
	localStorage.setItem("api-url", API_URL);
	// We don't use the cookie anymore
// 	updateFieldInCookie("api-url", API_URL);
	let options = document.getElementById("options")
	if (options != null) { options.action = API_URL + "/jobs"; }
}

function checkApiUrl() {
	// Check the status of the easter egg of the API URL to ensure it's up
	fetch(API_URL + "/egg", {
		method: "GET"
		, mode: "cors"
	}).then((response) => {
		if (response.status != 200) {
			if (confirm("[WARNING] The API URL\"" + API_URL + "\" appears to be down. Would you like to choose a new API URL?")) {
				changeApiUrl();
			}
		}
	});
}

function viewSpecificJob() {
	let jid = prompt("Please input the UID of the job you wish to view:");
	if (jid == null || jid == "") {
		return;
	}
	window.location = "https://staminachecker.org/api/job?uid=" + jid;
}
