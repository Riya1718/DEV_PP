let videoPlayer = document.querySelector("video");
let recordButton = document.querySelector("#record-video");
let photoButton = document.querySelector("#capture-photos");
let constraints = {video:true};
let recordedData;
let recordingState = false;
let mediaRecorder;

(async function(){
   
    let mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    videoPlayer.srcObject = mediaStream;   
    
    mediaRecorder = new MediaRecorder(mediaStream);
   
    // so next we have attached functions to these events
    mediaRecorder.onstop = function(e){
       console.log("Inside on stop");
       console.log(e);
    }

    mediaRecorder.onstart = function(e){
        console.log("Inside on start");
        console.log(e);
     }

     mediaRecorder.ondataavailable = function(e){
        console.log("Inside on data available");
         recordedData = e.data;
        // var newBlob = new Blob([e.data], {"type" : 'video\/mp4'});
        // recordedData = newBlob;

        saveVideoToFs();
     }

     console.log(mediaRecorder);

     //attach click event on record btn
     recordButton.addEventListener("click" , function(){
        if(recordingState){
            // stop the recording
            mediaRecorder.stop();
            recordButton.innerHTML = "Record";
        }
        else{
            //start the recording
            mediaRecorder.start();
            recordButton.innerHTML = "Recording";
        }
        recordingState = !recordingState;
    })
    
    photoButton.addEventListener("click",capturePhotos);

})();

function saveVideoToFs(){
    console.log("Saving Video");
    let videoURL = URL.createObjectURL(recordedData);

    let aTag = document.createElement("a");
    aTag.download = "video.mp4";
    aTag.href = videoURL;

    console.log(aTag);

    aTag.click();

}

function capturePhotos() {
    let canvas = document.createElement("canvas");
    canvas.height = videoPlayer.videoHeight;
    canvas.width = videoPlayer.videoWidth;
  
    let ctx = canvas.getContext("2d");
    ctx.drawImage(videoPlayer, 0, 0);
  
    let imageUrl = canvas.toDataURL("image/jpg"); //canvas object => file url String
  
    let aTag = document.createElement("a");
    aTag.download = "photo.jpg";
    aTag.href = imageUrl;
    aTag.click();
  }