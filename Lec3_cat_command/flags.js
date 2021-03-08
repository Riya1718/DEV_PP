let fs = require("fs");

let f1KaData = fs.readFileSync("./f3.txt")+"";


// -s => removes extra spaces
let data=f1KaData.split("\r\n");
console.log(data);
let removedSpaces = [];

function removeLargeSpaces(data){
    let emptyPushed=false;
    for(let i=0;i<data.length;i++){
        if(data[i]=='' && !emptyPushed){
            removedSpaces.push(data[i]);
            emptyPushed=true;
        }
        else if(data[i] != ''){
            removedSpaces.push(data[i]);
        }
    }
    console.log(removedSpaces);
    let joinedString=removedSpaces.join("\n");
    console.log(joinedString);
}
removeLargeSpaces(data);


// -b => add line numbers to non empty lines
function addLineNumberToNonEmptyLines(data){
    let count=1;
    for(let i=0;i<data.length;i++){
    if(data[i] != ''){
        data[i]=`${count}.${data[i]}`;
        count++;
    }
  }
  console.log(data);
  let addedLineNumber=data.join("\n");
  console.log(addedLineNumber);
}
addLineNumberToNonEmptyLines(data);


// -n => add line numbers to each line
function addLineNumberToAllLines(data){
    for(let i=1;i<data.length+1;i++){
        data[i-1]=`${i}.${data[i-1]}`;
    }
    console.log(data);
    let addedLineNumber=data.join("\n");
    console.log(addedLineNumber);
}
addLineNumberToAllLines(data);
