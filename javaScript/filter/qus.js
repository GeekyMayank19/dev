let products = [
    {name: "T-Shirt",price:25},
    {name: "Headphones",price:125},
    {name: "Keyboard",price:75},
    {name: "Monitor",price:200},
]
// return names of all products in uppercase who has price => 100
let ans = products.filter((val)=>{
    if(val.price>=100){
        return val;
    }
}).map((val)=>{
    let l = val.name.toUpperCase();
    return l;
})

let res = products.map((val)=>{
    if(val.price>=100){
       return val.name.toUpperCase();
    }else if(val.price<100){
        return val.name.toLowerCase();
    }
})

console.log(ans);
console.log(res)