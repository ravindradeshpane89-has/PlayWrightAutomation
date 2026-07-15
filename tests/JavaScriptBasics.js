//Object: collection of properties
//creation of object
const Animal = require('./JavaScriptClass')
let person = {

    firstName:'Ravi',
    lastName:'Deshpande'
}
let animal = new Animal("Jerry",6);
console.log(animal.breed);
animal.fullDetails();

