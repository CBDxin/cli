const program = require("commander");
const symbols = require("log-symbols");
const chalk = require("chalk");
const create = require("./create");
const init = require("./init");
const didYouMean = require("didyoumean");

const fs = require("fs-extra");
const path = require("path");

const Webpack = require("webpack");
// const WebpackDevServer = require("webpack-dev-server");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const express = require("express");
const { join } = require("path");
const app = express();

console.log(process.argv);

program.usage("<command> [options]");
program.command("dev").action(() => {
	let defaultConfig;
	if (
		fs.existsSync(path.join(process.cwd(), "/webpack/webpack.dev.config.js")) &&
		require(path.join(process.cwd(), "/webpack/webpack.dev.config.js"))
	) {
		defaultConfig = {
			...require("./webpack.config"),
			...require(path.join(process.cwd(), "/webpack/webpack.dev.config.js")),
		};
	} else {
		defaultConfig = require("./webpack.config");
	}

	const compiler = Webpack(defaultConfig);
	// const devServerOptions = defaultDevConfig.devServer;
	// const devServer = new WebpackDevServer(compiler, devServerOptions);
	// devServer.listen(8080, "localhost", () => {
	// 	console.log("[LLB-CLI] Starting server on http://localhost:8080");
	// });
	const PORT = 8080;
	const devInstance = webpackDevMiddleware(compiler, {
		publicPath: defaultConfig.output.publicPath,
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
			path: "/public/__webpack_hmr",
		})
	);

	app.listen(PORT, () => console.log(chalk.green(`App listening to port: ${PORT}`)));
});

program.command("build").action(() => {
	process.env.NODE_ENV = "production";
	let defaultConfig;
	if (
		fs.existsSync(path.join(process.cwd(), "/webpack/webpack.prod.config.js")) &&
		require(path.join(process.cwd(), "/webpack/webpack.prod.config.js"))
	) {
		defaultConfig = {
			...require("./webpack.config"),
			...require(path.join(process.cwd(), "/webpack/webpack.prod.config.js")),
		};
	} else {
		defaultConfig = require("./webpack.config");
	}
	Webpack(defaultConfig, (err, stats) => {
		if (err) {
			throw err;
		} else {
			console.log(`success! ${stats.endTime - stats.startTime}`);
		}
	});
});

program.command("quickStart <fliePath>").action((fliePath) => {
	let defaultConfig = require("./webpack.config");

	defaultConfig.entry[1] = join(process.cwd(), fliePath);

	const compiler = Webpack(defaultConfig);

	const PORT = 8080;
	const devInstance = webpackDevMiddleware(compiler, {
		publicPath: defaultConfig.output.publicPath,
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
			path: "/public/__webpack_hmr",
		})
	);

	app.listen(PORT, () => console.log(chalk.green(`App listening to port: ${PORT}`)));
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
	.command("init <name>")
	.alias("i")
	.description("Generates new code")
	// .option('-n, --name <items1> [items2]', 'name description', 'default value')
	// .option("-d, --day [d]")
	.action(function (name, otherParams, cmd) {
		// console.log("type", type);
		// console.log("name", name);
		// console.log("other", otherParams);
		// console.log("day", cmd.day);
		// 在这里执行具体的操作
		init(name);
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
