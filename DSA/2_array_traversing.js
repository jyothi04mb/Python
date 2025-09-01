
// ===============================
// Traversing Methods
// ===============================

function traverseArrayFor(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log("For Loop → Index:", i, "Value:", arr[i]);
  }
}

function traverseArrayWhile(arr) {
  let i = 0;
  while (i < arr.length) {
    console.log("While Loop → Index:", i, "Value:", arr[i]);
    i++;
  }
}

function traverseArrayForOf(arr) {
  for (let val of arr) {
    console.log("For...of → Value:", val);
  }
}

function traverseArrayForIn(arr) {
  for (let index in arr) {
    console.log("For...in → Index:", index, "Value:", arr[index]);
  }
}

function traverseArrayForEach(arr) {
  arr.forEach((value, index) => {
    console.log("forEach → Index:", index, "Value:", value);
  });
}

// ===============================
// map, filter, reduce, etc.
// ===============================

function demoMap(arr) {
  return arr.map(x => x * 2); // double each value
}

function demoFilter(arr) {
  return arr.filter(x => x % 2 === 0); // keep even numbers
}

function demoReduce(arr) {
  return arr.reduce((acc, curr) => acc + curr, 0); // sum
}

function demoFind(arr, target) {
  return arr.find(x => x === target); // first match
}

function demoSome(arr) {
  return arr.some(x => x > 10); // any > 10?
}

function demoEvery(arr) {
  return arr.every(x => x > 0); // all > 0?
}

// ===============================
// Test the Functions
// ===============================

let arr1 = [1, 2, 3];
console.log("Insert End Brute:", insertEndBrute([...arr1], 4));
console.log("Insert End Builtin:", insertEndBuiltin([...arr1], 4));

let arr2 = [1, 2, 3];
console.log("Insert Start Brute:", insertStartBrute([...arr2], 0));
console.log("Insert Start Builtin:", insertStartBuiltin([...arr2], 0));

let arr3 = [1, 2, 4, 5];
console.log("Insert At Brute:", insertAtBrute([...arr3], 2, 3));
console.log("Insert At Builtin:", insertAtBuiltin([...arr3], 2, 3));

let arr4 = [10, 20, 30, 40];
traverseArrayFor(arr4);
traverseArrayWhile(arr4);
traverseArrayForOf(arr4);
traverseArrayForIn(arr4);
traverseArrayForEach(arr4);

let arr5 = [1, 2, 3, 4, 5];
console.log("Map (double):", demoMap(arr5));
console.log("Filter (even):", demoFilter(arr5));
console.log("Reduce (sum):", demoReduce(arr5));
console.log("Find (3):", demoFind(arr5, 3));
console.log("Some (>10):", demoSome(arr5));
console.log("Every (>0):", demoEvery(arr5));

// ----------------- this is to show differenevce between map and foreach
// const arr=[11,12,13,14,15]
// // arr.map((value)=>{
// //     console.log(value);
    
// // })

// // arr.forEach((value)=>{
// //     console.log(value);
// // })


// const arrMap=arr.map((value)=>{
//    return value
    
// })
// console.log(arrMap);

// const arrForEac=arr.forEach((value)=>{
//    return value
// })
// console.log(arrForEac);
