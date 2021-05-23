let videoplayer = document.querySelector("video");
let recordBtn = document.querySelector("#record-video");
let captureBtn = document.querySelector("#capture-photo");
let zoomIn = document.querySelector("#in");
let zoomOut = document.querySelector("#out");
let recordedData;
let recordingState=false;
let mediaRecorder;

let constraints = {video:true};

let maxZoom=3;
let currZoom=1;
let minZoom=1;

(async function(){
   
    let mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    videoplayer.srcObject = mediaStream;

    mediaRecorder = new MediaRecorder(mediaStream);

    mediaRecorder.onstart = function(e){
       console.log("Inside Start");
    }
    mediaRecorder.onstop = function(e){
       console.log("Inside Stop");
    }
    mediaRecorder.ondataavailable = function(e){
        recordedData = e.data;
        saveVideoToFs();
    }

    captureBtn.addEventListener("click",capturePhotos);

    zoomIn.addEventListener("click",function(){
        if(currZoom + 0.1 <= maxZoom){
            currZoom = currZoom + 0.1;
            videoplayer.style.transform = `scale(${currZoom})`;
        }
    });

    zoomOut.addEventListener("click",function(){
        if(currZoom - 0.1 >= minZoom){
            currZoom = currZoom - 0.1;
            videoplayer.style.transform = `scale(${currZoom})`;
        }
    });

})();

recordBtn.addEventListener("click",function(e){
    if(recordingState){
        mediaRecorder.stop();
        // recordBtn.innerHTML = "Record";
        recordBtn.querySelector("div").classList.remove("record-animate");
    }
    else{
        mediaRecorder.start();
        // recordBtn.innerHTML = "Recording";
        recordBtn.querySelector("div").classList.add("record-animate");
    }
    recordingState = !recordingState;
})

function saveVideoToFs(){
    console.log("Saving Video");

    let videoURL = URL.createObjectURL(recordedData);

    let aTag = document.createElement("a");
    aTag.download = "video.mp4";
    aTag.href = videoURL;
    console.log(aTag);

    aTag.click();
}

function capturePhotos(){
    captureBtn.querySelector("div").classList.add("capture-animate");

    setTimeout(function(){
       captureBtn.querySelector("div").classList.remove("capture-animate"); 
    },1000)

    let canvas = document.createElement("canvas");

    canvas.height = videoplayer.videoHeight;
    canvas.width = videoplayer.videoWidth;
   
    let ctx = canvas.getContext("2d");

     // canvas is scaled according to currZoom
    if(currZoom != 1){
        ctx.translate(canvas.width/2 , canvas.height/2);
        ctx.scale(currZoom,currZoom);
        ctx.translate(-canvas.width/2 , -canvas.height/2);
    }


    ctx.drawImage(videoplayer,0,0);

    let imageUrl = canvas.toDataURL("Photo/jpg");

    let aTag = document.createElement("a");
    aTag.download = "photo.jpg";
    aTag.href = imageUrl;

    aTag.click();

}