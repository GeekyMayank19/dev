let arr = [1,2,3,4,5,6,7,8,9,10];
let arr1 = [];
while(arr.length>0){

   
    let val = arr.shift()
    if(val %2 == 0){
        arr1.unshift(val);
    }else{
        arr1.push(val);
    }
}


for(let i = 0 ;i<arr1.length;i++){
    console.log(arr1[i]);
}