// const program = require("commander");
const inquirer = require("inquirer");
const Task = require("./Task");
const symbol = require("log-symbols");
const chalk = require("chalk");
const path = require("path");

const { downloadTemplate, isExist, copyFolder, writeJsonTo, updateJsonFile } = require("./util");

const task = new Task();

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
				name: "friday",
				message: "是否需要添加friday配置：",
			},
		])
		.then(answers => {
			this.answers = answers;
			next();
		});
};

const writing = next => {
	console.log("project initiating...");
	downloadTemplate(this.projectName).then(() => {
		console.log(symbol.success, chalk.green("project is initiated"));
		console.log("");
		console.log("update package.json...");
		updateJsonFile(path.join(process.cwd(), `${this.projectName}/package.json`), {
			name: this.projectName,
			...this.answers,
		}).then(() => {
			console.log(symbol.success, chalk.green("package.json is updated"));
			next();
		});
	});
};

const customizing = async next => {
	let config = {
		friday: false,
		webpackConfig: false,
	};
	if (this.answers.webpackConfig) {
		config.webpackConfig = true;
		console.log("");
		console.log("webpack config installing...");
		let from = path.join(__dirname, "../template/webpack");
		let to = path.join(process.cwd(), `${this.projectName}/webpack`);
		await copyFolder(from, to);
		console.log(symbol.success, chalk.green(`webpack config is installded in ${this.projectName}/webpack`));
	}

	if (this.answers.friday) {
		config.friday = true;
	}

	await writeJsonTo(config, path.join(process.cwd(), `${this.projectName}/llb.config.json`));

	next();
};

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
			.use(next => {
				this.projectName = projectName;
				next();
			})
			.use(init)
			.use(prompting)
			.use(writing)
			.use(customizing)
			.use(npmInstalling);
	}
};
