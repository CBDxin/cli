import symbol from "log-symbols";
import chalk from "chalk";
import inquirer from "inquirer";
import ora from 'ora';

import { isExist } from "./util";

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
        let loading = ora("开始下载...")
        
			});
	}
};

export default create;
