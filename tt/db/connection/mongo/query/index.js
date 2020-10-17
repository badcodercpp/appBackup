'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.queryExecuter = undefined;

var _noop2 = require('lodash/noop');

var _noop3 = _interopRequireDefault(_noop2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _dbError = require('../dbError');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var closeUnusedConnection = function closeUnusedConnection(client, keepOpen) {
    if (keepOpen) {
        return client.close();
    }
    return null;
};

var queryExecuter = exports.queryExecuter = function queryExecuter() {
    var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var Query = arguments[1];
    var client = arguments[2];
    var payload = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    var keepOpen = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    var p = new Promise(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
            var data;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return (collection[Query] || _noop3.default).apply(collection, payload);

                        case 2:
                            data = _context.sent;

                            console.log("query daat", data);
                            closeUnusedConnection(client, keepOpen);
                            resolve(data);

                        case 6:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function (_x4, _x5) {
            return _ref.apply(this, arguments);
        };
    }());
    return p;
};