let arr =[
    "Sumeet Malik",
    "Amit Malick",
    "Inderjit Malik",
    "Daya Malik",
    "Kunal Malik",
    "Aryan Malik"
]

let newArr = arr.map(function(val,idx,arr){

    let ans = val.split(" ");
    let res = ans[0][0]+"."+ans[1]+".";
    return res;

})
console.log(newArr);