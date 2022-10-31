
var colors = ['red', 'green', 'blue']
function print(colors) {
  console.log(colors)
}

colors.forEach(print)

//

const arr = [1, 2, 3, 8, 7];
arr.forEach( (element,index) => {
    if(index == 2){
        console.log("hey welcome buddy");
    }
    console.log(index+"---position--"+element);
});
//
