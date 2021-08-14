// definition 
let arr = [1,2,3,4,5];
function smaller(x){
    return x*x;
}
function cuber(a){
    return a*a*a;
}

// function can passed as an argument 
// implementation map js-> pre-existion ->arr map
// it will apply the cb fn to all the elements of an array and retunr the new array
function bigger(arr,cb){
    let newArr = []; //decleare new array to store cb return values
    for(let i=0;i<arr.length;i++){
        let val = cb(arr[i]);
        newArr.push(val);
    }
    return newArr;
}

let sqArr = bigger(arr, smaller)
console.log("arr", sqArr);
let cubeArr = bigger(arr,cuber)
console.log("cube array " ,cubeArr)