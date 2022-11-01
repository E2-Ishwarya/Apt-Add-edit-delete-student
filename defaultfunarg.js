// function say(message='Hi') {
//     console.log(message);
// }
// say(); 
// say(undefined); 
// say('Hello'); 
// const date = new Date();
// console.log(date)
// function getInfo (name, year, color) {
//     name = (typeof year !== 'undefined') ? name : "Ishwarya";
//     year = (typeof year !== 'undefined') ? year : 2018;
//     color = (typeof color !== 'undefined') ? color : 'Blue';
//     console.log(name +" " +year+" " +color);
   
//     // remainder of the function...
//   }
//   getInfo('Chevy', 1957, 'Green');
// getInfo('Benz', 1965); // default for color is "Blue"
// getInfo();

function getCar(carId = 500, make = 'Tesla')  {
    console.log(carId + ', ' + make);
};
getCar(undefined, 'Honda');

function blueLightSpecial(price, discount = .20) {
    return price - (price * discount);
}
console.log(blueLightSpecial(1000));
function getDiscount() {
    return .20;
}

function blueLightSpecial(price, discount = getDiscount()) {
    return price - (price * discount);
}

console.log(blueLightSpecial(2000));

let getCarCost = function (price, tax = price * 0.07)  {
    console.log(price +"--"+ tax);
};
getCarCost(100000);

function addReminder(meeting, date = new Date().getTime(), length = 60, timeout = 1000) {
    let reminder = {
        meeting,
       date,
      length,
         timeout
    };
    console.log(reminder);
}

addReminder('Interview Candidate');


let text = "ABCDEFG"
const myArr = Array.from(text);
console.log(myArr);