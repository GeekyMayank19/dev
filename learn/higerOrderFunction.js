let radius = [3,2,4,1];
const area = function(val){
    return Math.PI * val * val;
}
const circumference = function(val){
    return Math.PI * 2*val;
}
////////////making map function///////////////

Array.prototype.cal = function(arr){
    let output = [];
    for(let i = 0 ;i<this.length;i++){
        output.push(area(this[i]))
    }
    return output;
}

console.log(radius.cal(area));
console.log(radius.cal(circumference));

////////////functional way of wrinting code for same  problem//////////////

// const area = function(val){
//     return Math.PI * val * val;
// }
// const calculate = function(arr){
//     let output = [];
//     for(let i = 0 ;i<arr.length;i++){
//         output.push(area(arr[i]));
//     }
//     return output
// }

// console.log(calculate(radius));
/////////////// this is the general way of doing ///////////////
// const calculateArea = function(radius){
//     let output = [];
//     for(let i = 0 ;i<radius.length;i++){
//         output.push(Math.PI * radius[i] * radius[i]);
//     }
//     return output;
// }

// console.log(calculateArea(radius));

// const calculateCurcumference = function(radius){
//     let output = [];
//     for(let i = 0 ;i<radius.length;i++){
//         output.push(2*Math.PI*radius[i]);
//     }
//     return output;
// }
// console.log(calculateCurcumference(radius));
