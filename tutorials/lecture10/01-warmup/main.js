let canvasWidth = document.documentElement.clientWidth - 10;
let canvasHeight = document.documentElement.clientHeight - 10;

// in p5.js, the function runs on page load:
function setup() {
    rectMode(CENTER);
    createCanvas(canvasWidth, canvasHeight);
}

function shapeDrawer() {
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;
    fill(r, g, b);
}

function getColor() {

    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;
    return (r, g, b);
}

// in p5.js, special event handler that listens for click events:
function mouseClicked() {
    let size = Math.random() * 200;
    let shape = Math.random();

    shapeDrawer();

    if (shape < 0.5) {
        square(mouseX, mouseY, size);
    } else { 
        circle(mouseX, mouseY, size);
    }

    let numCircles = 5;
    for (let i = numCircles; i > 0; i--) {
        let bullseyeSize = size * (i / numCircles);
        let color = getColor;
        circle(mouseX, mouseY, bullseyeSize)
    }

    //square(mouseX, mouseY, 100);
    //circle(mouseX, mouseY, 100);
}

// in p5.js, special event handler that listens for drag events:
function mouseDragged() {
    let size = Math.random() * 200;
    let shape = Math.random();

    shapeDrawer();
    let color = getColor;
    if (shape < 0.5) {
        square(mouseX, mouseY, size);
    } else {
        circle(mouseX, mouseY, size);
    }
}

/**
 * Challenges:
 * 1. As you click / drag, can the circles have different colors and sizes?
 *      * Try using the Math.random() function
 * 2. Can you make the click / drag sometimes make circles and sometimes make rectangles
 *      * Sample rectangle function invocation: rect(mouseX, mouseY, 100, 100);
 * 3. Can you make each click create a bulleye of different colors?
 *      * Hint: make sure you draw the bigger circles before you draw the smaller circles.
 */
