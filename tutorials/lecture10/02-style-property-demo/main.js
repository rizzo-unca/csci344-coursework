function changeColor (selector, color) {
    console.log(selector, color);
    document.querySelector(selector).style.backgroundColor = color;
    if (el.style.backgroundColor === color) {
        el.style.backgroundColor = "white";
    } else {
        el.style.backgroundColor = color;
    }
};

function reset() {
    document.querySelector("#section1")
}
/*
const makeRed = () => {
    // your code here...
    console.log('Change background to red');
    document.querySelector('#section1').style.backgroundColor = 'red';
    document.querySelector('#section1').style.fontWeight = 'bold';


};

const makeBlue = () => {
    // your code here...
    console.log('Change background to blue');
    document.querySelector('#section2').style.backgroundColor = 'blue';
    document.querySelector('#section2').style.fontWeight = 'bold';

};

const makePink = () => {
    // your code here...
    console.log('Change background to pink');
    document.querySelector('#section3').style.backgroundColor = 'pink';
    document.querySelector('#section3').style.fontWeight = 'bold';


};

const makeOrange = () => {
    // your code here...
    console.log('Change background to orange');
    document.querySelector('#section4').style.backgroundColor = 'orange';
    document.querySelector('#section4').style.fontWeight = 'bold';

};
*/
