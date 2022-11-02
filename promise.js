function getSumNum(a, b) {
    return new Promise((resolve, reject) => {
      const sum = a + b;
      if(sum <= 5){
        resolve(sum)
      } else {
        reject(new Error('Oops!.. Number must be less than 5'))
      }
    });
  }
  getSumNum(1, 3).then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log("----you are not understanding ")
  })



// let promise = new Promise(function(resolve, reject) {
//     var a=5;
//     setTimeout(()=> {
//         if (a>10) {
//             resolve(console.log({msg: 'It works', data: 'some data'}));
//         } else {
//             reject(console.log({msg: 'It does not work'}));
//         }
//     }, 2000);
// });

// let promise = new Promise(function(resolve, reject) {
//     setTimeout(() => resolve({msg: 'To do some more job'}), 1000);
// });

// promise.then(function(result) {
//     return {data: 'some data'};
// });

// promise.then(function(result) {
//     return {data: 'some other data'};
// });

// promise.then(function(result) {
//     return {data: 'some more data'};
// });