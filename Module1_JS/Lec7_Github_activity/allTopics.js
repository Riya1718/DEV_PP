const fs=require("fs");
const request=require("request");
const cheerio=require("cheerio");
const getIssues=require("./issuesOfAProject");

function getAllTopics(topicLink){
    request(topicLink, parseTopic)
}

function parseTopic(error,response,data){
    let ch=cheerio.load(data);

    let topicName=ch(".h1-mktg").text().trim();
    if(!fs.existsSync(`./${topicName}`)){
        fs.mkdirSync(`./${topicName}`);
    }
    let allArticleTags=ch(".border.rounded.color-shadow-small.color-bg-secondary.my-4");
    for(let i=0;i<5;i++){
        workOnSingleProject(allArticleTags[i],topicName);
      
    }
}

function workOnSingleProject(allArticleTags,topicName){
    let projectName=cheerio(allArticleTags).find("a.text-bold").text().trim();
    let navLink=cheerio(allArticleTags).find(".tabnav-tabs a");
    let issueLink=cheerio(navLink["1"]).attr("href");
    let completeIssueLink = "https://www.github.com"+issueLink;
  //  console.log(`Project Name: ${projectName}  issueLink: ${completeIssueLink}`)

    let projectPath=`${topicName}/${projectName}`;
    if(!fs.existsSync(projectPath)){
        fs.mkdirSync(projectPath);
    }
    getIssues(completeIssueLink,projectPath);
}

module.exports = getAllTopics;