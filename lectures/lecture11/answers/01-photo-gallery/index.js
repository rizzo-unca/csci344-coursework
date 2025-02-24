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

// 1. Target the container where you want each image to go:
const cardsContainer = document.querySelector(".cards");

// 2. Loop through each image:
for (const imagePath of imagePathList) {
    // 3. Create the HTML snippet in memory:
    const template = `<img class="card-img" src="${imagePath}" />`;

    // 4. Inject the HTML snippet into the cardsContainer into the DOM:
    cardsContainer.insertAdjacentHTML("beforeend", template);
}
