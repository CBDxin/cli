"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.updateJsonFile = exports.downloadTPL = exports.isExist = undefined;

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _downloadGitRepo = require("download-git-repo");

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isExist = exports.isExist = function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(name) {
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if (!_fs2.default.existsSync(name)) {
							_context.next = 4;
							break;
						}

						return _context.abrupt("return", true);

					case 4:
						return _context.abrupt("return", false);

					case 5:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function isExist(_x) {
		return _ref.apply(this, arguments);
	};
}();

var downloadTPL = exports.downloadTPL = function downloadTPL(ProjectName, api) {
	return new _promise2.default(function (resolve, reject) {
		(0, _downloadGitRepo2.default)(api, ProjectName, { clone: true }, function (err) {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
};

var updateJsonFile = exports.updateJsonFile = function updateJsonFile(fileName, option) {
	return new _promise2.default(function (resolve) {
		if (_fs2.default.existsSync(fileName)) {
			var data = _fs2.default.readFileSync(fileName).toString();
			var json = JSON.parse(data);
			(0, _keys2.default)(option).forEach(function (key) {
				json[key] = option[key];
			});
			_fs2.default.writeFileSync(fileName, (0, _stringify2.default)(json, null, "\t"), "utf-8");
			resolve();
		}
	});
};