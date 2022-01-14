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

    leftWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("The Left Wrist X is " + leftWristX + " and the Left Wrist Y is " + leftWristY);
    console.log("The Right Wrist X is " + rightWristX + " and the Right Wrist Y is " + rightWristY);
    }
    
}

function draw() {
	image(video, 0, 0, 600, 500);
	
	song1Status = "";
	song2Status = "";


	fill("#FF0000");
	stroke("#FF0000");

	if(scoreRightWrist > 0.2)
	{ 
		circle(rightWristX,rightWristY,20);

			song2.stop();
            song1.play();
            song1.setVolume(1);
            song1.rate(1);
            song1Status = true;

		if(song1Status == true){

			document.getElementById("status").innerHTML = "Playing Intentions";
		}

        
	}
}

	if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);

			song1.stop();
            song2.play();
            song2.rate(1);
            song2.setVolume(1);

		if(song2Status == true){
			document.getElementById("status").innerHTML = "Playing Sorry";
		}
	}
    function preLoad() {
        song1 = loadSound("Intentions.mp3");
        song2 = loadSound("Sorry.mp3");
      }

function play(){
	song1.play();
	song1.setVolume(1);
	song1.rate(1);
}
function stop() {
    song.stop(); 
 }
 function modelLoaded() {
    console.log('PoseNet Is Initialized');
  }

  