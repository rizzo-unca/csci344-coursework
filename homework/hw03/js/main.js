import { getAccessToken } from "./utilities.js";
const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "ryan";
let password = "password";

async function initializeScreen() {
    // this function is getting invoked when the page first loads:
    token = await getAccessToken(rootURL, username, password);
    showNav();
    //  get profile info
    getAndShowData();
    // get posts:
    getPosts();
}

//  Dynamically inserts HTML nav bar into the nav element
function showNav() {
    document.querySelector("#nav").innerHTML = `
    <nav class="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
            <h1 class="font-Comfortaa font-bold text-2xl">Photo App</h1>
            <ul class="flex gap-4 text-sm items-center justify-center">
                <li><span>${username}</span></li>
                <li><button class="text-blue-700 py-2">Sign out</button></li>
            </ul>
        </nav>
    `;
}

//  Getting User Profile
async function getAndShowData() {
    const response = await fetch("https://photo-app-secured.herokuapp.com/api/profile/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data);  // Console.log to see data being pulled
        username = data.username;  // Update the username variable with the fetched username
        renderProfile(data);  // Render profile using the returned data
    } else {
        console.error("Failed to fetch profile data:", response.status);
    }
}

// implement remaining functionality below:

// renderProfile function (generates HTML for user profile data)
function renderProfile(profileData) {
    const profileContainer = document.querySelector("aside header");

    const profileHTML = `
        <img src="${profileData.avatar_url || 'https://picsum.photos/60/60?q=11'}" class="rounded-full w-16" />   
                <h2 class="font-Comfortaa font-bold text-2xl">${profileData.username || 'Ryan (Test)'}</h2>
        `;

    profileContainer.innerHTML = profileHTML;
    console.log("Worked");
}

//await / async syntax:
async function getPosts() {
    console.log("Fetching posts from API...");
    const response = await fetch(
        "https://photo-app-secured.herokuapp.com/api/posts/?limit=10",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const data = await response.json();
    console.log(data);
    console.log("Data from API:", data);
    renderPosts(data);
}

// renderBookmarkButton function (generates HTML for bookmark buttons & dynamically sets atributes)
function renderBookmarkButton(postJSON) {
    return `                        
        <button
            class="bookmark-btn" 
            data-post-id="${postJSON.id}" 
            data-bookmark-id="${postJSON.current_user_bookmark_id || ''}">
            <i class="${postJSON.current_user_bookmark_id ? 'fas' : 'far'} fa-bookmark"></i>
        </button>
    `;
    //  Assigns CSS class 'bookmark-btn' to the bookmark button
    //  Adds data-post-id attribute to previously mentioned button
    //  Adds data-bookmark-id attribute to said button & stores bookmark ID for post.
    //  Dynamically sets CSS classes for the bookmark button depending on if it was previously bookmarked or not
}

// attatchBookmarkListeners function (finds all bookmark buttons on the page & attatches click event to them)
function attatchBookmarkListeners(postListJSON) {                        //  defines attatchBookmarkListener function
    const bookmarkButtons = document.querySelectorAll('.bookmark-btn');  //  Selects all HTML bookmark-btn elements and returns a NodeList of them
    bookmarkButtons.forEach((button, index) => {                         //  Iterates over all bookmark buttons and recieves button & index paramaters
        button.addEventListener('click', () => {                         //  Adds click event listener to current bookmark button
            toggleBookmark(button, postListJSON[index]);                 //  Calls toggleBookmark function and passes button & postListJSON[index] paramaters
        });
    });
}

function attachLikeListeners(postListJSON) {
    const likeButtons = document.querySelectorAll(".like-btn");

    likeButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            toggleLike(button, postListJSON[index]);
        });
    });
}

function renderPost(postJSON) {
    const template = `
        <section class="bg-white border mb-10">
            <div class="p-4 flex justify-between">
                <h3 class="text-lg font-Comfortaa font-bold">${
                    postJSON.user.username
                }</h3>
                <button class="icon-button"><i class="fas fa-ellipsis-h"></i></button>
            </div>
            <img src="${
                postJSON.image_url
            }" alt="placeholder image" width="300" height="300"
                class="w-full bg-cover">
            <div class="p-4">
                <div class="flex justify-between text-2xl mb-3">
                    <div>
                        <button class="like-btn" data-post-id="${postJSON.id}" data-like-id="${postJSON.current_user_like_id || ''}">
                            <i class="${postJSON.current_user_like_id ? 'fas' : 'far'} fa-heart" 
                               style="color: ${postJSON.current_user_like_id ? 'red' : 'black'};"></i>
                        </button>
                        <button><i class="far fa-comment"></i></button>
                        <button><i class="far fa-paper-plane"></i></button>
                    </div>
                    <div>
                        ${renderBookmarkButton(postJSON)}
                    </div>
                </div>
                <p class="font-bold mb-3"><span id="like-count-${postJSON.id}">${postJSON.likes.length}</span> likes</p>                <div class="text-sm mb-3">
                    <p>
                        <strong>${postJSON.user.username}</strong>
                        ${postJSON.caption} <button class="button">more</button>
                    </p>
                </div>
                <p class="uppercase text-gray-500 text-xs">1 day ago</p>                    <strong>lizzie</strong>
                    Here is a comment text text text text text text text text.
                </p>
                <p class="text-sm mb-3">
                    <strong>vanek97</strong>
                    Here is another comment text text text.
                </p>
                <p class="uppercase text-gray-500 text-xs">1 day ago</p>
            </div>
            <div class="flex justify-between items-center p-3">
                <div class="flex items-center gap-3 min-w-[80%]">
                    <i class="far fa-smile text-lg"></i>
                    <input type="text" class="min-w-[80%] focus:outline-none" placeholder="Add a comment...">
                </div>
                <button class="text-blue-500 py-2">Post</button>
            </div>
        </section>
    `;
    const container = document.querySelector("main");
    container.insertAdjacentHTML("beforeend", template);
}

function renderPosts(postListJSON) {
    postListJSON.forEach(renderPost);
    attatchBookmarkListeners(postListJSON);
    attachLikeListeners(postListJSON);
}

// Handeling bookmarks
window.createBookmark = async function (postId) {  // Defining createBookmark async function & attatching it to window (to be global)
    const postData = {post_id: postId}; //  Creates postData object to be passed as API request body
    // HTTP Post request to /api/bookmarks
    const response = await fetch (
        `${rootURL}/api/bookmarks`,  //  Template literal to construct URL w/ endpoint path
        {
            //  Option for fetch request
            method: "POST",  //  Specifying post request method
            headers: {       //  Setting request headers
                "Content-Type": "application/json",  //  Specifying request body as JSON format
                Authorization: `Bearer ${token}`,    //  Including auth token
            },
            body: JSON.stringify(postData),          //  Setting request body to JSON string rep of postData
        }
    );
    const data = await response.json();  //  Parsing JSON response from API
    console.log(data);                   //  Logs parsed JSON data to browser console
};

//  ToggleBookmark function
window.toggleBookmark = async function (buttonEl, postJSON) {  //  Declares toggleBookmark function & attatches to window (making global variable)
    const iconEl = buttonEl.querySelector("i");                //  Retrieving bookmark icon

    console.log("Toggle bookmark for post:", postJSON.id);      //  Console display for API call

    if (postJSON.current_user_bookmark_id) {  //  Checks if user has bookmarked post
        console.log("Remove bookmark for post:" , postJSON.id);  //  Console display for API call
        const response = await fetch (
            `${rootURL}/api/bookmarks/${postJSON.current_user_bookmark_id}`,  //  Constructing url to bookmark we want to remove
            {
                method: "DELETE",                        //  Specifying HTTP request as Delete
                headers: {                               //  Setting required headers
                    "Content-Type": "application/json",  //  Specifying request body as JSON
                    Authorization: `Bearer ${token}`,    //  Including auth token
                },
            }
        );
        //  Executes our HTML Delete request
        console.log("Response from bookmark remove:" , response);  //  Console log for API call
        if (response.ok) {
            iconEl.classList.remove("fas");            //  Removing 'fas' from the bookmark icon
            iconEl.classList.add("far");               //  Adding 'far' to the bookmark icon
            postJSON.current_user_bookmark_id = null;  //  Sets current_user_bookmark_id to NULL
        }
    } else {  //  Creating new bookmark if user hasn't bookmarked a post
        console.log("Add bookmark for post:", postJSON.id);  //  Console log for API call
        const response = await fetch(
            `${rootURL}/api/bookmarks/`,                 //  Bookmark creation API endpoint
            {
                method: "POST",                          //  Specifying HTTP request as Post
                headers: {                               //  Setting request headers
                    "Content-Type": "application/json",  //  Specifies request body as JSON
                    Authorization: `Bearer ${token}`,    //  Including auth token
                },
                body: JSON.stringify({ post_id: postJSON.id }),  //  Setting request body to JSON string w/ post_id for the bookmarked post
            }
        );
        console.log("Bookmark add Response:", response);  //  Console log for API response
        const data = await response.json();  //  Parsing JSON response body from API Post request then stores in data constant
        console.log("Bookmark Added:", data);                                //  logs JSON data to browser console
        if (response.ok)  {                               //  checks if HTTP API response is successful 
            iconEl.classList.remove("far");               //  removing "far" from the bookmark icon
            iconEl.classList.add("fas");                  //  adding "fas" to the bookmark icon
            postJSON.current_user_bookmark_id = data.id;  //  updates postJSON with id of the newly created bookmark
        }
    }
};

window.toggleLike = async function (buttonEl, postJSON) {
    const iconEl = buttonEl.querySelector("i");
    const likeCountEl = document.getElementById(`like-count-${postJSON.id}`);

    console.log("Toggling like for post:", postJSON.id);

    if (postJSON.current_user_like_id) {
        // Unliking posts
        console.log("Unliking post:", postJSON.id);
        const response = await fetch(
            `${rootURL}/api/likes/${postJSON.current_user_like_id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("Response from unlike:", response);
        if (response.ok) {
            iconEl.classList.remove("fas");
            iconEl.classList.add("far");
            iconEl.style.color = ""; // Remove red color on unlike
            postJSON.current_user_like_id = null;
            postJSON.likes.length -= 1;
            likeCountEl.textContent = postJSON.likes.length;
        }
    } else {
        // Liking Posts
        console.log("Liking post:", postJSON.id);
        const response = await fetch(`${rootURL}/api/likes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ post_id: postJSON.id }),
        });

        console.log("Response from like:", response);
        const data = await response.json();
        if (response.ok) {
            iconEl.classList.remove("far");
            iconEl.classList.add("fas");
            iconEl.style.color = "red"; // Fill the heart with red on like
            postJSON.current_user_like_id = data.id;
            postJSON.likes.length += 1;
            likeCountEl.textContent = postJSON.likes.length;
        }
    }
};


// after all of the functions are defined, invoke initialize at the bottom:
initializeScreen();