const Animal = require('./javaScriptClass')
class Dog extends Animal{

    breed = "Labrador";

    constructor(name,age){
    super(name,age);
    }
}

let dog = new Dog("Moti",6);
dog.fullDetails();
console.log(dog.breed);