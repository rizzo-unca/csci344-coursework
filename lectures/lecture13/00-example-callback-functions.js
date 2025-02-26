// callback function 1:
function writeAGreeting() {
    console.log("Hello world!");
}

// callback function 2:
function sendAnEmail() {
    console.log("Pretend the function sends an email...");
}

// callback function 3:
function drawSomethingToTheScreen() {
    console.log("Pretend the function draws something to the screen...");
}

// setTimeout is a HIGHER ORDER FUNCTION: “Do something in X milliseconds”
setTimeout(sendAnEmail, 1000);
setTimeout(drawSomethingToTheScreen, 2000);
setTimeout(writeAGreeting, 200);

// setInterval is another HIGHER ORDER FUNCTION: “Do something every X milliseconds”
setInterval(writeAGreeting, 100);
