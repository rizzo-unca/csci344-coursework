const imagePathList = [
    "images/poppies.jpg",
    "images/dogwoods.jpg",
    "images/blossom.jpg",
    "images/field3.jpg",
    "images/field4.jpg",
    "images/branch.jpg",
    "images/red.jpg",
    "images/purple2.jpg",
    "images/field1.jpg",
    "images/purple.jpg",
    "images/jar.jpg",
    "images/green.jpg",
    "images/green1.jpg",
    "images/purple1.jpg",
    "images/magnolias.jpg",
    "images/daisy1.jpg",
];

const container = document.querySelector(".cards");
for (const item of imagePathList) {
    console.log(item);
    const htmlSnippet = `<img src="${item}">`;
    container.insertAdjacentHTML('beforeend', htmlSnippet);
}
// Your Task: Create an image for each of the items above inside of the
// <div class="cards"></div> tag using Javascript.
//
// *******************
// HINTS:
// *******************
// 1. Target the container where you want each image to go:
// 2. Loop through each path in the imagePathList array:
//      * Create an HTML snippet in memory (for each image)
//      * Inject the HTML snippet into the cardsContainer within the DOM