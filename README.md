# 脚手架作用
1. 抽离并隐藏与业务无关的工作，如node配置，webpack配置等，减少重复性劳动。
2. 通过与用户交互动态获取配置信息，对项目进行动态配置。
3. 根据不同模板初始化项目
4. 构建插件包，为项目提供构建(webpack)能力，使得不同模板可使用不同的构建工程。

# 工具
* commander：解析命令和参数，合并多选项，处理短参，等等
* inquirer：在命令行中与用户进行交互，并获取交互结果。
* chalk：修改控制台中字符串的样式、字体颜色、背景颜色等。
* download-git-repo：从github,lab获取其他仓库下载模版代码。
* ora: 实现命令行loading效果以及显示各种状态的图标等。
* fs-extra：对fs库的扩展，支持 promise。

# 自定义命令
再node项目中，通过设置package.json中的bin字段可以定义命令名和关联的执行文件。bin字段专门放置用户的自定义命令，指定可执行文件的位置，bin 里的命令是可执行命令，模块安装的时候如果是全局安装，那么 npm 会为 bin 中配置的文件创建一个全局软连接，在命令行工具里可以直接执行。
```
//package.json
"bin": {
    "llb": "./bin/cmd"
  }
```
在命令行中执行`llb`命令实际是执行了`node ./bin/cmd`

依赖commander.js,我们可以解析用户在命令行的输入和参数：
```
//command第一个参数为命令名称，alias为命令的别称， 其中<>包裹的为必选参数 []为选填参数 带有...的参数为剩余参数的集合
program
   .command("init <type> [name] [otherParams...]")
	.alias("i")
	.description("Generates new code")
	.option('-n, --name <items1> [items2]', 'name description', 'default value')
	.option("-d, --day [d]")
	.action(function (name, otherParams, cmd) {
		console.log("type", type);
		console.log("name", name);
		console.log("other", otherParams);
		console.log("day", cmd.day);
		//在这里执行具体的操作
      //init()
	});

//子命令模式，
program.command("test", "test");
````
在接受不同数量的参数时,command会返回不同的对象，只接受一个参数子命令名的话返回的是子命令本身，而如果加上第二个参数子命令介绍的话，返回值就变成了整个命令行的原型。

结合bin字段和commander.js，我们就可以根据用户在命令行中输入的不同命令进行对应的操作。

# 命令
## init
接收到用户的init命令后，脚手架主要做了5件事情，分别是init,prompting,writing,customizing和npmInstalling。而为了保证各个阶段的有序性以及独立性，脚手架提供了Task，Task能够像中间件那样，包装各个阶段的有序执行。
```
const Task = require("./Task");

const task = new Task();

const init = next => {
	let version = require("../package.json").version;
	console.log(`version: ${version}`);
	next();
};

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
```

 1. init：
 进行获取脚手架版本信息等相关操作

 2. prompting：
 利用inquirer与用户进行交互，获取项目配置信息
 ```
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
 ```

 3. writing：
 利用`child_process.spawn`将template下egg-react复制到当前的工作目录下作为项目的基础模板
 ```
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
	let copiedPath = path.join(__dirname, "../template/egg-react");
	let resultPath = path.join(process.cwd(), projectName);
	return await copyFolder(copiedPath, resultPath);
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
 ```

4. customizing：根据用户的配置，修改和新增对应模板文件
 * webpack config
    * 是否可配置

 * 组件库选择
    * 远程拉取组件库

 * 通用服务的选择（metalsmith）
    * Friday
    * fe-monitor
    * 配置中心
    * ...
    
 5. npmInstalling：
 进行依赖的安装

 ## dev
 

 ## build

