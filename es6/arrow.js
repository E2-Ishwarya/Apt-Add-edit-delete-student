
var array = [1, 2, 3, 4]

const sum = (acc, value) => acc + value
const product = (acc, value) => acc * value

var sumOfArrayElements = array.reduce(sum)
console.log(sumOfArrayElements);

var productOfArrayElements = array.reduce(product)
console.log(productOfArrayElements)


var array = [1, 2, 3, 4]

var sumOfArrayElements = array.reduce((acc, value) => acc + value)
console.log(sumOfArrayElements);
var productOfArrayElements = array.reduce((acc, value) => acc * value)
console.log(productOfArrayElements)