//multiple files
//promisified function
//read files one by one i.e., serially!!

//isse bhi kch fayda ni hua ye bhi promise hell bnadegaa(like callback hell)... to hm promise chaining use krenge to overcome these hells

const fs = require("fs");

let f1KaPendingPromise = fs.promises.readFile("./f1.txt");

f1KaPendingPromise.then(function(data){
  console.log(data+"");
  let f2KaPendingPromise = fs.promises.readFile("./f2.txt");
  f2KaPendingPromise.then(function(data){
  console.log(data+"");
  let f3KaPendingPromise = fs.promises.readFile("./f3.txt");
  f3KaPendingPromise.then(function(data){
  console.log(data+"");
   });
 });
});