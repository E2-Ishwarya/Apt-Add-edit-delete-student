// let text = "ABCDEFG"
// const myArr = Array.from(text);
// console.log(myArr);

var array1 = [10, 20, 30, 40, 50];
    var array2 = [60, 70, 80, 90, 100];
    var array3 = [...array2, ...array1];
   console.log(array3);

function average(...args) {
    console.log(args);
    var avg = args.reduce(function (a, b) {
            return a + b;
       }) ;
    return avg;
}
console.log("average of numbers is : "  + average(1, 2, 3, 4, 5));
console.log("average of numbers is : "+ average(1, 2, 3));