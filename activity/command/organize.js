let fs = require("fs")
let path = require("path")

// //path of file to be copied 
// let srcFilePath = "C:\\Users\\Mayank\\Desktop\\pepCoding\\dev\\Module_1_FS\\dir\\abc.txt"
// // path of destination folder
// let desdir = "C:\\Users\\Mayank\\Desktop\\pepCoding\\dev\\Module_1_FS\\fs_organisation"
// // name of file to be copied 
// let toBeCopiedFileName = path.basename(srcFilePath);
// console.log(toBeCopiedFileName);
// // path of destination folder join with name 
// let desFilePath = path.join(desdir,toBeCopiedFileName);
// console.log(desFilePath);
// fs.copyFileSync(srcFilePath,desFilePath);

function orgfn(src){
    // console.log("tree command exicuted with path"+src);
    let orgFilePath = path.join(src,"organisedFile");
    if(fs.existsSync)
    fs.mkdirSync(orgFilePath);
    let media = path.join(orgFilePath,"media")
    let archives = path.join(orgFilePath,"archives")
    let documents = path.join(orgFilePath,"documents")
    let app = path.join(orgFilePath,"app")
    fs.mkdirSync(media);
    fs.mkdirSync(archives);
    fs.mkdirSync(documents);
    fs.mkdirSync(app);

    let noOfFile = fs.readdirSync(src);
    for(let i=0;i<noOfFile.length;i++){
        let fileName=noOfFile[i];
        let ext = fileName.split('.');
        if(ext[1]=='mp4'|| ext[1]== 'mkv'){
            let srcFilePath = path.join(src,fileName);
            let desFilePath=path.join(media,fileName);
            fs.copyFileSync(srcFilePath,desFilePath); 
        }
        
        if(ext[1]=='zip'|| ext[1]== '7z'|| ext[1]=='rar'|| ext[1]=='tar'|| ext[1]=='ar'|| ext[1]== 'iso'|| ext[1]=='xz'){
            let srcFilePath = path.join(src,fileName);
            let desFilePath=path.join(archives,fileName);
            fs.copyFileSync(srcFilePath,desFilePath); 
        }

        if(ext[1]=='docx'|| ext[1]== 'doc'|| ext[1]=='pdf'|| ext[1]=='xlsx'|| ext[1]=='xls'|| ext[1]== 'odt'|| ext[1]=='ods'|| ext[1]== 'odp'|| ext[1]=='odg'|| ext[1]=='odf'|| ext[1]=='txt'|| ext[1]=='ps'||ext[1]== 'tex'){
            let srcFilePath = path.join(src,fileName);
            let desFilePath=path.join(documents,fileName);
            fs.copyFileSync(srcFilePath,desFilePath); 
        }
        
        
        if(ext[1]=='exe'|| ext[1]== 'dmg'|| ext[1]=='pkg'|| ext[1]=='deb'){
            let srcFilePath = path.join(src,fileName);
            let desFilePath=path.join(app,fileName);
            fs.copyFileSync(srcFilePath,desFilePath); 
        }
       
        
    }

}
module.exports={
    organizefxn: orgfn
}
