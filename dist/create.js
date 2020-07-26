"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _logSymbols = require("log-symbols");

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _ora = require("ora");

var _ora2 = _interopRequireDefault(_ora);

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(projectName) {
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if (projectName) {
							_context.next = 4;
							break;
						}

						console.log(_logSymbols2.default.error, _chalk2.default.red("创建项目的时候，请输入项目名"));
						_context.next = 11;
						break;

					case 4:
						_context.next = 6;
						return (0, _util.isExist)(projectName);

					case 6:
						if (!_context.sent) {
							_context.next = 10;
							break;
						}

						console.log(_logSymbols2.default.error, _chalk2.default.red("项目已存在！"));
						_context.next = 11;
						break;

					case 10:
						_inquirer2.default.prompt([{
							type: "input",
							name: "description",
							message: "请输入项目描述:"
						}, {
							type: "input",
							name: "author",
							message: "请输入作者名称:"
						}]).then(function (answers) {
							var root = _path2.default.resolve(projectName);

							console.log("\u5728" + _chalk2.default.green(root) + "\u4E0B\u521B\u5EFA\u5E94\u7528.");

							var loading = (0, _ora2.default)("开始下载...");
							loading.start('"开始下载..."');
							var api = "direct:https://gitee.com/fujinxiang/node-ejs.git";
							// let api = "direct:git@github.com:CBDxin/VueSocial.git";

							(0, _util.downloadTPL)(projectName, api).then(function () {
								loading.succeed("模板下载成功！");

								var PJSONName = projectName + "/package.json";
								(0, _util.updateJsonFile)(PJSONName, (0, _extends3.default)({ name: projectName }, answers)).then(function () {
									console.log(_logSymbols2.default.success, _chalk2.default.green("配置文件以更新。"));
								});
							}).catch(function (err) {
								loading.fail("文件下载失败:" + err.message.trim());
							});
						});

					case 11:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function create(_x) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = create;