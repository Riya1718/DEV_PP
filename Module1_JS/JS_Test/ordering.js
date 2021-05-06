
setTimeout(function () {
  console.log(4);
});
setTimeout(function () {
  console.log(5);
});

let p = new Promise(function (resolve, reject) {
  resolve();
});

console.log(1);

p.then(function () {
  console.log(2);
});

p.then(function () {
  console.log(3);
});

setTimeout(function () {
  console.log(6);
});

// console.log(1);

// setTimeout(function () {
//   console.log(3);
// });

// console.log(4);

// setTimeout(function () {
//   console.log(2);
// });

// Promise.resolve().then(function () {
//   console.log(5);
// });

// console.log(6);
