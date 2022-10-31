// const person = {
//     firstName: "John",
//     lastName: "Doe",
//     age: 50,
//     eyeColor: "blue"
//   };
//   const keys = Object.keys(person);
//   console.log(keys)
//   console.log(typeof(keys));
 var movie = new Map();
movie.set('name', 'If Beale Street Could Talk');
movie.set('rating', 5);
movie.set(1, 'Test to show a number can be used as a key');
console.log(movie.get('name'));
console.log(movie.get('rating')); 
console.log(movie.get(1));
console.log(movie.has('rating')); 
movie.forEach( (value, key) => console.log("map",value +key) );
for (let key of movie.keys()) {
    console.log("key",key);
  }
  for (let value of movie.values()) {
    console.log("value",value);
  }

var colors = ['red', 'green', 'blue']

function capitalize(val) {
    return val.toUpperCase()
}

var capitalizedColors = colors.map(capitalize)

console.log(capitalizedColors)

const persons = [
    {firstname : "Malcom", lastname: "Reynolds"},
    {firstname : "Kaylee", lastname: "Frye"},
    {firstname : "Jayne", lastname: "Cobb"}
  ];
  
  var person= persons.map(getFullName);
  
  function getFullName(persons) {
    return (persons.firstname+" "+persons.lastname)
  //  return [persons.firstname,persons.lastname].join(" ");
  }
  console.log(person)