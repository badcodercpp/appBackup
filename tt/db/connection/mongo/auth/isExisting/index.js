'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isExistingUser = undefined;

var _filter2 = require('lodash/filter');

var _filter3 = _interopRequireDefault(_filter2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _query = require('../../query');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var isExistingUser = exports.isExistingUser = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(collection, searchQuery, client) {
        var data, status;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _query.queryExecuter)(collection, 'findOne', client, [searchQuery]);

                    case 2:
                        data = _context.sent;

                        console.log("isExisting data", data);
                        status = (0, _filter3.default)([data], function (elem) {
                            return !(0, _isEmpty3.default)(elem);
                        }).length > 0;
                        return _context.abrupt('return', {
                            status: status,
                            data: data
                        });

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function isExistingUser(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();