'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _config = require('../../config');

var _dbError = require('../../dbError');

var _query = require('../../query');

var _connection = require('../../connection');

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var saveOtp = function saveOtp(payload) {
    var dbName = _config.MONGO.DB;
    var otpPromise = new _promise2.default(function (res, rej) {
        (0, _connection.connect)().then(function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(client) {
                var db, collection, data;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                db = client.db(dbName);
                                collection = db.collection(_config.MONGO.COLLECTION.badCollection);
                                _context.next = 4;
                                return (0, _query.queryExecuter)(collection, 'insertOne', client, [payload], true);

                            case 4:
                                data = _context.sent;

                                if (!(0, _isEmpty3.default)(data)) {
                                    res(payload);
                                } else {
                                    rej({ error: _dbError.DB_ERROR.GENERIC });
                                }

                            case 6:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, undefined);
            }));

            return function (_x) {
                return _ref.apply(this, arguments);
            };
        }()).catch(function (err) {
            rej({ error: err });
        });
    });
    return otpPromise;
};

exports.default = saveOtp;