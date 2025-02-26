/*************/
/* 3. Filter */
/*************/
console.log("\nfilter method of list:");

// original array
const myNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// filter functions:
const isGreaterThan2 = (item) => item > 2;
const isEven = (item) => item % 2 === 0;
const isOdd = (item) => item % 2 === 1;

// The filter "higher order" function applies a filtering function
// to each element of a list (which evaluates to true or false).
// It returns a new list with only those items where filtering function returned true.
const result1 = myNums.filter(isGreaterThan2);
const result2 = myNums.filter(isEven);
const result3 = myNums.filter(isOdd);

console.log(result1);
console.log(result2);
console.log(result3);

const names = ["Larry", "Curly", "Moe", "Walter", "Waldo", "Lester"];

// CHALLENGE:
// How could you use the filter function to return a list of names
// that start with the letter "L"?
