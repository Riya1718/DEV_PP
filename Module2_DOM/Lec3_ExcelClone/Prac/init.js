let cellContentDiv = document.querySelector(".cells-content");

function initCells(){
let cellContent = '<div class="top-left-cell"></div>'

cellContent += '<div class="top-row">'
for(let i=0;i<26;i++){
    cellContent += `<div class='top-row-cell'>${String.fromCharCode(65+i)}</div>`
}
cellContent += '</div>'

cellContent += '<div class="left-col">'
for(let i=0;i<100;i++){
    cellContent += `<div class="left-col-cell">${i+1}</div>`
}
cellContent += '</div>'

cellContent += '<div class="cells">'
for(let i=0 ; i<100 ; i++){
    cellContent += '<div class="row">'
    for(let j=0; j<26; j++){
        cellContent += `<div class='cell' rowid='${i}' colid='${j}' contentEditable='true'></div>`
    }
    cellContent += '</div>'
}
cellContent += '</div>'

cellContentDiv.innerHTML = cellContent;
}
initCells();

let sheetsDb=[];
let db; //active-sheet db
let visitedCells; //active sheet k visited cells

function initdb(){
    let newSheetDb=[];
    for(let i=0;i<100;i++){
        let row=[];
        for(let j=0;j<26;j++){
            let name = String.fromCharCode(65+j)+(i+1)+"";

            let cellObject={
                name: name,
                value: "",
                formula: "",
                childrens:[],
                parents: [],
                visited: false
            }
            row.push(cellObject);
        }
        newSheetDb.push(row);
    }
    visitedCells=[];
    db=newSheetDb;
    sheetsDb.push({db:newSheetDb, visitedCells: visitedCells});
   // console.log(sheetsDb);
}
initdb();

