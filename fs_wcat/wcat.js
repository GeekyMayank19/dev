let fs = require('fs')
let path = require('path')
let inputArr = process.argv.slice(2);
let Content = "";
let optionArr = [];
let fileArr = [];
for(let i=0;i<inputArr.length;i++){
    if(inputArr[i].charAt(0)=="-"){
        optionArr.push(inputArr[i])
    }else{
        fileArr.push(inputArr[i]);
    }
}

for(let i = 0;i<fileArr.length;i++){
    if(fs.existsSync(fileArr[i])==false){
        console.log("File doesn't exit");
        return;
    }
}
for(let i=0;i<fileArr.length;i++){
    Content = Content+fs.readFileSync(fileArr[i])+"\r\n";
}

Content=Content.split("\r\n");
let isPresentS = optionArr.includes("-s");
if(isPresentS){
    var i = 0;
    while (i < Content.length) {
      if (Content[i] === '') {
        Content.splice(i, 1);
      } else {
        ++i;
      }
    }
    Content.join("\n");
}

let isPresentN = optionArr.includes("-n");
if(isPresentN){
    let n=1;
    for(let i=0;i<Content.length;i++){
        if(Content[i]!=''){
            Content[i]=n+" " +Content[i];
            n++;
        }
        
    }
}
let isPresentB = optionArr.includes("-b");
if(isPresentB){
    for(let i=0;i<Content.length;i++){
        Content[i]=i+1+" "+Content[i];
    }
}

console.log(Content.join("\r\n"));

