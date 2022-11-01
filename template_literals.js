// // Without template literal   
// console.log('Without template literal \n multiline string');   
    
// // With template literal   
// console.log(`Using template literal  
// multiline string`); 

// var name = 'World';  
// var cname = 'javaTpoint';  
// console.log(`Hello, ${name}!  
// Welcome to ${cname}`);  
// var x = 10;  
// var y = 20;  
// console.log(`The product of the variables ${x} and ${y} is:  
//  ${x*y}`);  
//  function TaggedLiteral1(str) {   
//     console.log(str);   
// }   
    //TaggedLiteral1 `Hello World`;  
// let greetings = "Hi";
// let name = "Techsith";
// let age = 35;

// function transform(static, ...tags) {
//   console.log(static); // ["", " my name is ", " and I am ", ""]
//   console.log(tags); //["Hi", "Techsith", 35]
// }

// transform`${greetings} my name is ${name} and I am ${age}`;
let greetings = "Hi";
let name = "Techsith";
let age = 35;

function transform(static, ...tags) {
  console.log("static ----",static);
  console.log("targs-----",tags);
  let index = tags.findIndex((el) => el === "Techsith");
  tags[index] = "Hemil";

  let str = static[0];
  console.log(str);
  for (i = 0; i < tags.length; i++) {
    str += tags[i] + static[i + 1];
    console.log(tags[i] +"---"+ static[i + 1]);
    console.log(str);
  }
  return str;
}

let newString = transform`${greetings} my name is ${name} and I am ${age}`;

console.log(newString);

