//multiple files
//promisified function
//read files at the same tym i.e., Parallely!!

const fs = require("fs");

let f1KaPendingPromise = fs.promises.readFile("./f1.txt");
let f2KaPendingPromise = fs.promises.readFile("./f2.txt");
let f3KaPendingPromise = fs.promises.readFile("./f3.txt");

f1KaPendingPromise.then(function(data){
   console.log("f1 ka Data => "+data);
});

f1KaPendingPromise.catch(function(error){
    console.log(error);
});

f2KaPendingPromise.then(function(data){
    console.log("f2 ka Data => "+data);
 });

f2KaPendingPromise.catch(function(error){
    console.log(error);
});

f3KaPendingPromise.then(function(data){
    console.log("f3 ka Data => "+data);
 });

f3KaPendingPromise.catch(function(error){
    console.log(error);
});

//will print in random order