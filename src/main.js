import program from "commander";
import symbol from "log-symbols";
import chalk from "chalk";

import create from "./create";

// console.log(process.argv);

program.usage("<command> [options]");

program
	.command("create")
	.description("创建一个项目")
	.alias("c")
	.usage("<command> <project>")
	.action(() => {
		create(...process.argv.slice(3));
	});

//command方法在接受不同数量的参数时会返回不同的对象，只接受一个参数子命令名的话返回的是 子命令本身，而如果加上第二个参数子命令介绍的话，返回值就变成了整个命令行的原型

//command第一个参数为命令名称，alias为命令的别称， 其中<>包裹的为必选参数 []为选填参数 带有...的参数为剩余参数的集合
program
	.command("init <type> [name] [otherParams...]")
	.alias("i")
	.description("Generates new code")
	// .option('-n, --name <items1> [items2]', 'name description', 'default value')
	.option("-d, --day [d]")
	.action(function (type, name, otherParams, cmd) {
		console.log("type", type);
		console.log("name", name);
		console.log("other", otherParams);
		console.log("day", cmd.day);
		// 在这里执行具体的操作
	});

//子命令模式，
program.command("test", "test");

program.version(require("../package.json").version, "-v --version").parse(process.argv);
