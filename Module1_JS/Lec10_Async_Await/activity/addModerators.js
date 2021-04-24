const puppeteer = require("puppeteer");
const id = "gufyaciyde@biyac.com";
const pw = "123456";

// const id = "bexinav211@astarmax.com";
// const pw = "123456789";

let tab;

let challenges = require("./challenges");

(async function(){
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
      });
    let allPages = await browser.pages();
    tab = allPages[0];
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

    await addModerators(browser,tab);
    
})();

async function addModerators(browser,tab){
    await tab.waitForSelector('.backbone.block-center');
    let challengesTag=await tab.$$('.backbone.block-center');
   
    let allChallengeLinks=[];
    for(let i=0;i<challengesTag.length;i++){
        let oneChallengeTag=challengesTag[i];

        let challengeLink=await tab.evaluate(function(elem){
            return elem.getAttribute("href");
        }, oneChallengeTag);
        allChallengeLinks.push(challengeLink);
    }

       let completeChallengeLink=allChallengeLinks.map(function(link){
           return 'https://www.hackerrank.com'+link;
       })
        
       let allModAddPromise=[];
       for(let i=0;i<completeChallengeLink.length;i++){
        let modAddPromise=addModeratorToAQues(browser,completeChallengeLink[i]);
        allModAddPromise.push(modAddPromise);
       }
       await Promise.all(allModAddPromise); // wait for all the moderator to be added to all questions

    //if next button is not disabled then click on it
    let allLis=await tab.$$('.pagination li');
    let nextBtnLi=allLis[allLis.length-2];
    let isDisabled = await tab.evaluate(function(elem){
       return elem.classList.contains("disabled");
    },nextBtnLi)
    
    if(isDisabled){
          return;

    }else{
          await nextBtnLi.click();
          await addModerators(browser,tab);
    }
}

async function addModeratorToAQues(browser,challengeLink){
    let newTab=await browser.newPage();
    await newTab.goto(challengeLink);

    await newTab.waitForSelector('li[data-tab="moderators"]');
    await newTab.waitForTimeout(3000);
    await newTab.click('li[data-tab="moderators"]');

    await newTab.waitForSelector('#moderator');
    await newTab.type('#moderator',"Riya");

    await newTab.click('.btn.moderator-save');
    await newTab.click('.save-challenge.btn.btn-green');

    await newTab.close();
}