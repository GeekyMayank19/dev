let arr = [
    {name: "A",age:14,gender:"M"},
    {name: "B",age:34,gender:"M"},
    {name: "C",age:24,gender:"F"},
    {name: "D",age:44,gender:"F"},
    {name: "E",age:28,gender:"M"},
    {name: "F",age:28,gender:"F"},
    {name: "G",age:47,gender:"M"},
    {name: "H",age:47,gender:"F"},

]

let newArr = arr.filter((val)=>{
    if(val.gender=="F"){
        return val;
    }
}).map((val)=>{
    return val.age;
})

console.log(newArr);