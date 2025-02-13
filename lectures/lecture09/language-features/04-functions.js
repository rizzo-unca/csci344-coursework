/****************************/
/* 1. Function Declarations */
/****************************/

// you can invoke a function definition above where it's been defined!
printHeading("1. Function Declaration Syntax");
console.log(addTwoNums1(3, 5));
console.log(addTwoNums1(30, 5));
console.log(addTwoNums1(123, 456));

// Note: No return or parameter types are explicitly defined:
function addTwoNums1(a, b) {
    return a + b;
}

/***************************/
/* 2. Arrow Function (ES6) */
/***************************/

// ES6 Syntax:
printHeading("2. Arrow Function Syntax");
const addTwoNums2 = (num1, num2) => {
    return num1 + num2;
};

console.log(addTwoNums2(3, 5));
console.log(addTwoNums2(30, 5));
console.log(addTwoNums2(123, 456));

// ES6 Syntax compressed:
// Note, if the function body on the same line as the
// signature, the return is assumed!
printHeading("3. Arrow Function Syntax condensed");
const addTwoNumsCompact = (num1, num2) => num1 + num2;

console.log(addTwoNumsCompact(3, 5));
console.log(addTwoNumsCompact(30, 5));
console.log(addTwoNumsCompact(123, 456));

// ES6 Syntax compressed 1 parameter:
printHeading("4. Arrow Function Syntax compressed 1 parameter");
const calculateSquare = (num1) => num1 ** 2;

console.log(calculateSquare(3));
console.log(calculateSquare(4));
console.log(calculateSquare(5));

// ES6 Syntax compressed 0 parameters:
// If no parameters, then use an empty parenthesis before the arrow.
// Not particularly readable, but you'll see this kind of stuff all the time!
printHeading(
    "5. Arrow Function Syntax compressed 1 parameter (another example)"
);
const today = () =>
    ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][new Date().getDay()];
console.log(today());

// helper function:
function printHeading(message) {
    console.log("\n");
    console.log(Array(60).join("*"));
    console.log(message);
    console.log(Array(60).join("*"));
}
