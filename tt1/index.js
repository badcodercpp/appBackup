'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _login = require('./handler/login');

var _login2 = _interopRequireDefault(_login);

var _signup = require('./handler/signup');

var _signup2 = _interopRequireDefault(_signup);

var _query = require('./handler/admin/query');

var _query2 = _interopRequireDefault(_query);

var _mapData = require('./handler/mapData');

var _mapData2 = _interopRequireDefault(_mapData);

var _profile = require('./handler/profile');

var _profile2 = _interopRequireDefault(_profile);

var _user = require('./handler/details/user');

var _user2 = _interopRequireDefault(_user);

var _token = require('./middleware/token');

var _otp = require('./handler/otp');

var _otp2 = _interopRequireDefault(_otp);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _map2 = require('lodash/map');

var _map3 = _interopRequireDefault(_map2);

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _find2 = require('lodash/find');

var _find3 = _interopRequireDefault(_find2);

var _first2 = require('lodash/first');

var _first3 = _interopRequireDefault(_first2);

var _last2 = require('lodash/last');

var _last3 = _interopRequireDefault(_last2);

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _values2 = require('lodash/values');

var _values3 = _interopRequireDefault(_values2);

var _keys2 = require('lodash/keys');

var _keys3 = _interopRequireDefault(_keys2);

var _mockUser = require('./mockUser');

var _mockUser2 = _interopRequireDefault(_mockUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import {EMOJIS_DATA} from './emojis';
var EMOJIS_DATA = {};
var GridFSStorage = require('multer-gridfs-storage');
var path = require('path');
var bodyParser = require('body-parser');
var useragent = require('express-useragent');
var fs = require('fs');
var child_process = require('child_process');
var GridFSBucket = require("mongodb").GridFSBucket;
var multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');
var jsonParser = bodyParser.json();
var PORT = process.env.PORT || 5001;
var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://mayank0904:badcoder1993@cluster0.g4rhc.mongodb.net/bad?retryWrites=true&w=majority";
var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

var FCM = require('fcm-node');

// client.connect(err => {
//   const collection = client.db("bad").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
//const db = client.db('database')

var spawn = child_process.spawn;
var exec = child_process.exec;

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    console.log("Hello people in storage");
    return cb(null, path.join(__dirname, 'public'));
  },
  filename: function filename(req, file, cb) {
    console.log(file);
    var ext = file.originalname.split('.')[1];
    // Date.now().toString() + "." + ext
    return cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage });
var app = (0, _express2.default)();
app.use(_express2.default.static(path.join(__dirname, 'public')));
var http = require('http').createServer(app);
var io = require('socket.io')(http, { pingTimeout: 30000 });
var EMOJIS = (0, _values3.default)(EMOJIS_DATA);
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Expose-Headers", "*")
//   next();
// });

app.use(useragent.express());

app.get('/test', function (req, res) {
  res.send('hello world');
});

var sendPush = function sendPush(deviceId) {
  var serverKey = 'AAAAOtK9bxk:APA91bGyO2u7yd5KuHuJrk7YbcX5_hH-AAtcoLuhrNSDMFOSJHecuXOPN_Dr5rdEEBJjAFKTVNL4VCR7FbIow6TFmn6lul9HbrScT2wagZfaXzBM-llXwCrcgX9WxgICszDO1DZJ0QYs'; //put your server key here
  var fcm = new FCM(serverKey);

  var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    to: deviceId,

    notification: {
      title: 'This is dummy push ',
      body: 'Body of dummy push notification'
    },

    data: { //you can send only notification or only data(or include both)
      my_key: 'my value',
      my_another_key: 'my another value'
    }
  };

  fcm.send(message, function (err, response) {
    if (err) {
      console.log("Something has gone wrong!", err);
    } else {
      console.log("Successfully sent with response: ", response);
    }
  });
};

app.post('/saveFCMDeviceId', jsonParser, function (req, res) {
  var body = req.body || {};
  console.log("bbody", body);
  var FCMDeviceID = body.FCMDeviceID,
      userName = body.userName;

  var c1 = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  c1.connect((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var _db, r;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _db = c1.db("meewee");
            _context.next = 4;
            return _db.collection('FCMDeviceID').insertOne({ FCMDeviceID: FCMDeviceID, userName: userName });

          case 4:
            r = _context.sent;

            sendPush(FCMDeviceID);
            res.send(r);
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);
            res.send(_context.t0);

          case 13:
            _context.prev = 13;

            c1.close();
            return _context.finish(13);

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 9, 13, 16]]);
  })));
});

app.post('/mwRegister', jsonParser, function (req, res) {
  var body = req.body || {};
  var _body$register = body.register,
      register = _body$register === undefined ? {} : _body$register;
  var otp = register.otp,
      mobile = register.mobile;

  var c1 = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  c1.connect((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var r, otpInDb, c;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return db.collection('mwotp').findOne({ mobile: mobile });

          case 3:
            r = _context3.sent;
            otpInDb = (0, _get3.default)(r, 'otp');

            if ((0, _isEqual3.default)(otp, otpInDb)) {
              c = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

              c.connect((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                var db, data, _r;

                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        db = client.db('bad');
                        _context2.prev = 1;
                        data = (0, _extends3.default)({}, _mockUser2.default, register);
                        _context2.next = 5;
                        return db.collection('mwuser').insertOne(data);

                      case 5:
                        _r = _context2.sent;

                        res.send({ mobile: mobile });
                        _context2.next = 13;
                        break;

                      case 9:
                        _context2.prev = 9;
                        _context2.t0 = _context2['catch'](1);

                        console.log(_context2.t0);
                        res.send(_context2.t0);

                      case 13:
                        _context2.prev = 13;

                        c.close();
                        return _context2.finish(13);

                      case 16:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, this, [[1, 9, 13, 16]]);
              })));
            }
            res.send(r);
            _context3.next = 13;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3['catch'](0);

            console.log(_context3.t0);
            res.send(_context3.t0);

          case 13:
            _context3.prev = 13;

            c1.close();
            return _context3.finish(13);

          case 16:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 9, 13, 16]]);
  })));
});

app.post('/login', jsonParser, function (req, res) {
  return (0, _login2.default)(req, res);
});

app.post('/signup', jsonParser, function (req, res) {
  return (0, _signup2.default)(req, res);
});

app.get('/mapdata', jsonParser, function (req, res) {
  return (0, _mapData2.default)(req, res);
});

app.post('/doAdminStuffs', jsonParser, function (req, res) {
  return (0, _query2.default)(req, res);
});

app.post('/profile/:id', jsonParser, function (req, res) {
  return (0, _profile2.default)(req, res);
});

app.post('/userDetails', jsonParser, _token.checkToken, function (req, res) {
  return (0, _user2.default)(req, res);
});

app.post('/uploadMedia', jsonParser, _token.checkToken, function (req, res) {
  return doUploadMedia(req, res);
});

app.get('/emojisAndStickers', function (req, res) {
  var data = {
    emojis: (0, _keys3.default)(EMOJIS_DATA)
  };
  res.send(data);
});

app.post('/makeMWUser', jsonParser, function (req, res) {
  var body = req.body || {};
  var data = (0, _extends3.default)({}, _mockUser2.default, body);
  client.connect((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
    var db, r;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            db = client.db('bad');
            _context4.prev = 1;
            _context4.next = 4;
            return db.collection('user').insertOne(data);

          case 4:
            r = _context4.sent;

            res.send(r);
            _context4.next = 12;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4['catch'](1);

            console.log(_context4.t0);
            res.send(_context4.t0);

          case 12:
            ;
            client.close();

          case 14:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this, [[1, 8]]);
  })));
});

app.get('/sendOtp/:mobile', function (req, res) {
  var _ref5 = req.params || {},
      mobile = _ref5.mobile;

  var otp = Math.floor(1000 + Math.random() * 9000);
  (0, _otp2.default)(undefined, otp).then(function () {
    client.connect((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
      var db, data, r;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              db = client.db('meewee');
              _context5.prev = 1;
              data = { mobile: mobile, otp: otp };

              console.log(data);
              _context5.next = 6;
              return db.collection('mwotp').insertOne(data);

            case 6:
              r = _context5.sent;

              console.log(r);
              res.send({ mobile: mobile });
              _context5.next = 15;
              break;

            case 11:
              _context5.prev = 11;
              _context5.t0 = _context5['catch'](1);

              console.log(_context5.t0);
              res.send(_context5.t0);

            case 15:
              _context5.prev = 15;

              client.close();
              return _context5.finish(15);

            case 18:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this, [[1, 11, 15, 18]]);
    })));
  }).catch(function (error) {
    console.log(error);
    res.send({ error: error });
  });
});

app.post('/uploadVideo', upload.single('video'), function (req, res, next) {
  client.connect(function () {
    var db = client.db('bad');
    console.log(db);
    var bucket = new GridFSBucket(db, { bucketName: 'video' });
    var readStream = fs.createReadStream(req.file.path);
    var uploadStream = bucket.openUploadStream(req.file.filename);
    console.log(uploadStream.id, "id");
    uploadStream.once('finish', function () {
      console.log("done");
      fs.unlinkSync(req.file.path);
      client.close();
      var data = (0, _extends3.default)({}, req.file, {
        id: uploadStream.id,
        mongo: {
          bucket: 'video',
          id: uploadStream.id,
          file: 'video.files',
          chunk: 'video.chunks'
        }
      });
      res.send(data);
    });
    readStream.pipe(uploadStream);
  });
});

app.get('/getVideo/:fileName', function (req, res) {
  //const id = '1c70b22d-1ddb-4b21-b56b-2bead57ab06c.mp4';
  var _ref7 = req.params || {},
      fileName = _ref7.fileName;

  client.connect(function () {
    var db = client.db('bad');
    console.log(db);
    var bucket = new GridFSBucket(db, { bucketName: 'video' });
    var downloadStream = bucket.openDownloadStreamByName(fileName);
    downloadStream.pipe(res);
    // client.close()
  });
});

app.get('/getAudio/:fileName', function (req, res) {
  var _ref8 = req.params || {},
      fileName = _ref8.fileName;

  client.connect(function () {
    var db = client.db('bad');
    console.log(db);
    var bucket = new GridFSBucket(db, { bucketName: 'audio' });
    var downloadStream = bucket.openDownloadStreamByName(fileName);
    downloadStream.pipe(res);
  });
});

app.post('/uploadAudio', upload.single('audio'), function (req, res, next) {
  client.connect(function () {
    var db = client.db('bad');
    console.log(db);
    var bucket = new GridFSBucket(db, { bucketName: 'audio' });
    var readStream = fs.createReadStream(req.file.path);
    var uploadStream = bucket.openUploadStream(req.file.filename);
    console.log(uploadStream.id, "id");
    uploadStream.once('finish', function () {
      console.log("done");
      fs.unlinkSync(req.file.path);
      client.close();
      var data = (0, _extends3.default)({}, req.file, {
        id: uploadStream.id,
        mongo: {
          bucket: 'audio',
          id: uploadStream.id,
          file: 'audio.files',
          chunk: 'audio.chunks',
          streamName: (0, _get3.default)(req, 'file.filename')
        }
      });
      res.send(data);
    });
    readStream.pipe(uploadStream);
  });
});

app.get('/getImage/:fileName', function (req, res) {
  var _ref9 = req.params || {},
      fileName = _ref9.fileName;

  client.connect(function () {
    var db = client.db('bad');
    console.log(db);
    var bucket = new GridFSBucket(db, { bucketName: 'image' });
    var downloadStream = bucket.openDownloadStreamByName(fileName);
    downloadStream.pipe(res);
  });
});

app.post('/uploadImage', upload.single('image'), function (req, res, next) {
  client.connect(function () {
    var db = client.db('bad');
    console.log(db);
    var bucket = new GridFSBucket(db, { bucketName: 'image' });
    var readStream = fs.createReadStream(req.file.path);
    var uploadStream = bucket.openUploadStream(req.file.filename);
    console.log(uploadStream.id, "id");
    uploadStream.once('finish', function () {
      console.log("done");
      fs.unlinkSync(req.file.path);
      client.close();
      var data = (0, _extends3.default)({}, req.file, {
        id: uploadStream.id,
        mongo: {
          bucket: 'audio',
          id: uploadStream.id,
          file: 'image.files',
          chunk: 'image.chunks',
          streamName: (0, _get3.default)(req, 'file.filename')
        }
      });
      res.send(data);
    });
    readStream.pipe(uploadStream);
  });
});

app.post('/createMWMixin', jsonParser, function (req, res) {
  var body = req.body || {};
  var data = _mockUser2.default;
  client.connect((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
    var db, r;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            db = client.db('bad');
            _context6.prev = 1;
            _context6.next = 4;
            return db.collection('mwmixin').insertOne((0, _extends3.default)({}, data, { createdDate: Date.now() }));

          case 4:
            r = _context6.sent;

            res.send(r);
            _context6.next = 12;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6['catch'](1);

            console.log(_context6.t0);
            res.send(_context6.t0);

          case 12:
            ;
            client.close();

          case 14:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this, [[1, 8]]);
  })));
});

app.post('/addMWUser', jsonParser, function (req, res) {
  var body = req.body || {};
  var data = (0, _extends3.default)({}, _mockUser.user, body);
  client.connect((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
    var db, r;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            db = client.db('bad');
            _context7.prev = 1;
            _context7.next = 4;
            return db.collection('mwuser').insertOne(data);

          case 4:
            r = _context7.sent;

            res.send(r);
            _context7.next = 12;
            break;

          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7['catch'](1);

            console.log(_context7.t0);
            res.send(_context7.t0);

          case 12:
            ;
            client.close();

          case 14:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this, [[1, 8]]);
  })));
});

app.post('/getUser', jsonParser, function (req, res) {
  var body = req.body || {};
  var mobile = body.mobile;

  client.connect((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
    var db, r;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            db = client.db('bad');
            _context8.prev = 1;
            _context8.next = 4;
            return db.collection('mwuser').findOne({ mobile: mobile });

          case 4:
            r = _context8.sent;

            res.send(r);
            _context8.next = 12;
            break;

          case 8:
            _context8.prev = 8;
            _context8.t0 = _context8['catch'](1);

            console.log(_context8.t0);
            res.send(_context8.t0);

          case 12:
            ;
            client.close();

          case 14:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this, [[1, 8]]);
  })));
});

app.post('/getMWMixin', jsonParser, function (req, res) {
  var body = req.body || {};
  var _body$me = body.me,
      me = _body$me === undefined ? {} : _body$me,
      _body$followers = body.followers,
      followers = _body$followers === undefined ? [] : _body$followers,
      _body$followings = body.followings,
      followings = _body$followings === undefined ? [] : _body$followings;
  var _me$mobile = me.mobile,
      mobile = _me$mobile === undefined ? 'badcoder' : _me$mobile;

  var knownOnes = (0, _map3.default)([].concat((0, _toConsumableArray3.default)(followers), (0, _toConsumableArray3.default)(followings)), function (user) {
    var phone = (0, _get3.default)(user, 'mobile');
    return phone;
  });
  var targetUsers = [mobile].concat((0, _toConsumableArray3.default)(knownOnes));
  client.connect((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
    var db, cursor, users;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            db = client.db('bad');
            _context9.prev = 1;
            _context9.next = 4;
            return db.collection('mwmixin').find({ "user.username": { $in: targetUsers } }).sort({ createdDate: 1 }).toArray();

          case 4:
            cursor = _context9.sent;
            users = cursor.map(function (u) {
              return u;
            });

            console.log("users", users, targetUsers);
            res.send(users);
            _context9.next = 14;
            break;

          case 10:
            _context9.prev = 10;
            _context9.t0 = _context9['catch'](1);

            console.log(_context9.t0);
            res.send({});

          case 14:
            ;
            client.close();

          case 16:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, this, [[1, 10]]);
  })));
});

app.post('/searchUser', jsonParser, function (req, res) {
  var body = req.body || {};
  var _body$text = body.text,
      text = _body$text === undefined ? "Ajay" : _body$text;

  client.connect((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
    var db, t, cursor, users;
    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            db = client.db('bad');
            _context10.prev = 1;
            t = '\\' + text + '\\';
            _context10.next = 5;
            return db.collection('mwuser').find({ "$text": { "$search": '/' + text + '/', "$caseSensitive": false,
                "$diacriticSensitive": false } }).toArray();

          case 5:
            cursor = _context10.sent;
            users = cursor.map(function (u) {
              return u;
            });

            console.log("users", users);
            res.send(users);
            _context10.next = 15;
            break;

          case 11:
            _context10.prev = 11;
            _context10.t0 = _context10['catch'](1);

            console.log(_context10.t0);
            res.send({});

          case 15:
            ;
            client.close();

          case 17:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, this, [[1, 11]]);
  })));
});

app.post('/getUsersDetail', jsonParser, function (req, res) {
  var body = req.body || {};
  var _body$users = body.users,
      users = _body$users === undefined ? ["9836648105", "7416634081"] : _body$users;

  client.connect((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
    var db, r;
    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            db = client.db('bad');
            _context11.prev = 1;
            _context11.next = 4;
            return db.collection('mwuser').find({ mobile: { $in: users } }).toArray();

          case 4:
            r = _context11.sent;

            res.send(r);
            _context11.next = 12;
            break;

          case 8:
            _context11.prev = 8;
            _context11.t0 = _context11['catch'](1);

            console.log(_context11.t0);
            res.send(_context11.t0);

          case 12:
            ;
            client.close();

          case 14:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, this, [[1, 8]]);
  })));
});

function spawnFfmpeg(exitCallback, args) {
  // var args = ['-i', 'pipe:0', '-f', 'mp3', '-ac', '2', '-ab', '128k', '-acodec', 'libmp3lame', 
  // 										'pipe:1']

  var ffmpeg = spawn('ffmpeg', args);

  console.log('Spawning ffmpeg ' + args.join(' '));

  ffmpeg.on('exit', exitCallback);

  ffmpeg.stderr.on('data', function (data) {
    console.log('grep stderr: ' + data);
  });

  return ffmpeg;
}

/**
 * overTv mixin
 * 
 * [0:v]scale=720:720,boxblur=luma_radius=20:luma_power=1:chroma_radius=20:chroma_power=1[bg];[0:v]scale=720:720:force_original_aspect_ratio=decrease[fg];[bg][fg]overlay=300:400[outv]
 * ffmpeg -i test.mp4 -vf "setpts=2*PTS" slowspeed_1.mp4
 * ffmpeg -i test.mp4 -vf "setpts=0.1*PTS" highspeed_1.mp4
 * // next for blur
 * [0:v]scale=720:720,boxblur=luma_radius=20:luma_power=1:chroma_radius=20:chroma_power=1[bg];[0:v]scale=720:720:force_original_aspect_ratio=decrease[fg];[bg][fg]overlay=800:800[outv]
    // single moving watermark
    ffmpeg -i test.mp4 -loop 1 -i heart.png -filter_complex "overlay=x=0:y='if(gte(t,0), ((H+h)\/5)\*mod(t\,5)-h, NAN)':shortest=1" output.mp4

    ffmpeg -i test.mp4 \
-vf \
"drawtext=fontsize=80:fontcolor=yellow@0.5: \
 text='studentname':x=20:y=30:enable='between(mod(t\,30*3),0,30)', \
 drawtext=fontsize=80:fontcolor=yellow@0.5: \
 text='studentname':x=100:y=60:enable='between(mod(t\,30*3),31,60)', \
 drawtext=fontsize=80:fontcolor=yellow@0.5: \
 text='studentname':x=80:y=50:enable='between(mod(t\,30*3),61,90)'" \
-c:v libx264 -crf 23 -c:a copy output_text.mp4


// fragmented

ffmpeg -re -i test.mp4 -g 52 \
-strict experimental -acodec aac -ab 64k -vcodec libx264 -vb 448k \
-f mp4 -movflags frag_keyframe+empty_moov \
output___1.mp4
 */

var getType = function getType() {};

app.post('/onFlyMixin', jsonParser, function (req, res) {
  // res.writeHead(200, {'Content-Type': 'audio/mpeg'});
  var body = req.body || {};
  var type = body.type;

  var args = ['-i', 'test.mp4', '-filter_complex', '[0:v]scale=720:720,boxblur=luma_radius=20:luma_power=1:chroma_radius=20:chroma_power=1[bg];[0:v]scale=720:720:force_original_aspect_ratio=decrease[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2[outv]', '-map', '[outv]', '-map', '0:a?', '__test__' + Date.now() + '.mp4'];
  var ffmpeg = spawnFfmpeg(function (code) {
    // exit
    console.log('child process exited with code ' + code);
    res.end();
  }, args);

  ffmpeg.stdout.pipe(res);

  // getYoutubeVideo(yt_url, 
  //   function(res) {
  //     res.pipe(ffmpeg.stdin)
  // });
});

app.post('/mixVideos', upload.any(), function (req, res) {
  var files = req.files || [];
  var body = req.body || {};
  var userName = body.userName,
      isDuke = body.isDuke;

  if (isDuke) {
    var video1 = (0, _find3.default)(files, function (_ref16) {
      var fieldname = _ref16.fieldname;
      return (0, _isEqual3.default)(fieldname, 'video1');
    });
    var video2 = (0, _find3.default)(files, function (_ref17) {
      var fieldname = _ref17.fieldname;
      return (0, _isEqual3.default)(fieldname, 'video2');
    });
    var audio1 = (0, _find3.default)(files, function (_ref18) {
      var fieldname = _ref18.fieldname;
      return (0, _isEqual3.default)(fieldname, 'audio1');
    });
    var audio2 = (0, _find3.default)(files, function (_ref19) {
      var fieldname = _ref19.fieldname;
      return (0, _isEqual3.default)(fieldname, 'audio2');
    });
    var v_n_1 = (0, _first3.default)(((0, _get3.default)(video1, 'originalname') || '').split('.'));
    var v_n_2 = (0, _first3.default)(((0, _get3.default)(video2, 'originalname') || '').split('.'));
    var a_n_1 = (0, _first3.default)(((0, _get3.default)(audio1, 'originalname') || '').split('.'));
    var a_n_2 = (0, _first3.default)(((0, _get3.default)(audio2, 'originalname') || '').split('.'));

    var v_n_1_t = (0, _last3.default)(((0, _get3.default)(video1, 'originalname') || '').split('.'));
    var v_n_2_t = (0, _last3.default)(((0, _get3.default)(video2, 'originalname') || '').split('.'));
    var a_n_1_t = (0, _last3.default)(((0, _get3.default)(audio1, 'originalname') || '').split('.'));
    var a_n_2_t = (0, _last3.default)(((0, _get3.default)(audio2, 'originalname') || '').split('.'));

    var v_n_1_p = __dirname + '/public/' + v_n_1 + '.' + v_n_1_t;
    var v_n_2_p = __dirname + '/public/' + v_n_2 + '.' + v_n_2_t;
    var a_n_1_p = __dirname + '/public/' + a_n_1 + '.' + a_n_1_t;
    var a_n_2_p = __dirname + '/public/' + a_n_2 + '.' + a_n_2_t;
    ffmpeg().input(v_n_1_p).input(a_n_1_p).setDuration(30).outputOption('-map 0:0').outputOption('-map 1:0').audioCodec('aac').videoCodec('mpeg4').output(v_n_1 + '__' + a_n_1 + '.mp4').on('end', function () {
      ffmpeg().input(v_n_2_p).input(a_n_2_p).setDuration(30).outputOption('-map 0:0').outputOption('-map 1:0').audioCodec('aac').videoCodec('mpeg4').output(v_n_2 + '__' + a_n_2 + '.mp4').on('end', function () {
        ffmpeg().input(v_n_1 + '__' + a_n_1 + '.mp4').input(v_n_2 + '__' + a_n_2 + '.mp4').input(v_n_2 + '__' + a_n_2 + '.mp4').setDuration(60).complexFilter(['[0]pad=2*iw:ih[l]', '[1]setpts=PTS-STARTPTS+30/TB[1v]', '[l][1v]overlay=x=W/2[a]', '[2]setpts=PTS-STARTPTS+250/TB[2v]', '[a][2v]overlay=x=W/2[v]', '[1]adelay=30000|30000[1a]', '[0][1a]amix=inputs=2[a]']).outputOptions('-map [v]').outputOptions('-map [a]').outputOptions('-ac 2').outputOptions('-preset veryfast').output(v_n_1 + '__' + a_n_1 + '__' + v_n_2 + '__' + a_n_2 + '__final_duke.mp4').on('end', function () {
          console.log('Finished processing');
          ffmpeg(v_n_1 + '__' + a_n_1 + '__' + v_n_2 + '__' + a_n_2 + '__final_duke.mp4').output(v_n_1 + '__' + a_n_1 + '__' + v_n_2 + '__' + a_n_2 + '__final_duke__reactions.mp4').on('end', function () {
            // console.log("done all changes")
            client.connect(function () {
              var db = client.db('bad');
              console.log(db);
              var bucket = new GridFSBucket(db, { bucketName: 'video' });
              var readStream = fs.createReadStream(v_n_1 + '__' + a_n_1 + '__' + v_n_2 + '__' + a_n_2 + '__final_duke__reactions.mp4');
              var uploadStream = bucket.openUploadStream(v_n_1 + '__' + a_n_1 + '__' + v_n_2 + '__' + a_n_2 + '__final_duke__reactions.mp4');
              console.log(uploadStream.id, "id");
              uploadStream.once('finish', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12() {
                var data;
                return _regenerator2.default.wrap(function _callee12$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        console.log("done");
                        fs.unlinkSync(v_n_1 + '__' + a_n_1 + '__' + v_n_2 + '__' + a_n_2 + '__final_duke__reactions.mp4');
                        _context12.prev = 2;
                        _context12.next = 5;
                        return db.collection('mwmxnames').insertOne({ userName: userName, filename: v_n_1 + '__' + a_n_1 + '__' + v_n_2 + '__' + a_n_2 + '__final_duke__reactions.mp4' });

                      case 5:
                        _context12.next = 11;
                        break;

                      case 7:
                        _context12.prev = 7;
                        _context12.t0 = _context12['catch'](2);

                        console.log(_context12.t0);
                        res.send(_context12.t0);

                      case 11:
                        ;
                        client.close();
                        data = (0, _extends3.default)({}, req.file, {
                          id: uploadStream.id,
                          data: {
                            bucket: 'audio',
                            id: uploadStream.id,
                            file: 'video.files',
                            chunk: 'video.chunks',
                            streamName: v_n_1 + '__' + a_n_1 + '__' + v_n_2 + '__' + a_n_2 + '__final_duke__reactions.mp4'
                          }
                        });

                        res.send(data);

                      case 15:
                      case 'end':
                        return _context12.stop();
                    }
                  }
                }, _callee12, this, [[2, 7]]);
              })));
              readStream.pipe(uploadStream);
            });
          }).run();
        }).run();
      }).run();
    }).run();
  } else {
    var video1_1 = (0, _find3.default)(files, function (_ref21) {
      var fieldname = _ref21.fieldname;
      return (0, _isEqual3.default)(fieldname, 'video1');
    });
    var audio1_1 = (0, _find3.default)(files, function (_ref22) {
      var fieldname = _ref22.fieldname;
      return (0, _isEqual3.default)(fieldname, 'audio1');
    });
    var v_n_1_1 = (0, _first3.default)(((0, _get3.default)(video1_1, 'originalname') || '').split('.'));
    var a_n_1_1 = (0, _first3.default)(((0, _get3.default)(audio1_1, 'originalname') || '').split('.'));

    var v_n_1_t_1 = (0, _last3.default)(((0, _get3.default)(video1_1, 'originalname') || '').split('.'));
    var a_n_1_t_1 = (0, _last3.default)(((0, _get3.default)(audio1_1, 'originalname') || '').split('.'));

    var v_n_1_p_1 = __dirname + '/public/' + v_n_1_1 + '.' + v_n_1_t_1;
    var a_n_1_p_1 = __dirname + '/public/' + a_n_1_1 + '.' + a_n_1_t_1;
    ffmpeg().input(v_n_1_p_1).input(a_n_1_p_1).setStartTime('00:00:00').setDuration(30).outputOption('-map 0:0').outputOption('-map 1:0').audioCodec('aac').videoCodec('mpeg4').output(v_n_1_1 + '__' + a_n_1_1 + '__steady__.mp4').on('end', function () {
      console.log('Finished processing');
      ffmpeg(v_n_1_1 + '__' + a_n_1_1 + '__steady__.mp4').output(v_n_1_1 + '__' + a_n_1_1 + '__steady__final__.mp4').on('end', function () {
        console.log("done both changes");
        client.connect(function () {
          var db = client.db('bad');
          console.log(db);
          var bucket = new GridFSBucket(db, { bucketName: 'video' });
          var readStream = fs.createReadStream(v_n_1_1 + '__' + a_n_1_1 + '__steady__final__.mp4');
          var uploadStream = bucket.openUploadStream(v_n_1_1 + '__' + a_n_1_1 + '__steady__final__.mp4');
          console.log(uploadStream.id, "id");
          uploadStream.once('finish', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13() {
            var data;
            return _regenerator2.default.wrap(function _callee13$(_context13) {
              while (1) {
                switch (_context13.prev = _context13.next) {
                  case 0:
                    console.log("done");
                    fs.unlinkSync(v_n_1_1 + '__' + a_n_1_1 + '__steady__final__.mp4');
                    _context13.prev = 2;
                    _context13.next = 5;
                    return db.collection('mwmxnames').insertOne({ userName: userName, filename: v_n_1_1 + '__' + a_n_1_1 + '__steady__final__.mp4' });

                  case 5:
                    _context13.next = 11;
                    break;

                  case 7:
                    _context13.prev = 7;
                    _context13.t0 = _context13['catch'](2);

                    console.log(_context13.t0);
                    res.send(_context13.t0);

                  case 11:
                    ;
                    client.close();
                    data = (0, _extends3.default)({}, req.file, {
                      id: uploadStream.id,
                      data: {
                        bucket: 'audio',
                        id: uploadStream.id,
                        file: 'video.files',
                        chunk: 'video.chunks',
                        streamName: v_n_1_1 + '__' + a_n_1_1 + '__steady__final__.mp4'
                      }
                    });

                    res.send(data);

                  case 15:
                  case 'end':
                    return _context13.stop();
                }
              }
            }, _callee13, this, [[2, 7]]);
          })));
          readStream.pipe(uploadStream);
        });
      }).run();
    }).run();
  }
  console.log(files, body);
});

app.post('/backupMessage', jsonParser, function (req, res) {});

app.get('/testRTC', function (req, res) {
  res.sendfile(__dirname + '/public/testRTC.html');
});

var ar = [];
var roomList = {};
var socketSess = {};
function socketIdsInRoom(name) {
  var socketIds = io.nsps['/'].adapter.rooms[name];
  if (socketIds) {
    var collection = [];
    for (var key in socketIds) {
      collection.push(key);
    }
    return collection;
  } else {
    return [];
  }
}

io.on('connection', function (socket) {
  console.log("connected");
  socket.on('join_room', function (data) {
    var d = JSON.parse(data);
    room[d.me] = socket.id;
  });
  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });
  socket.on('start_chat', function (message) {
    var ob = {
      to: message.to,
      sdp: message.sdp
    };
    var too = room[message.to];
    io.to(too).emit('chatting', ob);
  });
  socket.on('ice_candidate', function (message) {
    var ob = {
      to: message.to,
      candidate: message.candidate
    };
    var too = room[message.to];
    io.to(too).emit('isIceCandidate', ob);
  });
  socket.on('disconnect', function () {
    if (socket.room) {
      var room = socket.room;
      io.to(room).emit('leave', socket.id);
      socket.leave(room);
    }
  });
  socket.on('join', function (name, callback) {
    socket.join(name);
    socket.room = name;
    ar.push({ name: name, socket: socket.id });
    io.in(name).clients(function (err, clients) {
      var cl = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(clients), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var b = _step.value;

          if (b != socket.id) {
            cl.push(b);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      callback(cl);
    });
  });
  socket.on('exchange', function (data) {
    console.log('exchange', data);
    data.from = socket.id;
    var to = io.to(data.to);
    to.emit('exchange', data);
  });
  socket.on('preserveSocketId', function (data) {
    console.log("data", data);
    socketSess[data] = socket.id;
  });
  socket.on('invite_video_p', function (data) {
    var tom = socketSess[data.to];
    var to = io.to(tom);
    console.log("tom", tom, to, data);
    to.emit('invite_video_p', data.Room);
  });
  socket.on('answer', function (data) {
    var tom = socketSess[data];
    var to = io.to(tom);
    to.emit('answer', tom);
  });
  socket.on('invite_video', function (data) {
    var tom = socketSess[data.to];
    var to = io.to(tom);
    to.emit('invite_video', data.Room);
  });
});

// app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

http.listen(PORT, function () {
  console.log('Listening on ' + PORT);
});