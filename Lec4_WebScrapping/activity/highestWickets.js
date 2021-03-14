const request = require("request");
const cheerio = require("cheerio");


// name:"" ,
// wickets:"" ,
// economy:""

let highestWicketTaker = {};

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/kolkata-knight-riders-vs-rajasthan-royals-54th-match-1216530/full-scorecard" , cb);


function cb(error,response,body){
    parseBody(body);
}

function parseBody(html){
    let highestWicketSoFar=0;
    let nameOfHighestWicketTaker;
    let economy;

    let ch= cheerio.load(html);
    let bothBowlingTables=ch('.Collapsible .table.bowler');
    //{ '0': {}  '1':{}  }

    for(let i=0; i<bothBowlingTables.length ; i++){
        let bowlingTable = ch(bothBowlingTables[i+""]);
         let allTrs = ch(bowlingTable).find("tbody tr");
         //{ 0: tr 1: tr 2:tr 3: tr ...}

         for(let j=0;j<allTrs.length;j++){
             let allTds= ch(allTrs[j]).find("td");
             let wicketsTaken = ch(allTds['4']).text();

             if(wicketsTaken > highestWicketSoFar){
                  highestWicketSoFar=wicketsTaken;
                  nameOfHighestWicketTaker=ch(allTds['0']).text();
                  economy=ch(allTds['5']).text();
             }
         }
    }
      // 0-> name  4-> wickets  5-> economy
      
      highestWicketTaker.name=nameOfHighestWicketTaker;
      highestWicketTaker.wickets=highestWicketSoFar;
      highestWicketTaker.economy=economy;
      console.log(highestWicketTaker);
}