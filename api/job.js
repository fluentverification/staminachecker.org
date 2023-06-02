// When debugging, use Flask on Port 5000
const API_URL = "http://127.0.0.1:5000";
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
			let saveLogs = document.getElementById("save-logs");
			var logFile = new Blob([text], {type:"text/plain"});
			saveLogs.href = URL.createObjectURL(logFile);
			saveLogs.download = "stamina_logs.txt"
			text.split("\n").forEach(t => {
// 				console.log(t);
				// This is an "info" text
				if (t.startsWith(INFO_HEADER)) {
					out.innerHTML += "<span class=info>"
					+ t.replace(INFO_HEADER, "")
					+ "</span>";
				}
				// This is a "good" msg text
				else if (t.startsWith(MSG_HEADER)) {
					out.innerHTML += "<span class=good>"
					+ t.replace(MSG_HEADER, "")
					+ "</span>";
				}
				else if (t.startsWith(WARN_HEADER)) {
					out.innerHTML += "<span class=warn>"
					+ t.replace(WARN_HEADER, "")
					+ "</span>";
				}
				else if (t.startsWith(ERR_HEADER)) {
					out.innerHTML += "<span class=err>"
					+ t.replace(ERR_HEADER, "")
					+ "</span>";
				}
				else if (t == H_LINE) {
					out.innerHTML += "<span class=hline></span>"
				}
				else {
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
						var tToAdd = t.replace("Probability Minimum:", "");
						console.log(tToAdd);
						document.getElementById("pmin").innerHTML = tToAdd;
						document.querySelectorAll(".results").forEach(t => t.style.display = "block");
					}
					else if (t.includes("Probability Maximum:")) {
						document.getElementById("pmax").innerHTML = t.replace("Probability Maximum:", "").replace(BOLD_END, "");
					}
					else if (t.includes("Window:")) {
						document.getElementById("w").innerHTML = t.replace("Window:", "").replace(BOLD_END, "");
					}
				}
			});
		}));
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
			if ("error" in json) {
				jobs.innerHTML += "<div class=error>Got the following error when attempting to access jobs:<br>"
				+ json["error"] + "</div>";
			}
			else {
				json.forEach((job) => {
					jobs.innerHTML += "<ul>UID:" + job.uid + " <a href=job.html?uid=" + job.uid + ">link</a></ul>";
				});
			}
		}));
}
