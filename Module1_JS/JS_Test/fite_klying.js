let input="kite flying";

let splitInput=input.split(" ");

let firstCharOfFirstWord = splitInput[0][0];
let firstCharOfSecondWord = splitInput[1][0];

let result = firstCharOfSecondWord + splitInput[0].slice(1)+" "+firstCharOfFirstWord+splitInput[1].slice(1);

console.log(result);
