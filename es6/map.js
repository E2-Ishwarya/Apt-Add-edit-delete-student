let coordinates = [
    {  
      'name' : 'coordinate_1',
      'x' : 12,
      'y' : 123
    },
    {
      'name' : 'coordinate_2',
      'x' : 134,
      'y' : 52
    },
    {
      'name' : 'coordinate_3',
      'x' : 34,
      'y' : 52
    }
  ];
  let coordinate_names = [];
   for (let i = 0; i < coordinates.length; i++) {
        coordinate_names.push(coordinates[i].name);
   }
console.log(coordinate_names);
//
let coordinate_names1 = coordinates.map(coordinate => {
    return coordinate.name;
});
console.log("using map",coordinate_names1);
//
let coordinate_names2 = coordinates.map((coordinate,index) => {
    return coordinate.name + ""+ index;
});
console.log(coordinate_names2); 