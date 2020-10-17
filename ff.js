var ffmpeg = require('fluent-ffmpeg');

// ffmpeg('test.mp4')
// .noAudio()
// .addInput('test1.mp3')
// .output('outputfile_1.mp4')
// .on('end', function() {
// console.log('Finished processing');
// })
// .run();
ffmpeg()
.input('test.mp4')
.complexFilter([
    "[0:v]scale=720:720,boxblur=luma_radius=min(h,w)/20:luma_power=1:chroma_radius=min(cw,ch)/20:chroma_power=1[bg];[0:v]scale=720:720:force_original_aspect_ratio=decrease[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2[outv]"
])
.outputOption('-map [outv]')
.outputOptions('-map 0:a?')
.output('final111.mp4')
.on('end', function() {
    console.log("done both changes")
})
.run()
// ffmpeg()  
//   .input('test.mp4')
//   .input('test1.mp3')
//   .setStartTime('00:00:00')
//   .setDuration(45)
//   .outputOption('-map 0:0')
//   .outputOption('-map 1:0')
//   .audioCodec('aac')
//   .videoCodec('copy')
//   .output('outputfile111.mp4')
//   .on('end', function() {
//         console.log('Finished processing');
//         ffmpeg('outputfile111.mp4')
//         .complexFilter([
//             "[0:v]scale=720:720,boxblur=luma_radius=min(h\,w)/20:luma_power=1:chroma_radius=min(cw\,ch)/20:chroma_power=1[bg]",
//             "[0:v]scale=720:720:force_original_aspect_ratio=decrease[fg]",
//             "[bg][fg]overlay=(W-w)/2:(H-h)/2[outv]"
//         ])
//         .outputOption('-map [outv]')
//         .output('final111.mp4')
//         .on('end', function() {
//             console.log("done both changes")
//         })
//         .run()
//     })
//     .run();


// ffmpeg()  
//   .input('test.mp4')
//   .input('test1.mp3')
//   .noAudio()
//   .complexFilter([
//     '[1:0] adelay=0|0 [delayed]',
//     '[0:1][delayed] amix=inputs=2',
//   ])
//   .outputOption('-map 0:0')
//   .audioCodec('aac')
//   .videoCodec('copy')
//   .output('outputfile_1.mp4')
//   .on('end', function() {
//         console.log('Finished processing');
//     })
//     .run();

ffmpeg -i %1 -start_number 0 -i "Start_%%03d.png"  -start_number 0 -itsoffset 4 -i "Midt_%%03d.png" -start_number 0 -itsoffset 8 -i "End_%%03d.png" -filter_complex "[0:v][1:v]overlay=enable='between(t,0,4)' [temp0];[temp0][2:v]overlay=enable='between(t,4,8)' [temp1];[temp1][3:v]overlay=enable='between(t,8,12)' [out]" -map [out] -map 0:a -c:a copy out003.mp4


ffmpeg -i test.mp4 -i heart.png -y -filter_complex "[1:v]scale=20:20[v1];[0:v][v1]overlay=x=290:y=54:enable='between(t,0,20)'[out]" -map [out] -map 0:a  composit8.mp4