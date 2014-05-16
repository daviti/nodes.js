var app = 5;
var mylib = require('./library/mylib')(app);

console.log('SUM', mylib.sum(3,5));  //this should log 8
var p = new mylib.Person('David');
console.log('P', p);  //this should log what is in the p object
console.log('starting app.js');