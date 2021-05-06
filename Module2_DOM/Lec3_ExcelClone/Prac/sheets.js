let addSheet = document.querySelector(".add-sheet");
let sheetList = document.querySelector(".sheets-list")
let sheetId=0;

addSheet.addEventListener("click",function(){
    let sheetDiv = document.createElement("div");
    sheetId++;

    document.querySelector(".active-sheet").classList.remove("active-sheet");
    sheetDiv.classList.add("sheet");
    sheetDiv.classList.add("active-sheet");
    sheetDiv.setAttribute("sheetId",sheetId);
    sheetDiv.innerHTML = `sheet ${sheetId+1}`
   

    sheetList.append(sheetDiv);
    
    initUI();

    initdb();
})

sheetList.addEventListener("click",function(e){
    let selectedSheet = e.target;
    
    if(selectedSheet.classList.contains("active-sheet")){
        return;
    }
    document.querySelector(".active-sheet").classList.remove("active-sheet");
    selectedSheet.classList.add("active-sheet");

    initUI();
    
    let sheetId = selectedSheet.getAttribute("sheetId");
    db = sheetsDb[sheetId].db;
    visitedCells = sheetsDb[sheetId].visitedCells;

    setUI();
})

function initUI(){
    // for(let i=0;i<100;i++){
    //     for(let j=0;j<26;j++){
    //         document.querySelector(`div[rowId="${i}"][colId="${j}"]`).innerHTML="";
    //     }
    // }
    for(let i=0;i<visitedCells.length;i++){
        let {rowId,colId} = visitedCells[i];
        document.querySelector(`div[rowId="${rowId}"][colId="${colId}"]`).innerHTML="";
    }
}

function setUI(){
    // for(let i=0;i<100;i++){
    //     for(let j=0;j<26;j++){
    //         let cellObject = db[i][j];
    //         document.querySelector(`div[rowId="${i}"][colId="${j}"]`).innerHTML=cellObject.value;
    //     }
    // } 
    for(let i=0;i<visitedCells.length;i++){
        let {rowId,colId} = visitedCells[i];
        let cellObject = db[rowId][colId];
        document.querySelector(`div[rowId="${rowId}"][colId="${colId}"]`).innerHTML=cellObject.value;
    }
}