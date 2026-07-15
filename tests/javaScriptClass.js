module.exports=class Animal{

    breed ="husky";

    constructor(name,age){

        this.name =name;
        this.age =age;
    }

    fullDetails(){

        console.log(this.name+this.age);
    }
}