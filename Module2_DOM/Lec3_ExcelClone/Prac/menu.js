let menuBtn = document.querySelector(".menu");
let homeMenuOptions = document.querySelector(".home-menu-options");
let fileMenuOptions = document.querySelector(".file-menu-options");

let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");

menuBtn.addEventListener("click",function(e){
    if(e.target.classList.contains("menu")){
        return;
    }

    let selectedMenu = e.target;
    if(selectedMenu.classList.contains("active-menu")){
        return;
    }
    
    document.querySelector(".active-menu").classList.remove("active-menu");
    selectedMenu.classList.add("active-menu");

    let menuName = selectedMenu.classList[0];
    if(menuName == "home"){
        homeMenuOptions.classList.remove("hide");
        fileMenuOptions.classList.add("hide");
    }
    else if(menuName == "file"){
        fileMenuOptions.classList.remove("hide");
        homeMenuOptions.classList.add("hide");
    }
})

// bold.addEventListener("click",function(e){
//     if(bold.classList.contains("active-font-style")){
//         bold.classList.remove("active-font-style");
//     }
//     else{
//         bold.classList.add("active-font-style");  
//     }
// })

// italic.addEventListener("click",function(e){
//     if(italic.classList.contains("active-font-style")){
//         italic.classList.remove("active-font-style");
//     }
//     else{
//         italic.classList.add("active-font-style");  
//     }
// })

// underLine.addEventListener("click",function(e){
//     if(underLine.classList.contains("active-font-style")){
//         underLine.classList.remove("active-font-style");
//     }
//     else{
//         underLine.classList.add("active-font-style");  
//     }
// })


bold.addEventListener("click", function (e) {
    setFontStyle("bold" , bold);
   });
   italic.addEventListener("click", function (e) {
    setFontStyle("italic" , italic);
   });
   underline.addEventListener("click", function (e) {
    setFontStyle("underline" , underline);
   });
   
   function setFontStyle(styleName , element){
     if (lastSelectedCell) {
       let { rowId, colId } = getRowIdColIdFromElement(lastSelectedCell);
       let cellObject = db[rowId][colId];
       // pehle se true tha
       if (cellObject.fontStyle[styleName]) {
         // UI pe changes krdia
         if(styleName == "bold"){
           lastSelectedCell.style.fontWeight = "normal";
         }
         else if(styleName == "italic"){
           lastSelectedCell.style.fontStyle = "normal";
         }
         else{
           lastSelectedCell.style.textDecoration = "none"
         }
         element.classList.remove("active-font-style");
       } else {
         if(styleName == "bold"){
           lastSelectedCell.style.fontWeight = "bold";
         }
         else if(styleName == "italic"){
           lastSelectedCell.style.fontStyle = "italic";
         }
         else{
           lastSelectedCell.style.textDecoration = "underline"
         }
         element.classList.add("active-font-style");
       }
       // change in db
       cellObject.fontStyle[styleName] = !cellObject.fontStyle[styleName];
     }
   }