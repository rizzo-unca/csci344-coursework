//The data:
const people = [
    {
        name: "Jane",
        pic: "http://knight.gamebanana.com/img/ico/sprays/patrick_star_preview_2.png",
        score: 300,
    },
    {
        name: "Brenda",
        pic: "https://3.bp.blogspot.com/-_3f5QzVwocE/U3G4_PeOoTI/AAAAAAAAeC0/uanC3ua1cu4/s1600/OldSpongeBobStock5-25-13.png",
        score: 10,
    },
    {
        name: "Wanda",
        pic: "https://3.bp.blogspot.com/-_3f5QzVwocE/U3G4_PeOoTI/AAAAAAAAeC0/uanC3ua1cu4/s1600/OldSpongeBobStock5-25-13.png",
        score: 60,
    },
    {
        name: "Maria",
        pic: "http://knight.gamebanana.com/img/ico/sprays/patrick_star_preview_2.png",
        score: 80,
    },
    {
        name: "Jasper",
        pic: "https://3.bp.blogspot.com/-_3f5QzVwocE/U3G4_PeOoTI/AAAAAAAAeC0/uanC3ua1cu4/s1600/OldSpongeBobStock5-25-13.png",
        score: 600,
    },
    {
        name: "Malik",
        pic: "http://knight.gamebanana.com/img/ico/sprays/patrick_star_preview_2.png",
        score: 40,
    },
];
const container = document.querySelector(".cards");
for (const item of people) {
    const htmlSnippet = `     
           <div class="cards">
                <img src="${item.pic}">
                <p>${item.name} high score is: ${item.score}/p>
            </div>
    `
    console.log(item);
    container.insertAdjacentHTML("beforehand", htmlSnippet);
}
/*
const person2Html = person => {
    return `
        <div class="card">
            <img src="${person.pic}">
            <p>${person.name}'s high score is: ${person.score}</p>
        </div>`;
}
document.querySelector('.cards').innerHTML = people.map(person2Html).join('\n');
*/

/**
 * Your job:
 * Loop through the people array and create a card for all of the
 * players.
 *   * Create a function that generates a card from a template
 *   * Use the build-in map method to apply the template (HTML snippet) to each person
 *   * Add the templates to the DOM
 */

