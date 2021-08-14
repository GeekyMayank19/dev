let fs = require('fs')
console.log("Before");
fs.readFile("f1.txt",cb1);
fs.readFile("f2.txt",cb2);
fs.readFile("f3.txt",cb2);

function cb1(error, content){
    console.log("content"+content);
}
function cb2(error, content){
    console.log("content"+content);
}
function cb2(error, content){
    console.log("content"+content);
}
console.log("After");
