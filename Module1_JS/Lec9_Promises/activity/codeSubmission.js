const puppeteer = require("puppeteer");
const id="gufyaciyde@biyac.com";
const pwd="123456";
let tab;
let idx;
let gCode;
//all function of puppeter are promisifoed => gives you a pending promise initially

let browserOpenPromise = puppeteer.launch({headless:false, defaultViewport: null,
    args: ["--start-maximized"]});
//opens a new browser instance
//by default launch headless hota h mtlb hme browser show ni hota islye use false krdia
//defaultViewport null krdia mtlb puppeter ne kch apna size define kr rkha tha use jo hme nhi chaiye
//args maximize mtlb window maximize aaegi isse

browserOpenPromise.then(function(browser){
   console.log("browser opened!!");
   
   let allPagePromise = browser.pages();
   return allPagePromise;
})
.then(function(pages){
    tab=pages[0];

    let pageOpenPromise = tab.goto("https://www.hackerrank.com/auth/login");
    return pageOpenPromise;
})
.then(function(){
    let idTypePromise=tab.type("#input-1",id)
    return idTypePromise;
})
.then(function(){
    let pwdTypePromise=tab.type("#input-2",pwd)
    return pwdTypePromise;
})
.then(function(){
    let loginPromise=tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled")
    return loginPromise;
})
.then(function(){
   let waitAndClickPromise = waitAndClick("#base-card-1-link");   //wait krna pdega kuki use new dom p jane m thda tym lgta h
   return waitAndClickPromise;  
})
.then(function(){
   let waitAndClickPromise = waitAndClick('a[data-attr1="warmup"]');
   return waitAndClickPromise;
})
.then(function(){
    let waitPromise = tab.waitForSelector(".js-track-click.challenge-list-item",
    { visible: true });
    return waitPromise;
})
.then(function(){
    let allQuesATagsPromise = tab.$$(".js-track-click.challenge-list-item");
    return allQuesATagsPromise;
})
.then(function(allQuesATags){
     //[ {} , {} , {} , {} ]  =>[ <a href="laksnfkjasf"/> , <a href="akjsbfua" /> , <a href="alshifia" /> , <a href="akjjsbfa" /> ];
    // pendingPromise = tab.Akjsfnakjbsf(aTag)  => aTag.getAttribute("href"); => value
    let allLinksPromise=[];

    for(let i=0;i<allQuesATags.length;i++){
        let aTag=allQuesATags[i];

        let linkPromise=tab.evaluate(function(elem){
            return elem.getAttribute('href');
        },aTag);

        allLinksPromise.push(linkPromise);
    }
    // allLinksPromise = [ Promise<link> , Promise<link> , Promise<link> , Promise<link> ];
    let sbkaPromise = Promise.all(allLinksPromise);
    // return Promise<Pending>
    return sbkaPromise; //Promise<Pending> => Promise<[link , link , link , link]>
})
.then(function(allLinks){
    let completeLinks=allLinks.map(function(link){
        return "https://www.hackerrank.com"+link;
    });
    let oneQuesSolvePromise=solveQuestion(completeLinks[0]);

    for(let i=1;i<oneQuesSolvePromise.length;i++){
        oneQuesSolvePromise=oneQuesSolvePromise.then(function(){
            let nextQuesSolvePromise=solveQuestion(completeLinks[i]);
            return nextQuesSolvePromise;
        })
    }
    return oneQuesSolvePromise;
})
.then(function(){
    console.log("All ques solved successfully");
})
.catch(function(error){
    console.log(error);
});

//hmne yha khudka promisified function bnaya h
function waitAndClick(selector){
    return new Promise(function( resolve , reject){
        let waitPromise = tab.waitForSelector(selector , {visible:true});
        waitPromise.then(function(){
            let clickPromise = tab.click(selector);
            return clickPromise;
        })
        .then(function(){ 
            //wait and click successfully done
            resolve();
        })
        .catch(function(error){
            reject(error);
        })
    
    })
}

function getCode(){
    return new Promise(function(resolve,reject){
        let waitPromise=tab.waitForSelector('.hackdown-content h3');
        waitPromise.then(function(){
            let allCodesNameElementsPromise=tab.$$('.hackdown-content h3');
            return allCodesNameElementsPromise;
        })
        .then(function(allCodesNameElements){
            let allCodesNamePromise =[];

            for(let i=0;i<allCodesNameElements.length;i++){
                let codeNameElement=allCodesNameElements[i];

                let codeNamePromise=tab.evaluate(function(elem){
                    return elem.textContent;},codeNameElement);

                allCodesNamePromise.push(codeNamePromise);
            }
             // allCodeNamesPromise = [  Promise<Pending> , Promise<Pending> , Promise<Pending> ];
            let sbkaPromise = Promise.all(allCodesNamePromise);
            return sbkaPromise; //Prmose<Pending> => Promise<["C++" , "Python" , "Java"]>
        })
        .then(function(codeNames){
              //["C++" , "Python" , "Java"];
              for(let i=0;i<codeNames.length;i++){
                  if(codeNames[i]=='C++'){
                      idx=i;
                      break;
                  }
              }
              let allCodeDivPromise=tab.$$('.hackdown-content .highlight');
              return allCodeDivPromise;
        })
        .then(function(allCodeDivs){
             //[ <div></div> , <div></div> , <div></div> ];
             let codeDiv=allCodeDivs[idx];
             let codePromise=tab.evaluate(function(elem){
                 return elem.textContent;
                },codeDiv);
            return codePromise;
        })
        .then(function(code){
           // console.log(code);
            gCode=code;
            resolve();
        })
        .catch(function(error){
            reject(error);
        })
    })
}

function pasteCode(){
    return new Promise(function(resolve,reject){
        let problemTabClickPromise=tab.click('div[data-attr2="Problem"]');
        problemTabClickPromise.then(function(){
            let waitAndClickPromise=waitAndClick(".custom-input-checkbox");
            return waitAndClickPromise;
        })
        .then(function(){
            let waitForTextBoxPromise=tab.waitForSelector(".custominput");
            return waitForTextBoxPromise;
        })
        .then(function(){
            let codeTypePromise=tab.type(".custominput",gCode);
            return codeTypePromise;
        })
        .then(function(){
            let controlKeyDownPromise=tab.keyboard.down("Control");
            return controlKeyDownPromise;
        })
        .then(function(){
            let aKeyPressPromise=tab.keyboard.press("A");
            return aKeyPressPromise;
        })
        .then(function(){
            let xKeyPressPromise=tab.keyboard.press("X");
            return xKeyPressPromise;
        })
        .then(function(){
            let clickOnCodeBoxPromise=tab.click(".monaco-editor.no-user-select.vs");
            return clickOnCodeBoxPromise;
        })
        .then(function(){
            let aKeyPressPromise=tab.keyboard.press("A");
            return aKeyPressPromise;
        })
        .then(function(){
            let vKeyPressPromise=tab.keyboard.press("V");
            return vKeyPressPromise;
        })
        .then(function(){
            let controlKeyUpPromise=tab.keyboard.up("Control");
            return controlKeyUpPromise;
        })
        .then(function(){
            resolve();
        })
        .then(function(error){
            reject(error);
        })
    })
}

function handleLockBtn(){
    return new Promise(function(resolve,reject){
        let waitPromise = tab.waitForSelector('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled' , {visible:true , timeout:5000});
        waitPromise.then(function(){
            let lockBtnPromise=tab.$('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled');
            return lockBtnPromise;
        })
        .then(function(lockBtn){
            let lockBtnClickPromise=lockBtn.click();
            return lockBtnClickPromise;
        })
        .then(function(){
            // clicked on lock btn
            // lock btn found
            console.log("lock btn found !!!");
            resolve();
          })
          .catch(function(error){
              //lock btn not found
              console.log("lock btn not found !!!");
              resolve();
          })
    })
}
function solveQuestion(qLink){
    return new Promise(function(resolve,reject){
      let gotoPromise=tab.goto(qLink);
      gotoPromise.then(function(){
         let waitAndClickPromise = waitAndClick('div[data-attr2="Editorial"]');
         return waitAndClickPromise;
      })
      .then(function(){
          let lockBtnPromise=handleLockBtn();
          return lockBtnPromise;
      })
      .then(function () {
        // this function will get code of c++ and set in gCode variable
        let codePromise = getCode();
        return codePromise;
      })
      .then(function(){
          // this function will pasteCode in the editor from the gCode variable
          let pastePromise=pasteCode();
          return pastePromise;
      })
      .then(function(){
          let submitClickPromise=tab.click(".pull-right.btn.btn-primary.hr-monaco-submit");
          return submitClickPromise;
      })
      .then(function(){
        resolve();
    })
    .catch(function(error){
        reject(error);
    })
 })  
}