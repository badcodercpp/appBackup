var ffmpeg = require('ffmpeg');
try {
	var process = new ffmpeg('test.mp4');
	process.then(function (video) {
        console.log('The video is ready to be processed');
        video.addCommand('-filter_complex', '"[0:v]scale=720:720,boxblur=luma_radius=20:luma_power=1:chroma_radius=20:chroma_power=1[bg];[0:v]scale=720:720:force_original_aspect_ratio=decrease[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2[outv]"')
        video.addCommand('-map', '[outv]', '0:a?');
        video.save('test_test.mp4', function (error, file) {
			if (!error){
                console.log('Video file: ' + file);
            }
            console.log('Video file: ' + error);
		});
	    }, function (err) {
		    console.log('Error: ' + err);
	});
} catch (e) {
	console.log(e.code);
	console.log(e.msg);
}