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
