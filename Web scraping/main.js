let request = require('request');
const cheerio = require('cheerio');
let fs = require('fs');
const path = require('path');
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595"
console.log("Before");
request(url,cb);
function cb(error, response,html){
    if(error){
        console.log(error)
    }else if(response.statusCode==404){
        console.log("Page Not Found");
    }else{
        // console.log(html);
        dataExtracter(html);
        // console.log("html",);
    }

}

let currentpath = process.cwd();
let dir = path.join(currentpath,'ipl');

function dataExtracter(html){

    if(fs.existsSync(dir)==false){
        fs.mkdirSync(dir)
    }

    let SearchTool = cheerio.load(html);
    let matchCart = SearchTool("a.match-info-link-SIDEBAR");

    for(let i=0;i<matchCart.length;i++){
        let fullLink="https://www.espncricinfo.com"+SearchTool(matchCart[i]).attr("href");
        // console.log(fullLink)
        request(fullLink,newcb);
    }

    function newcb(error, response,html){
        if(error){
            console.log(error)
        }else if(response.statusCode==404){
            console.log("Page Not Found");
        }else{
            // console.log(html);
            getAllRecord(html);
            // console.log("html",);
        }
    
    }
   
}

function getAllRecord(html){
    let searchTool = cheerio.load(html);
    let twoteam = searchTool('.name-link');
    //decription 
    let description = searchTool('.event .description').text().split(',');
    let vanue = description[1];
    let date = description[2];
    //name of team 
    let tname1 = searchTool(twoteam[0]).text();
    let tname2 = searchTool(twoteam[1]).text();
    // making path for team 
    let dir1 = path.join(dir,tname1);
    let dir2 = path.join(dir,tname2);
     //create folder of earch player
     if(fs.existsSync(dir1)!=true){
        fs.mkdirSync(dir1);
    }
    if(fs.existsSync(dir2)!=true){
        fs.mkdirSync(dir2);
    }

    //batsman detail
    let batsman = searchTool(".table.batsman tbody tr");
    for(let i=0;i<batsman.length;i++){
        let cols = searchTool(batsman[i]).find("td");
        let pname = searchTool(cols[0]).find("a").text();
        let run = searchTool(cols[2]).text();
        let ball = searchTool(cols[3]).text();
        let four = searchTool(cols[5]).text();
        let six = searchTool(cols[6]).text();
        let sr = searchTool(cols[7]).text();
        // console.log(six.text());

        // console.log(pname,run,ball,four,six,sr);
        //checking file is exsting or not
        let obj = {
            table: []
        }
      
    
            obj.table.push({
                MyTeam:tname1,
                name:pname,
                venue:vanue,
                date:date,
                opponetTeam:tname2,
                run:run,
                balls: ball,
                fours: four,
                sixs: six,
                SR: sr
            });

            var json = JSON.stringify(obj);
            fileName = path.join(dir1,`${pname}.json`)
            fs.writeFileSync(fileName,json)
            
        

    }
   

    

}
console.log("After");