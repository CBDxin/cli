"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _logSymbols = require("log-symbols");

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

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
							var loading = (0, _ora2.default)("开始下载...");
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