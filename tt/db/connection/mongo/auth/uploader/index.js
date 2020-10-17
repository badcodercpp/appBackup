'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require('../../config');

var _dbError = require('../../dbError');

var _query = require('../../query');

var _connection = require('../../connection');

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var uploader = function uploader(payload) {
    var dbName = _config.MONGO.DB;
    var userSignupPromise = new Promise(function (res, rej) {
        (0, _connection.connect)().then(function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(client) {
                var db, collection, data;
                return regeneratorRuntime.wrap(function _callee$(_context) {
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
    return userSignupPromise;
};

exports.default = uploader;