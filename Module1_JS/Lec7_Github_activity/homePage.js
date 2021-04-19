const request= require("request");
const cheerio= require("cheerio");
const fs= require("fs");
const getAllTopics=require("./allTopics");

request("https://github.com/topics",cb);

function cb(error,response,data){
    parseData(data);
}

function parseData(html){
    let ch=cheerio.load(html);

    let allATags=ch('.topic-box a');
    for(let i=0;i<allATags.length;i++){
        let aTag=allATags[i+""];
        let link=ch(aTag).attr("href");
        let completeLink="https://www.github.com"+link;

        getAllTopics(completeLink);
    }
}
