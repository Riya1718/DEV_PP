const puppeteer = require("puppeteer");
const id="gufyaciyde@biyac.com";
const pwd="123456";
let tab;
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
    console.log("logged in HackerRank!!");
})
.catch(function(error){
    console.log(error);
});