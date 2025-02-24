let currentPosition = 0; //Keeps track of carousel current position
let gap = 10; //defines the gap between each slide in the carousel
const slideWidth = 400; //defines width of every slide (fixed)

//Function to move the carousel backwards & forwards
function moveCarousel(direction) {
    const items = document.querySelectorAll(".carousel-item"); //selects all HTML in the "carousel-item" class and returns NodeList

    //checking to see if the direction is forward or backward
    //forward
    if (direction == "forward") {
        // minus 2 b/c first 2 slides already showing
        if (currentPosition >= items.length - 2) {
            return false;
        }
        currentPosition++;
    } else {
        //backwards
        if (currentPosition == 0) {
            return false;
        }
        currentPosition--;
    }

    const offset = (slideWidth + gap) * currentPosition; // determines how much the slides need to move horizontally

    //goes through all carousel items
    for (const item of items) {
        item.style.transform = `translateX(-${offset}px)`;
    }
}
