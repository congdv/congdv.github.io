---
date: '2018-04-20 15:41 +0700'
layout: article
published: true
title: JavaScript Note
tag: notes
---
# Javascript Note

Print out some thing	
``` console.log("Hello world!") ```

**Data type**
constant data variable:
``` const data = 0 ```
Use let keyword to initialize a variable:
``` let varA = 5 ```

**Interpolation String**
```
let name = "An"
console.log(`Hello ${An}`);
```

** Comments**
Like comments on C/C++, 
// and /* */

** Use === to compare **

## Function
**normal function and expression function**
``` 
function thisIsFunction(parameter) {
	// Pass anythings you want
}
```
Expression function like a variable assign to a function
```
const exFunction = (parameter) => {
	// Pass anythings you want
}
```
Also, you can make expression like inline function
```
const exVal = parameter => parameter * 10;
```

## Array
Initalize an array

```
let array = ["This","is","String"];
```
list items in array like other language

## [Iterators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Iteration_methods)
Iterators is used when a task occurs frequently.

The value return is an array.
- forEach() // to list element
- map() // for change value of array
- filter() // filter

## Object

Use a variable to store a data by key and value
```
let person = {
age:20,
name: "congdv"
};
// Access the avalue
console.log(person.age)
console.log(person[name])
// add new key into object
person['hobbies'] = ['reading','cycling'];
```
Inside the object we can write a function in a object
```
let person = {
sayHello: () =>{
	return "Hello";
},
sayGoodbye(){
	return "Goodbye";
}
```
If the function use any key in object, just add keyword `this.key`

Setter and getter in Object
```
let person = {
	age: 20;
    set changeAge(ageValue){
    	if(typeof ageValue == 'number'){
        	this.age = ageValue;
        }
    }
    get getAge(){
    	return this.age;
    }
}
// Assign value
person.changeAge = 90;
```
Objects store key-value pairs and represent the real-world things in Javascript.

`this` helps us with scope inside of object methods

## Classes
Class is a template of objects

The `extends` to create a subclass.

`static` method in class but not in instance of class.
```
class HospitalEmployee {
  constructor(name) {
    this._name = name;
    this._remainingVacationDays = 20;
  }
  
  get name() {
    return this._name;
  }
  
  get remainingVacationDays() {
    return this._remainingVacationDays;
  }
  
  takeVacationDays(daysOff) {
    this._remainingVacationDays -= daysOff;
  }
  static generatePassword(){
    return Math.floor(Math.random()*10000);
  }
}

class Nurse extends HospitalEmployee {
  constructor(name, certifications) {
    super(name);
    this._certifications = certifications;
  } 
  
  get certifications() {
    return this._certifications;
  }
  
  addCertification(newCertification) {
    this.certifications.push(newCertification);
  }
}

const nurseOlynyk = new Nurse('Olynyk', ['Trauma','Pediatrics']);
nurseOlynyk.takeVacationDays(5);
console.log(nurseOlynyk.remainingVacationDays);
nurseOlynyk.addCertification('Genetics');
console.log(nurseOlynyk.certifications);
```
## Javascript and browser

Almost browser support Javascript ES5(EcmacScript 5), The newest version JS is ES6.

The different between ES5 and ES6 is OOP, from ES6, JS have OOP. That is why many framework and library are born to speed up coding in JS.

So, because advantage points of ES6, The tool to convert from ES6 to ES5 is used, that is babel.

So, We need a program to manage all package and library and npm is built to solve that problem.

Wellcom npm to the hell world.

