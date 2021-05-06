var student1 ={ 
    name : "Manish",
    company : "Gfg"
  
    }
  
    var student2 = JSON.parse(JSON.stringify(student1))
  
    student1.name = "Rakesh"
  
    console.log("student 1 name is",student1.name)
    console.log("student 2 name is ",student2.name);