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

var _login = require('./tt1/handler/login');

var _login2 = _interopRequireDefault(_login);

var _signup = require('./tt1/handler/signup');

var _signup2 = _interopRequireDefault(_signup);

var _query = require('./tt1/handler/admin/query');

var _query2 = _interopRequireDefault(_query);

var _mapData = require('./tt1/handler/mapData');

var _mapData2 = _interopRequireDefault(_mapData);

var _profile = require('./tt1/handler/profile');

var _profile2 = _interopRequireDefault(_profile);

var _user = require('./tt1/handler/details/user');

var _user2 = _interopRequireDefault(_user);

var _token = require('./tt1/middleware/token');

var _otp = require('./tt1/handler/otp');

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

var _mockUser = require('./tt1/mockUser');

var _mockUser2 = _interopRequireDefault(_mockUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import {EMOJIS_DATA} from './emojis';
var EMOJIS_DATA = {};
var GridFSStorage = require('multer-gridfs-storage');
var path = require('path');
var appCors = require('cors');
var bodyParser = require('body-parser');
var useragent = require('express-useragent');
var fs = require('fs');
var child_process = require('child_process');
var GridFSBucket = require("mongodb").GridFSBucket;
var multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');
var jsonParser = bodyParser.json();
var PORT = process.env.PORT || 5000;
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

app.get('/dummyGet',function(req,res) {
  res.send("dummy get");
});

app.get('/loadTester', appCors(),function(req,res) {
  fs.readFile('dummy.txt',function(error,data){
    if (error) throw error;
    console.log("This is dummy data", data);
    res.send("data");
  })
});

app.post('/dummyPost',function(req,res) {
  res.send("dummy post");
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
