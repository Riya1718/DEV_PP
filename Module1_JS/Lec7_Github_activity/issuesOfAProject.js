const fs=require("fs");
const request=require("request");
const cheerio=require("cheerio");

function issuesOfAProject(completeIssueLink,projectPath){
    request(completeIssueLink,function cb(error,response,data){
        parseBody(data,projectPath);
    })
}


    function parseBody(html,projectPath){
       let ch=cheerio.load(html);
       
       let issueTags=ch(".js-navigation-container.js-active-navigation-container .markdown-title");
       for(let i=0;i<issueTags.length;i++){
       let issueName=ch(issueTags[i]).text().trim();
       let issueLink=ch(issueTags[i]).attr("href");

       let completeIssueLink="https://www.github.com"+issueLink;

       if(!fs.existsSync(`${projectPath}/issues.json`)){
          fs.writeFileSync(`${projectPath}/issues.json`, JSON.stringify([]));
       }

       let issues=JSON.parse(fs.readFileSync(`${projectPath}/issues.json`));

       let newIssue={
           "Issue Name":issueName,
           "Issue Link": completeIssueLink
       }
       issues.push(newIssue);
       fs.writeFileSync(`${projectPath}/issues.json`,JSON.stringify(issues));
      }
    }
module.exports=issuesOfAProject;