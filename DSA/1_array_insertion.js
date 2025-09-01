// // ------------------------insertion of array in the end-----------------------------

// // *********************using builtin method
// // const arr=[11,12,13,14,15]
// // arr.push("hello")
// // console.log(arr);

// // using brute force approach
// const arr=[11,12,13,14,15]
// function insert_at_end(arr,element){
//     arr[arr.length]=element;
//     return arr;
// }


// ------------------------insertion of array in the start-----------------------------

// *********************using builtin method
// const arr=[11,12,13,14,15]
// arr.unshift("hello")
// console.log(arr);

// using brute force approach
// const arr=[11,12,13,14,15]
// function insert_at_start(arr,element){
//    for(let i=arr.length;i>0;i--){
//     arr[i]=arr[i-1];
//    }
//    arr[0]=element;
//    return arr;
// }




// ------------------------insertion of array at any position-----------------------------

// *********************using builtin method
// const arr=[11,12,13,14,15]
// arr.splice(2,0,"hello")
// console.log(arr);

// using brute force approach
// const arr=[11,12,13,14,15]
// function insert_at_start(arr,pos,element){
//    for(let i=arr.length;i>pos;i--){
//     arr[i]=arr[i-1];
//    }
//    arr[pos]=element;
//    return arr;
// }
