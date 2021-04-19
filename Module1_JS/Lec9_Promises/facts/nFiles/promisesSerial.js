//multiple files
//promisified function
//read files one by one i.e., serially!!

const fs=require("fs");

let files=["../f1.txt" , "../f2.txt" , "../f3.txt"];

let f1kaPromise=fs.promises.readFile(files[0]);

for(let i=1;i<files.length;i++){
    f1kaPromise=f1kaPromise.then(function(data){
        console.log(data+"");
        let newFileKaPromise=fs.promises.readFile(files[i]);
        return newFileKaPromise;
    })
}

//last vali file ka data print krane k lie scb lgaya jisse last file ka data print hojae
f1kaPromise.then(function(data){
    console.log(data+"");
})