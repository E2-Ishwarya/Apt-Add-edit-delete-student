var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var result = numbers.filter(number => number > 5);
console.log(result);

var words = ["hi", "hello", "hey", "apple", "watermelon",
			"lemon", "javascript"];
var result = words.filter(word => word.length > 5);
console.log(result);

var jsonarr = [
	{
		id: 1,
		name: "joe"
	},
	{
		id: -19,
		name: "john"
	},
	{
		id: 20,
		name: "james"
	},
	{
		id: 25,
		name: "jack"
	},
	{
		id: -10,
		name: "joseph"
	},
	{
		id: "not a number",
		name: "jimmy"
	},
	{
		id: null,
		name: "jeff"
	},
]

var result = jsonarr.filter(user => user.id > 0);

console.log(result);

