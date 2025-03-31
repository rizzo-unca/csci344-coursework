const ENDPOINT_WIKIPEDIA = "https://en.wikipedia.org/api/rest_v1/page/summary";

//  Defining our function
async function getWikipediaArticle(searchTerm) {
    //  sending GET request to wikipedia API
    const response = await fetch(`${ENDPOINT_WIKIPEDIA}/${searchTerm}`);
    //  Taking API response & storing it in data variable
    const data = await response.json();
    //  returning the data
    return data;
}




function dataToHTML(wikiArticle) {
    //  Getting our thumbnail from the wikiArticle object
    const thumbnail = wikiArticle.thumbnail.source
    //  Getting out title form the wikiArticle object
    const title = wikiArticle.title;
    //  Getting the extract_html property from the wikiArticle object
    const extractHTML = wikiArticle.extract_html;

    //  Constructing HTML Card to display the information we've gathered from earlier
    return `
    <section class="card">
        <img src="${thumbnail}">
        <div>
            <h2>${title}</h2>
            ${extractHTML}
        </div>
    </section>`;
}



// Uncomment these functions when you're ready to test:
testGetWikipediaArticles(); // Part A
testDisplayArticles(); // Part B





// Please do not modify the testGetWikipediaArticles() function
async function testGetWikipediaArticles() {
    const western = await getWikipediaArticle("Western Carolina University");
    const unca = await getWikipediaArticle("UNC Asheville");
    const app = await getWikipediaArticle("Appalachian State");
    const charlotte = await getWikipediaArticle("UNC Charlotte");
    console.log(western);
    console.log(unca);
    console.log(app);
    console.log(charlotte);
    return [western, unca, app, charlotte];
}

// Please do not modify the testDisplayArticles() function
async function testDisplayArticles() {
    const container = document.querySelector("#wiki-previews");
    const pages = await testGetWikipediaArticles();
    pages.forEach((page) => {
        container.insertAdjacentHTML("beforeend", dataToHTML(page));
    });
}
