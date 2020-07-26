const fs = require("fs");
const downloadGit = require("download-git-repo");

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

module.exports = {
	isExist,
	downloadTPL,
	updateJsonFile
}