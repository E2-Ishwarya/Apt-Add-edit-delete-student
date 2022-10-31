
function getPersionES5( name, age, height ) {
    return {
      name: name,
      age: age,
      height: height
    };
  }
  const ans1 = getPersionES5( 'Zachary', 23, 195 )
  console.log(ans1)
  function getPersionES6( name, age, height ) {
    return {
      name,
      age,
      height
    };
  }
  const ans2 =getPersionES6( 'Zachary', 23, 195 )
  console.log(ans2)
////
  function exampleOfDefiningPropertiesWithMethods(){    
    let firstName = "Jin Vincent",  
        lastName = "Necesario",  
        gender = "M"
        age = 38;  
  
    let customer =  {   firstName,   
                        lastName,  
                        gender,  
                        age,   
                        getCustomerInfo(){  
                            //getCustomerInfo: function() {
                            return this.lastName + " " + this.firstName;  
                        }  
                    };  
    console.log(customer);  
    console.log(customer.getCustomerInfo());  
}  
  
exampleOfDefiningPropertiesWithMethods();


const varName1 = 'firstName';
const person1 = {
  [ varName1 ] : 'John',
  lastName: 'Smith'
};
console.log( person1.firstName );

const varName = 'first';
function computeNameType( type ) {
  return type + 'Name';
}

const person = {
  [ varName + 'Name' ] : 'John',
  [ computeNameType( 'last' ) ]: 'Smith'
};

console.log( person.firstName );
console.log( person.lastName ); 

const PI = 3.1415;
const INCHES_TO_FEET = 0.083333;
const exportObject = {
 PI,
 INCHES_TO_FEET,
 sum( n1, n2 ) {
   return n1 + n2;
 },
 subtract( n1, n2 ) {
   return n1 - n2;
 }
};
console.log( exportObject );
console.log( exportObject.sum(3,4) );
console.log( exportObject.subtract(10,5));