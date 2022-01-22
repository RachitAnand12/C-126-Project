song1Status = "";
song2Status = "";
song1 = "";
song2 = "";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload() {
	song1 = loadSound("Intentions.mp3");
	song2 = loadSound("Sorry.mp3");
  }

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();
	video = createCapture(VIDEO);
	video.hide();
	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("Score Left Wrist = " + scoreLeftWrist);
    scoreRightWrist = results[0].pose.keypoints[10].score;
    console.log("Score Right Wrist = " + scoreRightWrist);

    leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
    rightWristY = results[0].pose.rightWrist.y;
	rightWristX = results[0].pose.rightWrist.x;
    console.log("The Left Wrist X is " + leftWristX + " and the Left Wrist Y is " + leftWristY);
    console.log("The Right Wrist X is " + rightWristX + " and the Right Wrist Y is " + rightWristY);
    }
    
}

function modelLoaded() {
	console.log('PoseNet Is Initialized');
	}

function play(){
song1.play();
song1.setVolume(1);
song1.rate(1);
}
function stop() {
song1.stop(); 
song2.stop(); 
}



function draw() {
	image(video, 0, 0, 600, 500);
	
	fill("#FF0000");
	stroke("#FF0000");

	song1Status = song1.isPlaying();
	song2Status = song2.isPlaying();

	if(scoreRightWrist > 0.2){ 
		circle(rightWristX,rightWristY,20);
		
			song2.stop();
			if(song1Status == false){
				song1.play();
				document.getElementById("status").innerHTML = "Playing Sorry";
			}
			
	}

	if(scoreLeftWrist > 0.2){
		circle(leftWristX,leftWristY,20);

			song1.stop();
            
			if(song2Status == false){
				song2.play();
				document.getElementById("status").innerHTML = "Playing Intentions";
			}
	}
}

	
    
  