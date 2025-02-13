/************************/
/* 1. While loop syntax */
/************************/
printHeading("while loop:");
let i = 0;
while (i < 5) {
    console.log("The counter is:", i);
    i++;
}

/**********************/
/* 2. For loop syntax */
/**********************/
printHeading("for loop:");
for (let i = 0; i < 5; i++) {
    console.log("The counter is:", i);
}

/********************/
/* 3. For...of loop */
/********************/
const my_list = ["apple", "orange", "banana", "mango", "peach"];
printHeading("for...of loop:");
for (const item of my_list) {
    console.log("The item is:", item);
}

// helper function:
function printHeading(message) {
    console.log("\n");
    console.log(Array(60).join("*"));
    console.log(message);
    console.log(Array(60).join("*"));
}
