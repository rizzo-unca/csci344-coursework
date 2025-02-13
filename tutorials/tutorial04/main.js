let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

// in p5.js, the function runs on page load:
function setup() {
    createCanvas(canvasWidth, canvasHeight);
    noFill();
    // invoke any drawing functions inside of setup.
    // functions should all go between "createCanvas()" and "drawGrid()"
    draw5CirclesWhile();
    draw5CirclesFor();
    drawNCircles();
    // draw5RedSquares();
    drawGrid(canvasWidth, canvasHeight);
}

// my first function
//function to draw 5 circles using a while loop
function draw5CirclesWhile() {
    noFill();
    let i = 0; //counter
    let x = 100; //starting coordinates
    let y = 200; //starting coordinates
    while(i < 5){
        circle(x, y + i * 50, 50) //circle positioning formula
        ++i //incrimenting counter
    }
}

//function to draw 5 circles uwing a for loop
function draw5CirclesFor(){
    noFill();
    let x = 700; //starting x coordinate
    let y = 200; //starting y coordinate
    for (let i = 0; i < 5; i++){
        circle(x, y + i * 50, 50)
    }
}

//function to draw n circles using a for loop
function drawNCircles(){
    noFill();
    let x = 400; //starting x coordinate
    let y = 0; //starting y coordinate
    let n = 20
    for(let i = 0; i < n; i++){
        circle(x, y + i * 50, 50)
    }
}

//function to draw n circles flexibility
function drawNCirclesFlexible(n, size, x, y){
    for(let i = 0; i < n; i++){
        circle(x, y + i * size, size)
    }
}

//function to draw n circles even more flexibility
function drawNShapesFlexible(n, size, x, y, shape){
    fill("blue");
    for(let i = 0; i < n; i++){
        let yPos = y + i * size;

        if (shape === "circle"){
            circle(x, yPos, size);
        } else if (shape === "square"){
            square(x - size / 2, yPos -size / 2, size);
        }
    }
}

//function to draw n circles in rows & columns as well
function drawNShapesDirectionFlexible(n, size, x, y, shape, direction){
    fill("turquoise");
    for(let i = 0; i < n; i++){
        let xPos = x;
        let yPos = y;

        if (direction === "row"){
            xPos = x + i * size;
        } else if (direction === "column"){
            yPos = y + i * size;
        }

        if (shape === "circle"){
            circle(xPos, yPos, size);
        } else if (shape === "square"){
            square(xPos - size / 2, yPos - size / 2, size);
        }
    }
}


function draw5RedSquares() {
    fill("red");
    square(320, 200, 50); // topLeftX, topLeftY, width
    square(320, 250, 50);
    square(320, 300, 50);
    square(320, 350, 50);
    square(320, 400, 50);
}
