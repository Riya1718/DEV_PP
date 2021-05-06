
function check(num1,num2){

    if(num1 % 2 ===  0 && num1 % num2 ===0){
        console.log(num1/num2); ; 
    }
    else{
        console.log("Incompatible types");
    }
}

var n1=10;
var n2=5;
check(n1,n2);
