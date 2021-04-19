const puppeteer = require("puppeteer");
const id = "gufyaciyde@biyac.com";
const pw = "123456";

let challenges = require("./challenges");

(async function(){
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
      });
    let allPages = await browser.pages();
    let tab = allPages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1", id);
    await tab.type("#input-2", pw);
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]');
    await tab.click('div[data-analytics="NavBarProfileDropDown"]');
    await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]');
    await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]');
    // delay
    await tab.waitForTimeout(5000);
    await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav a');
    let bothATags=await tab.$$('.nav-tabs.nav.admin-tabbed-nav a');
    let manageChallengeTag=bothATags[1];
    await manageChallengeTag.click();
    await tab.waitForSelector(".btn.btn-green.backbone.pull-right");
    let createChallengeBtn=await tab.$(".btn.btn-green.backbone.pull-right");

    let createChallengeLink=await tab.evaluate(function(elem){
        return elem.getAttribute("href");
    },createChallengeBtn);

    createChallengeLink = 'https://www.hackerrank.com'+createChallengeLink;
    
     // simultaenously open tabs for all the challenges
    for(let i=0 ; i<challenges.length ; i++){
        addChallenge(challenges[i] , browser , createChallengeLink );
        await tab.waitForTimeout(3000);
    }
    
    // OR

    // add challenges one by one
    // for(let i=0 ; i<challenges.length ; i++){
    //     // add a single challenge
    //     await addChallenge(challenges[i] , browser , createChallengeLink );
    // }
   // await addChallenge(challenges[0], browser, createChallengeLink);
   
})();

//by default returns a pending promise
async function addChallenge(challenge , browser , createChallengeLink){
    let challengeName = challenge["Challenge Name"];
    let description = challenge["Description"];
    let probStatement = challenge["Problem Statement"];
    let inputFormat = challenge["Input Format"];
    let constraints = challenge["Constraints"];
    let outputFormat = challenge["Output Format"];
    let tags = challenge["Tags"];

    let newTab=await browser.newPage();
    await newTab.goto(createChallengeLink);
    
    await newTab.waitForSelector('#name' , {visible:true});
    await newTab.type('#name' , challengeName );
    await newTab.type('#preview' , description);
    await newTab.type('#problem_statement-container .CodeMirror textarea' , probStatement );
    await newTab.type('#input_format-container .CodeMirror textarea' , inputFormat);
    await newTab.type('#constraints-container .CodeMirror textarea' , constraints);
    await newTab.type('#output_format-container .CodeMirror textarea' , outputFormat);
    await newTab.type('#tags_tag' , tags);
    await newTab.keyboard.press("Enter");
    await newTab.click('.save-challenge.btn.btn-green');

    await newTab.close();
}