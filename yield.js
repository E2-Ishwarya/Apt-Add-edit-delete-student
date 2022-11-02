function* showPrices(i) {
	while (i < 3) {
		yield i++;
	}
}
const gfg = showPrices(0);
console.log(gfg.next());
console.log(gfg.next().value);
console.log(gfg.next().value);
console.log(gfg.next());

// function* forever() {
//     let index = 0;
//     while (true) {
//         yield index++;
//     }
// }
// let f = forever();
// console.log(f.next());
// console.log(f.next()); 
// console.log(f.next()); 


// function * iterableObj() {
//     yield 'Hello';
//     yield 'World';
//     yield 'Its me'
//   }
  
//   for (const val of iterableObj()) {
//     console.log(val);
//   }

  function* infinite_values(start){
    let current = start;
  
    while(true){
      yield current=current+1;
    }
  }
  for (const val1 of infinite_values(1)) {
    console.log(val1);
  }