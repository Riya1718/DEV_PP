try {
    let a = null;
  
    b = a;
  
    delete a;
  
    b = undefined;
  
    console.log(a);
    console.log(b);
    console.log(c);
  } catch (err) {
    console.log(err.message);
  }
  