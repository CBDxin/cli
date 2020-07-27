const symbol = require("log-symbols");
const chalk = require("chalk");
const inquirer = require("inquirer");
const path = require("path");
const ora = require("ora");
const { isExist, downloadTPL, updateJsonFile } = require("./util");

let create = async projectName => {
	if (!projectName) {
		console.log(symbol.error, chalk.red("创建项目的时候，请输入项目名"));
	} else if (await isExist(projectName)) {
		console.log(symbol.error, chalk.red("项目已存在！"));
	} else {
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
			])
			.then(answers => {
				const root = path.resolve(projectName);

				console.log(`在${chalk.green(root)}下创建应用.`);

				let loading = ora("开始下载...");
				loading.start('"开始下载..."');
				let api = "direct:https://gitee.com/fujinxiang/node-ejs.git";
				// let api = "direct:git@github.com:CBDxin/VueSocial.git";

				downloadTPL(projectName, api)
					.then(() => {
						loading.succeed("模板下载成功！");

						let PJSONName = `${projectName}/package.json`;
						updateJsonFile(PJSONName, { name: projectName, ...answers }).then(() => {
							console.log(symbol.success, chalk.green("配置文件以更新。"));
						});
					})
					.catch(err => {
						loading.fail("文件下载失败:" + err.message.trim());
					});
			});
	}
};

module.exports = create;
