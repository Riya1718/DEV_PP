const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");


let leaderBoard=[]
let count=0;


function getMatch(link){
    console.log("Sending Request!!!");
    count++;
    request(link , cb);
}

// request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard" , cb);

function cb(error,response,data){
    console.log("Recieving Request!!!");
    count--;
    parseData(data);

    if(count==0){
        console.table(leaderBoard);
    }
}

function parseData(html){
    // it is html of a single match !!!!
    let ch = cheerio.load(html);
    let bothInnings = ch('.match-scorecard-page .Collapsible');
    // fs.writeFileSync("./match.html" , bothInnings+"");
    for(let i=0 ; i<bothInnings.length ; i++){
        let inning = ch(bothInnings[i]);
        let teamName = inning.find("h5").text();
        teamName = teamName.split("INNINGS")[0].trim(); 
        // ["Delhi Capitals " , " (20akjsbfkja)"   ];
        console.log(teamName);

        let batsmanTable = inning.find('.table.batsman');

        let allTrs = batsmanTable.find("tbody tr");

        for(let j=0 ; j<allTrs.length-1 ; j++){
            let allTds = ch(allTrs[j]).find("td");
            if(allTds.length > 1){
                // valid tds
                let batsmanName = ch(allTds['0']).text().trim();
                let runs = ch(allTds['2']).text().trim();
                let balls = ch(allTds['3']).text().trim();
                let fours = ch(allTds['5']).text().trim();
                let sixes = ch(allTds['6']).text().trim();
       
                // console.log(`Name : ${batsmanName} Runs : ${runs} Balls : ${balls} Fours : ${fours} Sixes : ${sixes} StrikeRate : ${strikeRate}`)
                processLeaderboard(teamName , batsmanName , runs , balls , fours , sixes);
            }
        }
        console.log("##########################################");
    }

}

function processLeaderboard(teamName , batsmanName , runs , balls , fours , sixes){
    runs=Number(runs);
    balls=Number(balls);
    fours=Number(fours);
    sixes=Number(sixes);

    if(leaderBoard.length){
        //leaderBoard has atleast one object 
        for(let i=0 ; i<leaderBoard.length ; i++){
            let obj = leaderBoard[i];

            if(obj.Batsman==batsmanName && obj.Team == teamName){
                 obj.Runs += runs;
                 obj.Balls += balls;
                 obj.Fours += fours;
                 obj.Sixes += sixes;
                
                 fs.writeFileSync("./leaderboard.json",JSON.stringify(leaderBoard));
                 return;
            }
        }   
    }
    
    //leaderBoard is empty or new batsman data
    let obj = {
        Team : teamName,
        Batsman : batsmanName,
        Runs : runs,
        Balls : balls,
        Fours : fours,
        Sixes : sixes
    }
    leaderBoard.push(obj);
}


// when working with json file
// function processLeaderboard(teamName , batsmanName , runs , balls , fours , sixes){
//         let leaderBoard = JSON.parse(fs.readFileSync("./leaderboard.json"));
//         runs=Number(runs);
//         balls=Number(balls);
//         fours=Number(fours);
//         sixes=Number(sixes);

//         if(leaderBoard.length){
//             //leaderBoard has atleast one object 
//             for(let i=0 ; i<leaderBoard.length ; i++){
//                 let obj = leaderBoard[i];

//                 if(obj.Batsman==batsmanName && obj.Team == teamName){
//                      obj.Runs += runs;
//                      obj.Balls += balls;
//                      obj.Fours += fours;
//                      obj.Sixes += sixes;
                    
//                      fs.writeFileSync("./leaderboard.json",JSON.stringify(leaderBoard));
//                      return;
//                 }
//             }   
//         }
        
//         //leaderBoard is empty or new batsman data
//         let obj = {
//             Team : teamName,
//             Batsman : batsmanName,
//             Runs : runs,
//             Balls : balls,
//             Fours : fours,
//             Sixes : sixes
//         }
//         leaderBoard.push(obj);
//         fs.writeFileSync("./leaderboard.json",JSON.stringify(leaderBoard));
//     }


module.exports = getMatch;
