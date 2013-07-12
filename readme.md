###Javascript "Good Parts" Notes
Logic is a bit different: `0==[0]` evaluates to `true` but `0===[0]` evaluates to `false`, `===` is a strict comparison operator that doesn't have unexpected results.
In javascript everything is an Object or a primitive
```javascript
//object example: a 'person' object with 'name' and 'profession' properties
var person = {name:"Bob", profession:"Web Developer"}
```
In this example `person.name` returns the String `"Bob"` and `person.profession` returns the String `"Web Developer"`.  New object properties can be added through assigning them values: `person.programmingLanguage = "JavaScript"` and deleted with `delete person.profession`

First-class functions: can store functions in variables or pass as arguments
```javascript
var currentDate = function(){
	return new Date();
}
```
Functions are also objects that can have properties
```javascript
currentDate.description = "Returns current date";
```
Functions are evaluated using the invocator `()`: calling `currentDate` will return the function, calling `currentDate()` will evaluate the returned function.

Function's variables are only visible to the code inside the function and other functions inside the function

Object properties can be set to functions
```javascript
var schedule = {};
schedule.currentDate = function(){
	return new Date();
}
```
When an object's property is a function it's called a method.  When functions are methods the variable `this` represents to the object containing the method.
```javascript
var schedule = {};
schedule.setDate = function(){
	this.date = new Date();
}
```
When functions are not methods `this` represents the global scope.  This is true even if a function is inside a method. In the next example `day` will be `"Tuesday"` but `schedule.day` will be `undefined`:
```javascript
var day = "Monday"
schedule.setWeekday = function(){
	var setDay = function(){this.day = "Tuesday"}
	setDay();
}
```
If we take the function out of the method: `var setDate = schedule.setDate` and invoke it `setDate()` outside `schedule` then the `this.date = new Date()` code in the body of `setDate` will also crate a global `date` variable, since in this case `this` is now global again.

Functions can be used to clone other objects.  If we define a function `var Foo = function(){}` and do `var foo = new Foo()` then javascript will do the following:
1. Use Foo's property `prototype` to set `foo`: `foo = Foo.prototype`
2. bind `this` to the `foo` object and invoke the `Foo` function

So if `Foo.prototype = {day1:"monday"}` and `Foo = function(){this.day2:"tuesday"}` then when we do `var foo = new Foo()` the result is that `foo` becomes `{day1:"monday",day2:"tuesday"}`.  On the other hand doing `var foo = Foo()` without new makes `foo` be `undefined`, as it's the result returned by `Foo()` after it successfully created a global `day2` variable and set it to `tuesday`.  Functions that are expected to be used only with `new` are capitalized to remind us that we should use `new`.  Douglas Crockford has a better solution: create a new method on the Object that take an object as an argument and returns a clone of it:
```javascript
if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}
newObject = Object.create(oldObject);
```
It's best to create meaningful object with properties and methods that let us keep our code and data organized, maintainable, easy to debug, and less prone to unexpected javascript behavior.
