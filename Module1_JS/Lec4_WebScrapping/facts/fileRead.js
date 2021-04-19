const fs=require("fs");
const cheerio=require("cheerio");
//cheerio is a module used for getting elements on the bases of selectors from html files

let htmlKaData = fs.readFileSync("./index.html");
//htmlKaData => html treat ho

let ch = cheerio.load(htmlKaData);
//ch => object type

//console.log(ch);

// let pTag = ch(".main");
// //It will give Ptag on object form
// console.log(pTag);

let pData= ch(".main");

//It will give P ka data 
console.log(pData.text());

let pTags = ch("p");

//It will give data of all p tags
console.log(pTags.text());

//jb hm nested m kaam krenge to hme cheerio ka function 'ch' add krna pdega
//it will give data of 2nd p tag(indexing starts from 0)
console.log(ch(pTags['1']).text());








