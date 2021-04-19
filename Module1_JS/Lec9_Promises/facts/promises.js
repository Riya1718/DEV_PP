const fs=require("fs");

// B gets pending Promise        // A initially returns a pending Promise 
let pendingPromise = fs.promises.readFile("./f1.txt");

//pending Promise => promise object whose state is pending
console.log(pendingPromise);

// success callback => scb attached to pendingPromise
pendingPromise.then(function(data){
    console.log("Inside then ka callback i.e, scb")
   // console.log(data);      
    console.log(data+"");
    console.log(pendingPromise);  //pending Promise m data aajaega(without stringified)
});


// failure callback => fcb attached to pending Promise
pendingPromise.catch(function(error){
    console.log("Inside catch ka callback i.e, fcb")
    console.log(error);
    console.log(pendingPromise);
});

console.log("hi");
console.log("hllo");
console.log("how are u??");
