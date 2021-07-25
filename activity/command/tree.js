let fs = require("fs")
let path = require("path")
function treefn(src){
    let noOfFile = fs.readdirSync(src);
    for(let i=0;i<noOfFile.length;i++){
        let fileName = noOfFile[i];
        console.log("-->",fileName)
    }
}
module.exports={
   treefxn: treefn
}
