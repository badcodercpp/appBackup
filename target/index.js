import express from 'express';
import doLogin from './handler/login';
import doSignup from './handler/signup';
import doAdminStuffs from './handler/admin/query';
import doGetMapData from './handler/mapData';
import doGetProfile from './handler/profile';
import doGetUserDetails from './handler/details/user';
import { checkToken } from './middleware/token';
import sendOtp from './handler/otp';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _omit from 'lodash/omit';
import _find from 'lodash/find';
import _first from 'lodash/first';
import _last from 'lodash/last';
import _isEqual from 'lodash/isEqual';
import _values from 'lodash/values';
import _keys from 'lodash/keys';
import mixin, {user as USER} from './mockUser';
// import {EMOJIS_DATA} from './emojis';
const EMOJIS_DATA = {};
const GridFSStorage = require('multer-gridfs-storage');
const path = require('path');
const bodyParser = require('body-parser')
const useragent = require('express-useragent');
const fs = require('fs');
var child_process = require('child_process');
var GridFSBucket = require("mongodb").GridFSBucket;
var multer  = require('multer')
var ffmpeg = require('fluent-ffmpeg');
const jsonParser = bodyParser.json();
const PORT = process.env.PORT || 5001;
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://mayank0904:badcoder1993@cluster0.g4rhc.mongodb.net/bad?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });

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
  destination: function (req, file, cb) {
    console.log("Hello people in storage");
    return cb(null, path.join(__dirname, 'public'));
  },
  filename: function (req, file, cb) {
    console.log(file)
    var ext = file.originalname.split('.')[1];
    // Date.now().toString() + "." + ext
    return cb(null,  file.originalname);
  }
})
var upload = multer({ storage })
const app = express();
app.use(express.static(path.join(__dirname, 'public')))
var http = require('http').createServer(app);
const io = require('socket.io')(http, {pingTimeout: 30000});
const EMOJIS = _values(EMOJIS_DATA);
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Expose-Headers", "*")
//   next();
// });

app.use(useragent.express());

app.get('/test', (req, res) => {
  res.send('hello world')
});

const sendPush = (deviceId) => {
  const serverKey = 'AAAAOtK9bxk:APA91bGyO2u7yd5KuHuJrk7YbcX5_hH-AAtcoLuhrNSDMFOSJHecuXOPN_Dr5rdEEBJjAFKTVNL4VCR7FbIow6TFmn6lul9HbrScT2wagZfaXzBM-llXwCrcgX9WxgICszDO1DZJ0QYs'; //put your server key here
    const fcm = new FCM(serverKey);
 
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: deviceId, 
        
        notification: {
            title: 'This is dummy push ', 
            body: 'Body of dummy push notification' 
        },
        
        data: {  //you can send only notification or only data(or include both)
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    };
    
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!", err);
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
}

app.post('/saveFCMDeviceId', jsonParser, (req, res) => {
  const body = req.body || {};
  console.log("bbody", body)
  const {FCMDeviceID, userName} = body;
  const c1 = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
      c1.connect(async function() {
        try {
          const db = c1.db("meewee")
          const r = await db.collection('FCMDeviceID').insertOne({FCMDeviceID, userName});
          sendPush(FCMDeviceID);
          res.send(r)
        } catch (e) {
            console.log (e);
            res.send(e);
        } finally {
          c1.close();
        }
      })
})

app.post('/mwRegister', jsonParser, (req, res) => {
  const body = req.body || {};
  const {register = {}} = body;
  const {otp, mobile} = register;
  const c1 = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
      c1.connect(async function() {
        try {
          const r = await db.collection('mwotp').findOne({mobile});
          const otpInDb = _get(r, 'otp');
          if (_isEqual(otp, otpInDb)) {
            const c = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
            c.connect(async function() {
              const db = client.db('bad')
              try {
                const data = {...mixin, ...register};
                const r = await db.collection('mwuser').insertOne(data);
                res.send({ mobile });
              } catch (e) {
                  console.log (e);
                  res.send(e);
              } finally {
                c.close();
              }
            });
          }
          res.send(r);
        } catch (e) {
            console.log (e);
            res.send(e);
        } finally {
          c1.close();
        }
      })
  
})

app.post('/login', jsonParser, (req, res) => {
  return doLogin(req, res)
})

app.post('/signup', jsonParser, (req, res) => {
  return doSignup(req, res)
})

app.get('/mapdata', jsonParser, (req, res) => {
  return doGetMapData(req, res)
})

app.post('/doAdminStuffs', jsonParser, (req, res) => {
  return doAdminStuffs(req, res)
})

app.post('/profile/:id', jsonParser, (req, res) => {
  return doGetProfile(req, res);
})

app.post('/userDetails', jsonParser, checkToken, (req, res) => {
  return  doGetUserDetails(req, res);
})

app.post('/uploadMedia', jsonParser, checkToken, (req, res) => {
  return  doUploadMedia(req, res);
})

app.get('/emojisAndStickers', (req, res) => {
  const data = {
    emojis: _keys(EMOJIS_DATA)
  }
  res.send(data)
})

app.post('/makeMWUser', jsonParser, (req, res) => {
  const body = req.body || {};
  const data = {...mixin, ...body};
  client.connect(async function() {
      const db = client.db('bad')
      try {
        const r = await db.collection('user').insertOne(data);
        res.send(r);
      } catch (e) {
          console.log (e);
          res.send(e);
      };
      client.close();
  });
})

app.get('/sendOtp/:mobile', (req, res) => {
    const {mobile} = req.params || {};
    const otp = Math.floor(1000 + Math.random() * 9000)
    sendOtp(undefined, otp).then(() => {
      client.connect(async function() {
        const db = client.db('meewee')
        try {
          const data = {mobile, otp};
          console.log(data);
          const r = await db.collection('mwotp').insertOne(data);
          console.log(r);
          res.send({ mobile });
        } catch (e) {
            console.log (e);
            res.send(e);
        } finally {
          client.close();
        }
    });
  }).catch((error) => {
    console.log(error);
    res.send({error});
  })
})

app.post('/uploadVideo', upload.single('video'), function (req, res, next) {
  client.connect(function() {
    const db = client.db('bad')
    console.log(db)
    const bucket = new GridFSBucket(db, { bucketName: 'video' });
    const readStream = fs.createReadStream(req.file.path);
    const uploadStream = bucket.openUploadStream(req.file.filename);
    console.log(uploadStream.id, "id")
    uploadStream.once('finish', function() {
      console.log("done")
      fs.unlinkSync(req.file.path)
      client.close();
      const data = {
        ...(req.file),
        id: uploadStream.id,
        mongo: {
          bucket: 'video',
          id: uploadStream.id,
          file: 'video.files',
          chunk: 'video.chunks'
        }
      }
      res.send(data)
    });
    readStream.pipe(uploadStream);
  });
})

app.get('/getVideo/:fileName', (req, res) => {
  //const id = '1c70b22d-1ddb-4b21-b56b-2bead57ab06c.mp4';
  const {fileName} = req.params || {};
  client.connect(function() {
    const db = client.db('bad')
    console.log(db)
    var bucket = new GridFSBucket(db, { bucketName: 'video' });
    var downloadStream = bucket.openDownloadStreamByName(fileName);
    downloadStream.pipe(res);
    // client.close()
  });
})

app.get('/getAudio/:fileName', (req, res) => {
  const {fileName} = req.params || {};
  client.connect(function() {
    const db = client.db('bad')
    console.log(db)
    var bucket = new GridFSBucket(db, { bucketName: 'audio' });
    var downloadStream = bucket.openDownloadStreamByName(fileName);
    downloadStream.pipe(res);
  });
})

app.post('/uploadAudio', upload.single('audio'), function (req, res, next) {
  client.connect(function() {
    const db = client.db('bad')
    console.log(db)
    const bucket = new GridFSBucket(db, { bucketName: 'audio' });
    const readStream = fs.createReadStream(req.file.path);
    const uploadStream = bucket.openUploadStream(req.file.filename);
    console.log(uploadStream.id, "id")
    uploadStream.once('finish', function() {
      console.log("done")
      fs.unlinkSync(req.file.path)
      client.close();
      const data = {
        ...(req.file),
        id: uploadStream.id,
        mongo: {
          bucket: 'audio',
          id: uploadStream.id,
          file: 'audio.files',
          chunk: 'audio.chunks',
          streamName: _get(req, 'file.filename'),
        }
      }
      res.send(data)
    });
    readStream.pipe(uploadStream);
  });
})

app.get('/getImage/:fileName', (req, res) => {
  const {fileName} = req.params || {};
  client.connect(function() {
    const db = client.db('bad')
    console.log(db)
    var bucket = new GridFSBucket(db, { bucketName: 'image' });
    var downloadStream = bucket.openDownloadStreamByName(fileName);
    downloadStream.pipe(res);
  });
})

app.post('/uploadImage', upload.single('image'), function (req, res, next) {
  client.connect(function() {
    const db = client.db('bad')
    console.log(db)
    const bucket = new GridFSBucket(db, { bucketName: 'image' });
    const readStream = fs.createReadStream(req.file.path);
    const uploadStream = bucket.openUploadStream(req.file.filename);
    console.log(uploadStream.id, "id")
    uploadStream.once('finish', function() {
      console.log("done")
      fs.unlinkSync(req.file.path)
      client.close();
      const data = {
        ...(req.file),
        id: uploadStream.id,
        mongo: {
          bucket: 'audio',
          id: uploadStream.id,
          file: 'image.files',
          chunk: 'image.chunks',
          streamName: _get(req, 'file.filename'),
        }
      }
      res.send(data)
    });
    readStream.pipe(uploadStream);
  });
})

app.post('/createMWMixin', jsonParser, (req, res) => {
  const body = req.body || {};
  const data = mixin;
  client.connect(async function() {
      const db = client.db('bad')
      try {
        const r = await db.collection('mwmixin').insertOne({...data, createdDate: Date.now()});
        res.send(r);
      } catch (e) {
          console.log (e);
          res.send(e);
      };
      client.close();
  });
})

app.post('/addMWUser', jsonParser, (req, res) => {
  const body = req.body || {};
  const data = {...USER, ...body};
  client.connect(async function() {
      const db = client.db('bad')
      try {
        const r = await db.collection('mwuser').insertOne(data);
        res.send(r);
      } catch (e) {
          console.log (e);
          res.send(e);
      };
      client.close();
  });
})

app.post('/getUser', jsonParser, (req, res) => {
  const body = req.body || {};
  const {mobile} = body;
  client.connect(async function() {
      const db = client.db('bad')
      try {
        const r = await db.collection('mwuser').findOne({mobile});
        res.send(r);
      } catch (e) {
          console.log (e);
          res.send(e);
      };
      client.close();
  });
})

app.post('/getMWMixin', jsonParser, (req, res) => {
  const body = req.body || {};
  const {me = {}, followers = [], followings = []} = body;
  const {mobile = 'badcoder'} = me;
  const knownOnes = _map([...followers, ...followings], (user) => {
    const phone = _get(user, 'mobile');
    return phone;
  })
  const targetUsers = [
    mobile, ...knownOnes
  ];
  client.connect(async function() {
    const db = client.db('bad')
    try {
      const cursor = await db.collection('mwmixin').find({"user.username": { $in: targetUsers } }).sort({createdDate: 1}).toArray();
      const users = cursor.map((u) => u)
      console.log("users", users, targetUsers)
      res.send(users);
    } catch (e) {
        console.log (e);
        res.send({});
    };
    client.close();
  });
})

app.post('/searchUser', jsonParser, (req, res) => {
  const body = req.body || {};
  const {text = "Ajay"} = body;
  client.connect(async function() {
    const db = client.db('bad')
    try {
      const t = `\\${text}\\`
      const cursor = await db.collection('mwuser').find({ "$text": { "$search": `/${text}/`, "$caseSensitive": false, 
      "$diacriticSensitive": false } }).toArray();
      const users = cursor.map((u) => u)
      console.log("users", users)
      res.send(users);
    } catch (e) {
        console.log (e);
        res.send({});
    };
    client.close();
  });
})

app.post('/getUsersDetail', jsonParser, (req, res) => {
  const body = req.body || {};
  const {users = ["9836648105", "7416634081"]} = body;
  client.connect(async function() {
      const db = client.db('bad')
      try {
        const r = await db.collection('mwuser').find({mobile : { $in: users }}).toArray();
        res.send(r);
      } catch (e) {
          console.log (e);
          res.send(e);
      };
      client.close();
  });
})

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

const getType = () => {
  
}

app.post('/onFlyMixin', jsonParser, (req, res) => {
  // res.writeHead(200, {'Content-Type': 'audio/mpeg'});
  const body = req.body || {};
  const {type} = body;
    const args = [
      '-i',
      'test.mp4',
      '-filter_complex',
      '[0:v]scale=720:720,boxblur=luma_radius=20:luma_power=1:chroma_radius=20:chroma_power=1[bg];[0:v]scale=720:720:force_original_aspect_ratio=decrease[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2[outv]',
      '-map',
      '[outv]',
      '-map',
      '0:a?',
      `__test__${Date.now()}.mp4`
    ]
    var ffmpeg = spawnFfmpeg(
      function (code) { // exit
      	  console.log('child process exited with code ' + code);
      		res.end();
      }, args);
      
    ffmpeg.stdout.pipe(res)
    
    // getYoutubeVideo(yt_url, 
    //   function(res) {
    //     res.pipe(ffmpeg.stdin)
    // });
})

app.post('/mixVideos', upload.any(), (req, res) => {
  const files = req.files || [];
  const body = req.body || {};
  const {userName, isDuke} = body;
  if (isDuke) {
    const video1 = _find(files, ({fieldname}) => _isEqual(fieldname, 'video1'));
    const video2 = _find(files, ({fieldname}) => _isEqual(fieldname, 'video2'));
    const audio1 = _find(files, ({fieldname}) => _isEqual(fieldname, 'audio1'));
    const audio2 = _find(files, ({fieldname}) => _isEqual(fieldname, 'audio2'));
    const v_n_1 = _first((_get(video1, 'originalname') || '').split('.'))
    const v_n_2 = _first((_get(video2, 'originalname') || '').split('.'))
    const a_n_1 = _first((_get(audio1, 'originalname') || '').split('.'))
    const a_n_2 = _first((_get(audio2, 'originalname') || '').split('.'))

    const v_n_1_t = _last((_get(video1, 'originalname') || '').split('.'))
    const v_n_2_t = _last((_get(video2, 'originalname') || '').split('.'))
    const a_n_1_t = _last((_get(audio1, 'originalname') || '').split('.'))
    const a_n_2_t = _last((_get(audio2, 'originalname') || '').split('.'))

    const v_n_1_p = `${__dirname}/public/${v_n_1}.${v_n_1_t}`;
    const v_n_2_p = `${__dirname}/public/${v_n_2}.${v_n_2_t}`;
    const a_n_1_p = `${__dirname}/public/${a_n_1}.${a_n_1_t}`;
    const a_n_2_p = `${__dirname}/public/${a_n_2}.${a_n_2_t}`;
    ffmpeg()  
    .input(v_n_1_p)
    .input(a_n_1_p)
    .setDuration(30)
    .outputOption('-map 0:0')
    .outputOption('-map 1:0')
    .audioCodec('aac')
    .videoCodec('mpeg4')
    .output(`${v_n_1}__${a_n_1}.mp4`)
    .on('end', function() {
          ffmpeg()  
          .input(v_n_2_p)
          .input(a_n_2_p)
          .setDuration(30)
          .outputOption('-map 0:0')
          .outputOption('-map 1:0')
          .audioCodec('aac')
          .videoCodec('mpeg4')
          .output(`${v_n_2}__${a_n_2}.mp4`)
          .on('end', function() {
            ffmpeg()  
            .input(`${v_n_1}__${a_n_1}.mp4`)
            .input(`${v_n_2}__${a_n_2}.mp4`)
            .input(`${v_n_2}__${a_n_2}.mp4`)
            .setDuration(60)
            .complexFilter([
              '[0]pad=2*iw:ih[l]',
              '[1]setpts=PTS-STARTPTS+30/TB[1v]',
              '[l][1v]overlay=x=W/2[a]',
              '[2]setpts=PTS-STARTPTS+250/TB[2v]',
              '[a][2v]overlay=x=W/2[v]',
              '[1]adelay=30000|30000[1a]',
              '[0][1a]amix=inputs=2[a]'
            ])
            .outputOptions('-map [v]')
            .outputOptions('-map [a]')
            .outputOptions('-ac 2')
            .outputOptions('-preset veryfast')
            .output(`${v_n_1}__${a_n_1}__${v_n_2}__${a_n_2}__final_duke.mp4`)
            .on('end', function() {
                  console.log('Finished processing');
                  ffmpeg(`${v_n_1}__${a_n_1}__${v_n_2}__${a_n_2}__final_duke.mp4`)
                  .output(`${v_n_1}__${a_n_1}__${v_n_2}__${a_n_2}__final_duke__reactions.mp4`)
                  .on('end', function() {
                      // console.log("done all changes")
                      client.connect( function() {
                        const db = client.db('bad')
                        console.log(db)
                        const bucket = new GridFSBucket(db, { bucketName: 'video' });
                        const readStream = fs.createReadStream(`${v_n_1}__${a_n_1}__${v_n_2}__${a_n_2}__final_duke__reactions.mp4`);
                        const uploadStream = bucket.openUploadStream(`${v_n_1}__${a_n_1}__${v_n_2}__${a_n_2}__final_duke__reactions.mp4`);
                        console.log(uploadStream.id, "id")
                        uploadStream.once('finish', async function() {
                          console.log("done")
                          fs.unlinkSync(`${v_n_1}__${a_n_1}__${v_n_2}__${a_n_2}__final_duke__reactions.mp4`)
                          try {
                            await db.collection('mwmxnames').insertOne({userName, filename: `${v_n_1}__${a_n_1}__${v_n_2}__${a_n_2}__final_duke__reactions.mp4`});
                            // res.send(r);
                          } catch (e) {
                              console.log (e);
                              res.send(e);
                          };
                          client.close();
                          const data = {
                            ...(req.file),
                            id: uploadStream.id,
                            data: {
                              bucket: 'audio',
                              id: uploadStream.id,
                              file: 'video.files',
                              chunk: 'video.chunks',
                              streamName: `${v_n_1}__${a_n_1}__${v_n_2}__${a_n_2}__final_duke__reactions.mp4`,
                            }
                          }
                          res.send(data)
                        });
                        readStream.pipe(uploadStream);
                      });
                  })
                  .run()
              })
              .run();
          })
          .run();
      })
      .run();
  } else {
    const video1_1 = _find(files, ({fieldname}) => _isEqual(fieldname, 'video1'));
    const audio1_1 = _find(files, ({fieldname}) => _isEqual(fieldname, 'audio1'));
    const v_n_1_1 = _first((_get(video1_1, 'originalname') || '').split('.'))
    const a_n_1_1 = _first((_get(audio1_1, 'originalname') || '').split('.'))

    const v_n_1_t_1 = _last((_get(video1_1, 'originalname') || '').split('.'))
    const a_n_1_t_1 = _last((_get(audio1_1, 'originalname') || '').split('.'))

    const v_n_1_p_1 = `${__dirname}/public/${v_n_1_1}.${v_n_1_t_1}`;
    const a_n_1_p_1 = `${__dirname}/public/${a_n_1_1}.${a_n_1_t_1}`;
    ffmpeg()  
    .input(v_n_1_p_1)
    .input(a_n_1_p_1)
    .setStartTime('00:00:00')
    .setDuration(30)
    .outputOption('-map 0:0')
    .outputOption('-map 1:0')
    .audioCodec('aac')
    .videoCodec('mpeg4')
    .output(`${v_n_1_1}__${a_n_1_1}__steady__.mp4`)
    .on('end', function() {
          console.log('Finished processing');
          ffmpeg(`${v_n_1_1}__${a_n_1_1}__steady__.mp4`)
          .output(`${v_n_1_1}__${a_n_1_1}__steady__final__.mp4`)
          .on('end', function() {
              console.log("done both changes")
              client.connect( function() {
                const db = client.db('bad')
                console.log(db)
                const bucket = new GridFSBucket(db, { bucketName: 'video' });
                const readStream = fs.createReadStream(`${v_n_1_1}__${a_n_1_1}__steady__final__.mp4`);
                const uploadStream = bucket.openUploadStream(`${v_n_1_1}__${a_n_1_1}__steady__final__.mp4`);
                console.log(uploadStream.id, "id")
                uploadStream.once('finish', async function() {
                  console.log("done")
                  fs.unlinkSync(`${v_n_1_1}__${a_n_1_1}__steady__final__.mp4`)
                  try {
                    await db.collection('mwmxnames').insertOne({userName, filename: `${v_n_1_1}__${a_n_1_1}__steady__final__.mp4`});
                    // res.send(r);
                  } catch (e) {
                      console.log (e);
                      res.send(e);
                  };
                  client.close();
                  const data = {
                    ...(req.file),
                    id: uploadStream.id,
                    data: {
                      bucket: 'audio',
                      id: uploadStream.id,
                      file: 'video.files',
                      chunk: 'video.chunks',
                      streamName: `${v_n_1_1}__${a_n_1_1}__steady__final__.mp4`,
                    }
                  }
                  res.send(data)
                });
                readStream.pipe(uploadStream);
              });
          })
          .run()
      })
      .run();
  }
  console.log(files, body);
})

app.post('/backupMessage', jsonParser, (req, res) => {

})

app.get('/testRTC',function(req,res){
	res.sendfile(__dirname+'/public/testRTC.html')
})

let ar=[];
var roomList = {};
let socketSess={};
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

io.on('connection', function(socket) {
  console.log("connected")
    socket.on('join_room',function(data){
      let d=JSON.parse(data);
      room[d.me]=socket.id;
    })
    socket.on('disconnect', function () {
      console.log('A user disconnected');
    });
    socket.on('start_chat',function(message){
        let ob={
            to:message.to,
            sdp:message.sdp
        }
        let too=room[message.to];
        io.to(too).emit('chatting',ob)
    })
    socket.on('ice_candidate',function(message){
        let ob={
            to:message.to,
            candidate:message.candidate
        }
        let too=room[message.to];
        io.to(too).emit('isIceCandidate',ob)
    })
    socket.on('disconnect', function(){
        if (socket.room) {
        var room = socket.room;
        io.to(room).emit('leave', socket.id);
        socket.leave(room);
        }
    });
    socket.on('join', function(name, callback){
        socket.join(name);
        socket.room = name;
        ar.push({name:name,socket:socket.id})
        io.in(name).clients((err , clients) => {
            let cl=[];
            for(let b of clients){
                if(b!=socket.id){
                    cl.push(b)
                }
            }
            callback(cl);
        }); 
    });
    socket.on('exchange', function(data){
        console.log('exchange', data);
        data.from = socket.id;
        var to=io.to(data.to);
        to.emit('exchange', data);
    });
    socket.on('preserveSocketId', function(data){
      console.log("data", data)
        socketSess[data] = socket.id;
    });
    socket.on('invite_video_p', function(data){
        let tom=socketSess[data.to];
        var to=io.to(tom);
        console.log("tom", tom ,to, data)
        to.emit('invite_video_p', data.Room);
    });
    socket.on('answer',function(data){
        let tom=socketSess[data];
        var to=io.to(tom);
        to.emit('answer', tom);
    })
    socket.on('invite_video', function(data){
        let tom=socketSess[data.to];
        var to=io.to(tom);
        to.emit('invite_video', data.Room);
    });
});


// app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

http.listen(PORT, function() {
  console.log(`Listening on ${ PORT }`);
});
