function getFirstName(fullName){
    fullname=fullName.split(" ");
    return fullname[0];
}

function getLastName(fullName){
    fullname=fullName.split(" ");
    return fullname[1];
}

function sayHi(fullName,fun){
    let name=fun(fullName);
    console.log(name);
}

sayHi("Riya Jain",getFirstName);
sayHi("Aashi Jain",getLastName);