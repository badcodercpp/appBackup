'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.doLogin = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _config = require('../../config');

var _dbError = require('../../dbError');

var _connection = require('../../connection');

var _isExisting = require('../isExisting');

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _jwt = require('../jwt');

var _userAgent = require('../userAgent');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var doLogin = exports.doLogin = function doLogin(payload, req, res) {
    var dbName = _config.MONGO.DB;
    var userLoginPromise = new _promise2.default(function (res, rej) {
        (0, _connection.connect)().then(function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(client) {
                var db, collection, payloadWithEmail, isExisting, userData, isExistingUsers, payloadWithMobile, isExistingMobile, userPassword, password, payloadWithUserAgent, token;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                db = client.db(dbName);
                                collection = db.collection(_config.MONGO.COLLECTION.badCollection);
                                payloadWithEmail = { email: (0, _isEmpty3.default)((0, _get3.default)(payload, 'email')) ? '' : (0, _get3.default)(payload, 'email') };
                                _context.next = 5;
                                return (0, _isExisting.isExistingUser)(collection, payloadWithEmail, client);

                            case 5:
                                isExisting = _context.sent;
                                userData = void 0, isExistingUsers = void 0;

                                if (isExisting) {
                                    _context.next = 16;
                                    break;
                                }

                                payloadWithMobile = { mobile: (0, _isEmpty3.default)((0, _get3.default)(payload, 'mobile')) ? '' : (0, _get3.default)(payload, 'mobile') };
                                _context.next = 11;
                                return (0, _isExisting.isExistingUser)(collection, payloadWithMobile, client);

                            case 11:
                                isExistingMobile = _context.sent;

                                isExistingUsers = (0, _get3.default)(isExistingMobile, 'status');
                                userData = (0, _get3.default)(isExistingMobile, 'data');
                                _context.next = 18;
                                break;

                            case 16:
                                isExistingUsers = (0, _get3.default)(isExisting, 'status');
                                userData = (0, _get3.default)(isExisting, 'data');

                            case 18:
                                if (!isExistingUsers) {
                                    rej({ error: _dbError.DB_ERROR.GENERIC });
                                }
                                userPassword = (0, _get3.default)(payload, 'password');
                                password = (0, _get3.default)(userData, 'password');

                                if ((0, _isEqual3.default)(userPassword, password)) {
                                    payloadWithUserAgent = (0, _userAgent.withUserAgent)(req, res, payload);
                                    token = (0, _jwt.getJwtToken)(payloadWithUserAgent);

                                    if (!(0, _isEmpty3.default)(token)) {
                                        res(token);
                                    } else {
                                        rej({ error: _dbError.DB_ERROR.GENERIC });
                                    }
                                } else {
                                    rej({ error: _dbError.DB_ERROR.GENERIC });
                                }

                            case 22:
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
    return userLoginPromise;
};