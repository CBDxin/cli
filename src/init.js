const program = require("commander");
const inquirer = require("inquirer");
const Task = require("./Task");

const { copyFolder } = require("./util");

const task = new Task(program, process);

const init = (next) => {
	let version = require("../package.json").version;
	console.log(`version: ${version}`);
	next();
};

const prompting = (next) => {
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
      this.answers = answers;
      next()
    });
};

const writing = (next) => {
  copyFolder().then(()=>{
		next()
	})
	console.log("project initiating...");
	
};

const npmInstalling = (next) => {
	console.log("npm installing...");
	next();
};

module.exports = () => {
	task.use(init).use(prompting).use(writing).use(npmInstalling);
};
