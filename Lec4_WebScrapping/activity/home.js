const request = require("request");
const cheerio = require("cheerio");

let url = "https://www.espncricinfo.com/series/ipl-2021-1249214";
let lastBallCommentary = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";
let highestWicketTaker = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard"

//request(url,cb);
request(lastBallCommentary,cb);

// function cb(error , response , body){
//      console.log(body);
// }

function cb(error,response,body){
    parseBody(body);
}

// function parseBody(html){
//     //here i will get html of ipl home page..
//     let ch = cheerio.load(html);
//     let aTagKaData=ch('a[data-hover="View All Fixtures"]');
//     console.log(aTagKaData.text());
// }

//last ball commentary
function parseBody(html){
    //here i will get html of ipl home page..
    let ch = cheerio.load(html);
    let pTagKaData=ch('div[itemprop="articleBody"]>p');
    console.log(ch(pTagKaData['0']).text());
}