
//remove all ,prime numbes from array 
let arr = [10,47,15,17,82,97,93,31,46,54];

function isprime(val){
    for(let i = 2;i<Math.sqrt(val);i++ ){
        if(val%i==0){
            return false;
        }
        
    }
    return true;
}

for(let i = 0 ;i<arr.length;i++){
   if(arr[i]==1){
       continue;
   }
    if(isprime(arr[i])){
        arr.splice(i,1);
    }
    if(arr[i]==2){
        arr.splice(i,1);
    }
}
// let na = arr.splice(1,2);

console.log(arr);