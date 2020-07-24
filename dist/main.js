"use strict";

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _commander = require("commander");

var _commander2 = _interopRequireDefault(_commander);

var _logSymbols = require("log-symbols");

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _create = require("./create");

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// console.log(process.argv);

_commander2.default.usage('<command> [options]');

_commander2.default.command('create').description('创建一个项目').alias('c').action(function () {
  _create2.default.apply(undefined, (0, _toConsumableArray3.default)(process.argv.slice(3)));
});

//ommand第一个参数为命令名称，alias为命令的别称， 其中<>包裹的为必选参数 []为选填参数 带有...的参数为剩余参数的集合
_commander2.default.command('init <type> [name] [otherParams...]').alias('i').description('Generates new code').action(function (type, name, otherParams) {
  console.log('type', type);
  console.log('name', name);
  console.log('other', otherParams);
  // 在这里执行具体的操作
});

_commander2.default.version(require('../package.json').version, '-v --version').parse(process.argv);