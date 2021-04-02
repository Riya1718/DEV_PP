//multiple files
//promisified function
//read files at the same tym i.e., Parallely!!

const fs = require("fs");

let files=["../f1.txt" , "../f2.txt" , "../f3.txt"];

for(let i=0;i<files.length;i++){
    PendingPromise=fs.promises.readFile(files[i]);
    PendingPromise.then(function(data){
        console.log(data+"");
    })
}
//will print in random order