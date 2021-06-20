let photo = document.querySelector("#photo");
let download = document.querySelector("#download");

let photoInput = document.querySelector("#photo-upload");

photo.addEventListener("click",function(){
    photoInput.click();
})

photoInput.addEventListener("change",function(e){
    console.log(e);
    let fileObject = e.target.files[0];
    console.log(fileObject);
    let imageURL = URL.createObjectURL(fileObject);

    let img = document.createElement("img");
    img.src = imageURL;
    img.classList.add("image-upload");

    appendSticky(img);
})

download.addEventListener("click",function(){
    let canavsURL = canvas.toDataURL({type:"image/png"});

    let aTag = document.createElement("a");
    
    aTag.download = "canavs.png";
    aTag.href = canavsURL;

    aTag.click();

})
