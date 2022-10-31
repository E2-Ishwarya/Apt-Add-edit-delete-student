var h;
var  w;
class Polygon { 
    constructor(height, width) { 
     h = height; 
     w = width;
    //    this.h = height; 
    //    this.w = width;
    } 
    test() { 
       console.log("The height of the polygon: ",h) 
       console.log("The width of the polygon: ",w) 
    } 
 } 

 var polyObj = new Polygon(10,20); 
 polyObj.test();   