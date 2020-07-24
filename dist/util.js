"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isExist = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

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