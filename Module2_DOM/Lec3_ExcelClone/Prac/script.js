let topRow = document.querySelector(".top-row");
let leftCol = document.querySelector(".left-col");
let topLeftCell = document.querySelector(".top-left-cell");
let allCells = document.querySelectorAll(".cell");
let addressInput = document.querySelector("#address");
let formulaInput = document.querySelector("#formula");
let lastSelectedCell;

cellContentDiv.addEventListener("scroll",function(e){
    let top = e.target.scrollTop;
    let left = e.target.scrollLeft;

    topRow.style.top = top + "px";
    leftCol.style.left = left + "px";
    topLeftCell.style.top = top + "px";
    topLeftCell.style.left = left + "px";
});

for(let i=0;i<allCells.length;i++){
   allCells[i].addEventListener("click" , function(e){
       let rowId = Number(e.target.getAttribute("rowid"));
       let colId = Number(e.target.getAttribute("colid"));
    //    let cellObject = db[rowId][colId];
       let address = String.fromCharCode(colId+65)+(rowId+1)+"";
       addressInput.value = address;
   })

   allCells[i].addEventListener("blur" , function(e){
       lastSelectedCell = e.target;
       let cellValue = e.target.textContent;
       let rowId = Number(e.target.getAttribute("rowid"));
       let colId = Number(e.target.getAttribute("colid"));
       let cellObject = db[rowId][colId];

       if(cellObject.value == cellValue){
           return;
       }
       cellObject.value = cellValue;
   })
}

formulaInput.addEventListener("blur" , function(e){
    let formula = e.target.value;
    if(formula){
       let rowId = Number(lastSelectedCell.getAttribute("rowid"));
       let colId = Number(lastSelectedCell.getAttribute("colid"));
       let cellObject = db[rowId][colId];
       
       let computedValue = solveFormula(formula);

       cellObject.formula = formula;
       cellObject.value = computedValue;
       lastSelectedCell.textContent = computedValue;
    }
})
