Peter_pan_song = "";
Harry_potter_theme_song = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

song_Peter_pan = "";
theme_song_Harry_potter = "";

function preload() {
    Harry_potter_theme_song = loadSound("music.mp3");
    Peter_pan_song = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill('#FF0000');
    stroke('#FF0000');

    song_Peter_pan = Peter_pan_song.isPlaying();

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        Harry_potter_theme_song.stop();
        if (song_Peter_pan == false) {
            Peter_pan_song.play();
            document.getElementById("song").innerHTML = "Song name: Peter Pan Song";
        }
            
    }

    theme_song_Harry_potter = Harry_potter_theme_song.isPlaying();

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        Peter_pan_song.stop();

        if (theme_song_Harry_potter == false) {
            Harry_potter_theme_song.play();
            document.getElementById("song").innerHTML = "Song name: Harry potter Theme Song";
        }
    }
}

function modelLoaded() {
    console.log('PoseNet is Initialized');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}