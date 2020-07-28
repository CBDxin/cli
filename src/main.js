const program = require("commander");
const symbols = require("log-symbols");
const chalk = require("chalk");
const create = require("./create");
const init = require("./init");
const didYouMean = require("didyoumean");

const Webpack = require("webpack");
// const WebpackDevServer = require("webpack-dev-server");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const express = require("express");
const app = express();

const defaultConfig = require("./webpack.config");

const defaultDevConfig = Object.assign({}, defaultConfig, { mode: "development" });
const defaultProdConfig = Object.assign({}, defaultConfig, { mode: "production" });

// console.log(process.argv);

program.usage("<command> [options]");

program.command("dev").action(() => {
	const compiler = Webpack(defaultDevConfig);
	// const devServerOptions = defaultDevConfig.devServer;
	// const devServer = new WebpackDevServer(compiler, devServerOptions);
	// devServer.listen(8080, "localhost", () => {
	// 	console.log("[LLB-CLI] Starting server on http://localhost:8080");
	// });
	const PORT = 8080;
	const devInstance = webpackDevMiddleware(compiler, {
		publicPath: defaultDevConfig.output.publicPath,
		quiet: true,
		noInfo: true,
		stats: {
			colors: true,
			children: false,
		},
	});

	app.use(devInstance);

	app.use(
		webpackHotMiddleware(compiler, {
			reload: true,
			path: "/statics/__webpack_hmr",
		})
	);

	app.listen(PORT, () => console.log(chalk.green(`App listening to port: ${PORT}`)));
});

program.command("build").action(() => {
	Webpack(defaultProdConfig, (err, stats) => {
		if (err) {
			throw err;
		}
	});
});

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
	// .command("init <type> [name] [otherParams...]")
	.command("init")
	.alias("i")
	.description("Generates new code")
	// .option('-n, --name <items1> [items2]', 'name description', 'default value')
	// .option("-d, --day [d]")
	.action(function (type, name, otherParams, cmd) {
		// console.log("type", type);
		// console.log("name", name);
		// console.log("other", otherParams);
		// console.log("day", cmd.day);
		// 在这里执行具体的操作
		init();
	});

//子命令模式，
program.command("test", "test");

program.command("envInfo", "获取设备信息");

// 处理非法命令
program.arguments("<command>").action(cmd => {
	// 不退出输出帮助信息
	program.outputHelp();
	console.log();
	console.log(`  ` + chalk.red(`unknown command ${chalk.yellow(cmd)}.`));
	console.log();
	suggestCommands(cmd);
});

// easy支持的命令
function suggestCommands(cmd) {
	const avaliableCommands = program.commands.map(cmd => {
		return cmd._name;
	});
	// 简易智能匹配用户命令
	const suggestion = didYouMean(cmd, avaliableCommands);
	if (suggestion) {
		console.log(`  ` + `Did you mean ${chalk.yellow(suggestion)}?`);
	}
}

program.version(require("../package.json").version, "-v --version").parse(process.argv);
