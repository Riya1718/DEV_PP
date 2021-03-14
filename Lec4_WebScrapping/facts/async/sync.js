const fs=require("fs");

console.log("start");

let f1Data = fs.readFileSync("./f1.txt");
console.log(f1Data+"");
// sync function m kami => bht wait krna pdta h kuki jb tk iska kaam complete ni hoga tbtk hm aage k kaam ni kr skte
//like isme phk=le f1Data hi print hoga chahe jitna tym le vo uske baad hi end print hoga

console.log("end");
