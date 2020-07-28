const fs = require("fs");
const downloadGit = require("download-git-repo");
const child_process = require("child_process");
const path = require("path");

let isExist = async name => {
	if (fs.existsSync(name)) {
		return true;
	} else {
		return false;
	}
};

let downloadTPL = (ProjectName, api) => {
	return new Promise((resolve, reject) => {
		downloadGit(api, ProjectName, { clone: true }, err => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
};

let updateJsonFile = (fileName, option) => {
	return new Promise(resolve => {
		if (fs.existsSync(fileName)) {
			const data = fs.readFileSync(fileName).toString();
			let json = JSON.parse(data);
			Object.keys(option).forEach(key => {
				json[key] = option[key];
			});
			fs.writeFileSync(fileName, JSON.stringify(json, null, "\t"), "utf-8");
			resolve();
		}
	});
};

function copyFolder(copiedPath, resultPath) {
	return new Promise((resolve, reject) => {
		if (fs.existsSync(copiedPath)) {
			let cp = child_process.spawn("cp", ["-r", copiedPath, resultPath]);
			cp.on("close", () => {
				resolve();
			});
		} else {
			reject();
			console.log("do not exist path: ", copiedPath);
		}
	});
}

const downloadTemplate = async projectName => {
	let copiedPath = path.join(__dirname, "../template");
	let resultPath = path.join(process.cwd(), projectName);
	return await copyFolder(copiedPath, resultPath);
};

module.exports = {
	isExist,
	downloadTPL,
	updateJsonFile,
	copyFolder,
	downloadTemplate
};
