const program = require("commander");
const inquirer = require("inquirer");
const Task = require("./Task");
const symbol = require("log-symbols");
const chalk = require("chalk");
const path = require("path");

const { downloadTemplate, isExist, copyFolder } = require("./util");

const task = new Task(program, process);

const init = next => {
	let version = require("../package.json").version;
	console.log(`version: ${version}`);
	next();
};

const prompting = next => {
	inquirer
		.prompt([
			{
				type: "input",
				name: "description",
				message: "请输入项目描述:",
			},
			{
				type: "input",
				name: "author",
				message: "请输入作者名称:",
			},
			{
				type: "confirm",
				name: "webpackConfig",
				message: "是否需要进行webpack配置更改：",
			},
			{
				type: "confirm",
				name: "fridayConfig",
				message: "是否需要添加friday配置：",
			},
		])
		.then(answers => {
			this.answers = answers;
			console.log(this.answers);
			next();
		});
};

const writing = (projectName, next) => {
	downloadTemplate(projectName).then(() => {
		next();
	});
	console.log("project initiating...");
};

// const customizing = async next => {
// 	if (this.answers.webpackConfig) {
// 		console.log("");
// 		console.log("webpack config installing...");
// 		let from = path.join(__dirname, "");
// 		await copyFolder();
// 	}
// };

const npmInstalling = next => {
	console.log("");
	console.log("npm installing...");
	next();
};

module.exports = async projectName => {
	if (!projectName) {
		console.log(symbol.error, chalk.red("请输入项目名称！"));
	} else if (await isExist(projectName)) {
		console.log(symbol.error, chalk.red("项目已存在！"));
	} else {
		task
			.use(init)
			.use(prompting)
			.use(next => {
				writing(projectName, next);
			})
			// .use(customizing)
			.use(npmInstalling);
	}
};
