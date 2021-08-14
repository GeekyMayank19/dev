let fs = require('fs')
console.log("Before");
fs.readFile("f1.txt",cb);
function cb(error, content){
    console.log("content"+content);
    fs.readFile("f2.txt",cb2);
}
function cb2(error, content){
    console.log("content"+content);
    fs.readFile("f3.txt",cb3);
}
function cb3(error, content){
    console.log("content"+content)
}