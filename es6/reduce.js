let numbers = [1, 2, 3];
let sum = numbers.reduce(function (previousValue, currentValue) {
    return previousValue + currentValue;
});

console.log(sum);

const message = ["JavaScript ", "is ", "fun."];

function joinStrings(accumulator, currentValue) {
  return accumulator + currentValue;
}
let joinedString = message.reduce(joinStrings);
console.log(joinedString);
