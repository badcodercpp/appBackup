'use strict';

var express = require('express');
var path = require('path');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http, { pingTimeout: 30000 });
var PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
    res.sendfile('testRTC.html');
});
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
                for (var _iterator = clients[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
        socketSess[data] = socket.id;
    });
    socket.on('invite_video_p', function (data) {
        var tom = socketSess[data.to];
        var to = io.to(tom);
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

http.listen(PORT, function () {
    console.log('listening on *:3000');
});