var ffmpeg = require('fluent-ffmpeg');

// ffmpeg('test.mp4')
// .noAudio()
// .addInput('test1.mp3')
// .output('outputfile_1.mp4')
// .on('end', function() {
// console.log('Finished processing');
// })
// .run();

// ffmpeg()  
//   .input('test.mp4')
//   .input('test1.mp3')
//   .setStartTime('00:00:00')
//   .setDuration(45)
//   .outputOption('-map 0:0')
//   .outputOption('-map 1:0')
//   .audioCodec('aac')
//   .videoCodec('copy')
//   .output('outputfile.mp4')
//   .on('end', function() {
//         console.log('Finished processing');
//         ffmpeg('outputfile.mp4')
//         .input('testing.gif')
//         .outputOptions('-pix_fmt yuv420p')
//         .complexFilter([
//             "[0:v]scale=640:-1[bg];[bg][1:v]overlay=W-w-10:H-h-10"
//         ])
//         .output('final.mp4')
//         .on('end', function() {
//             console.log("done both changes")
//         })
//         .run()
//     })
//     .run();

// duke player
// ffmpeg()  
//   .input('test.mp4')
//   .input('test.mp4')
//   .complexFilter([
//     'hstack',
//   ])
//   .output('dual.mp4')
//   .on('end', function() {
//         console.log('Finished processing');
//     })
//     .run();

// ffmpeg()  
//   .input('test.mp4')
//   .input('test.mp4')
//   .input('test.mp4')
//   .complexFilter([
//     '[0]pad=2*iw:ih[l]',
//     '[1]setpts=PTS-STARTPTS+15/TB[1v]',
//     '[l][1v]overlay=x=W/2[a]',
//     '[2]setpts=PTS-STARTPTS+15/TB[2v]',
//     '[a][2v]overlay=x=W/2[v]',
//     '[1]adelay=0|0[1a]',
//     '[2]adelay=15|15[2a]',
//     '[0][1a][2a]amix=inputs=3[a]'
//   ])
//   .outputOptions('-map [v]')
//   .outputOptions('-map [a]')
//   .output('dual.mp4')
//   .on('end', function() {
//         console.log('Finished processing');
//     })
//     .run();


// ffmpeg()  
//   .input('test.mp4')
//   .input('test.mp4')
//   .input('test.mp4')
//   .setStartTime('00:00:00')
//   .setDuration(30)
//   .complexFilter([
//     '[0]pad=2*iw:ih[l]',
//     '[1]setpts=PTS-STARTPTS+15/TB[1v]',
//     '[l][1v]overlay=x=W/2[a]',
//     '[2]setpts=PTS-STARTPTS+250/TB[2v]',
//     '[a][2v]overlay=x=W/2[v]',
//     '[1]adelay=0|0[1a]',
//     '[2]adelay=1500|1500[2a]',
//     '[0][1a][2a]amix=inputs=3[a]'
//   ])
//   .outputOptions('-map [v]')
//   .outputOptions('-map [a]')
//   .output('dual.mp4')
//   .on('end', function() {
//         console.log('Finished processing');
//     })
//     .run();




    /**
     * final
     */


ffmpeg()  
.input('t1.3gp')
.input('t3.mp3')
.setDuration(30)
.outputOption('-map 0:0')
.outputOption('-map 1:0')
.audioCodec('aac')
.videoCodec('copy')
.output('1.mp4')
.on('end', function() {
      ffmpeg()  
      .input('t2.3gp')
      .input('test1.mp3')
      .setDuration(30)
      .outputOption('-map 0:0')
      .outputOption('-map 1:0')
      .audioCodec('aac')
      .videoCodec('copy')
      .output('2.mp4')
      .on('end', function() {
        ffmpeg()  
        .input('1.mp4')
        .input('2.mp4')
        .input('test.mp4')
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
        .output('dual.mp4')
        .on('end', function() {
              console.log('Finished processing');
              ffmpeg('dual.mp4')
              .output('final.mp4')
              .on('end', function() {
                  console.log("done all changes")
              })
              .run()
          })
          .run();
      })
      .run();
  })
  .run();