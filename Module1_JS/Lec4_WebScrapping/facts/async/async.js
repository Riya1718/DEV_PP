const fs=require("fs");

console.log("start");

//async function => accepts callback (mtlb jb data aata h tb vo function ko call lga dega itne hm baaki kaam kr skte h)
fs.readFile("./f1.txt" , function(error , data){
console.log(data+"");
});

// fs.readFile("./f1.txt" , cb);
// function cb(error ,data){
//     console.log(data+"");  
// }

console.log("end");