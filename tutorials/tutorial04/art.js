let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    noLoop(); // Ensures the art is generated once
    drawAlgorithmicArt();
}

function drawAlgorithmicArt() {
    let bgColor = color(random(255), random(255), random(255)); // Random background color
    background(bgColor);
    
    let styleType = int(random(3)); // Randomly select a style
    let uniformColor = color(random(255), random(255), random(255)); // Single color for some styles
    
    for (let i = 0; i < 20; i++) { // Loop to generate multiple shapes
        let x = random(width);
        let y = random(height);
        let size = random(20, 100);
        let shapeType = random(["circle", "square", "plus", "star"]);
        let shapeColor = (styleType === 1) ? uniformColor : color(random(255), random(255), random(255));
        
        fill(shapeColor);
        noStroke();
        
        if (shapeType === "circle") {
            circle(x, y, size);
        } else if (shapeType === "square") {
            square(x - size / 2, y - size / 2, size); // Centering square
        } else if (shapeType === "plus") {
            rect(x - size / 4, y - size / 2, size / 2, size);
            rect(x - size / 2, y - size / 4, size, size / 2);
        } else if (shapeType === "star") {
            drawStar(x, y, size / 2, size, int(random(5, 10)));
        }
    }
}

function drawStar(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius2;
        let sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a + halfAngle) * radius1;
        sy = y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}
