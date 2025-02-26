/**********/
/* 2. Map */
/**********/

const myNums = [1, 2, 3, 4, 5];
const squareNums = (item) => item ** 2;
const cubeNums = (item) => item ** 3;
const convertToString = (item) => String(item);

// The map function applies a transformation function to each element of a list,
// and returns a *new* list of values.
const result1 = myNums.map(squareNums);
const result2 = myNums.map(cubeNums);
const result3 = myNums.map(convertToString);
console.log(result1);
console.log(result2);
console.log(result3);

// CHALLENGE:
// How could you use the map function that creates a new array where each
// number is the original array is return inside a paragraph tag?
