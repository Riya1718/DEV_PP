let number=45;

function getBinary(number){
    var binary = "";
    var temp = number;
 
    while(temp > 0){
        if(temp % 2 == 0){
            binary = "0" + binary;
        }
        else {
            binary = "1" + binary;
        }

        temp = Math.floor(temp / 2);
    }

   console.log(binary);
}
getBinary(numberlet arr = [1, 2, 3, 4];

    function f(arr) {
        for (x in arr) {
            arr[x] = 0
        }
        return arr;
    }
    
    console.log(arr);
    
    console.log(f(arr));
    
    console.log(arr););
