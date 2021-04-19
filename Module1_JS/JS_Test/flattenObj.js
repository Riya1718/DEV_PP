let obj = {
    newObj: {
      obj2: {
        obj5: {
          one: 1,
        },
      },
    },
    obj3: {
      obj4: { two: 2 },
    },
};


let flatObj={};

function flatttenObj(obj,flatObj,keyTillNow){
for(key in obj){
    if(typeof obj[key]=="object"){
      keyTillNow=keyTillNow+key+".";
      flatttenObj(obj[key],flatObj,keyTillNow);
    }
    else{
       keyTillNow=keyTillNow+key;
        flatObj[keyTillNow] =obj[key]
    }
 }
}

flatttenObj(obj,flatObj,"");
console.log(flatObj);

