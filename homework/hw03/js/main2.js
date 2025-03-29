// main2.js
// more detailed comments will be coming before 12:00pm March 29th
import { getAccessToken } from "./utilities.js";            //  Gets access token from utilities.js
const rootURL = "https://photo-app-secured.herokuapp.com";  //  URL to our Photo App API
let token = null;                                           //  Defining our access token & setting it to null
let username = "ryan";                                      //  Declaring username for API token access
let password = "password";                                  //  Declaring password for API token access

//  Function Declirations
//  showNav function which constructs HTML for our sites navigation bar
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

function renderStories(storiesData) {                                 //  Defines renderStories function
    const storiesContainer = document.querySelector(".stories");      //  Selects HTML stories element and puts it in storiesContainer
    storiesContainer.innerHTML = "";                                  //  Clears any existing content in storiesContainer (just in case)

    storiesData.forEach(story => {                                    //  Iterating through all story objects in storiesData
        //  Creating our HTML to be inserted using API data with fallback default images (again, just incase)
        const storyHTML = `
            <div class="story">
                <img src="${story.image_url || 'https://picsum.photos/60/60?q=11'}" alt="${story.username}'s story" class="rounded-full w-16">
                <p class="text-xs text-center">${story.username}</p>
            </div>
        `;
        storiesContainer.insertAdjacentHTML("beforeend", storyHTML);  //  Inserting HTML at the end to be added into the HTML container
    });
}


function renderProfile(profileData) {                                 //  Defines renderProfile function
    const profileContainer = document.querySelector("aside header");  //  Selects the header element and assignes it to profileContainer

    //  Creating our HTML to be inserted using API data with fallback default images (again just incase again)
    const profileHTML = `
        <img src="${profileData.image_url || 'https://picsum.photos/60/60?q=11'}" style="border-radius: 50%; width: 4rem; height: 4rem;" />   
        <h2 class="font-Comfortaa font-bold text-2xl">${profileData.username || 'Ryan (Test)'}</h2>
    `;

    profileContainer.innerHTML = profileHTML;  //  Setting innerHTML of profileContainer to our above generated HTML
    console.log("Worked");                     //  This is debug code to log a "worked" message in the console to make sure the API call and code implementation went through
}


//  Generating HTML for our bookmark button
function renderBookmarkButton(postJSON) {
    return `                        
        <button
            class="bookmark-btn" 
            data-post-id="${postJSON.id}" 
            data-bookmark-id="${postJSON.current_user_bookmark_id || ''}">
            <i class="${postJSON.current_user_bookmark_id ? 'fas' : 'far'} fa-bookmark"></i>
        </button>
    `;
}

function attatchBookmarkListeners(postListJSON) {                        //  Defines our attatchBookmarkListeners function                  
    const bookmarkButtons = document.querySelectorAll('.bookmark-btn');  //  Selects all HTML elements with the "bookmark-btn" and stores them as bookmarkButton variables
    bookmarkButtons.forEach((button, index) => {                         //  Loops through each button in bookmarkButtons list               
        button.addEventListener('click', () => {                         //  Adding click event listeners to each button
            toggleBookmark(button, postListJSON[index]);                 //  Calls the toggleBookmark function       
        });
    });
}
 
function attachLikeListeners(postListJSON) {                     //  Defines attatchLikeListeners function
    const likeButtons = document.querySelectorAll(".like-btn");  //  Selects HTML elements with "like-btn" and stores them in likeButtons variable

    likeButtons.forEach((button, index) => {                     //  Loops through each button in likeButtons
        button.addEventListener("click", () => {                 //  Adds a click event listener to every like button
            toggleLike(button, postListJSON[index]);             //  Calls toggleLike function when the like button is clicked
        });
    });
}

function renderSuggestions(suggestions) {                     //  Defines renderSuggestions function
    const container = document.querySelector("aside .mt-4");  //  Selects HTML elements with "mt-4" and stores them in container variable
    container.innerHTML = "";                                 //  Clears any existing content in container (just in case)
    suggestions.forEach(user => {                             //  Loops through each user object in suggestions
        //  Creating our HTML to be inserted using API data with fallback default images (just incase)
        const suggestionHTML = `
            <section class="flex justify-between items-center mb-4 gap-2">
                <img src="${user.image_url || 'https://picsum.photos/40/40'}" class="rounded-full" style="width: 40px; height: 40px;" />
                <div class="2-[108px]">
                    <p class="font-bold text-sm">${user.username}</p>
                    <p class="text-gray-500 text-xs">suggested for you</p>
                </div>
                <button class="follow-btn text-blue-500 text-sm py-2" data-username="${user.username}">follow</button>
            </section>
        `;
        container.insertAdjacentHTML("beforeend", suggestionHTML);  //  Inserts suggestionHTML into container
    });
    attachFollowListeners();  //  Calls attatchFollowListeers function to make follow button function (does not currently function)
}

function renderComments(comments, postId) {
    if (comments.length > 1) {
        const recentComment = comments[comments.length - 1]; 
        const otherComments = comments.slice(0, comments.length - 1); 

        return `
            <div class="text-sm mb-3">
                <strong>${recentComment.username || 'Unknown User'}</strong>: ${recentComment.text}
            </div>
            <div class="hidden" id="extra-comments-${postId}">
                ${otherComments.map(comment => `
                    <div class="text-sm mb-3">
                        <strong>${comment.username || 'Unknown User'}</strong>: ${comment.text}
                    </div>
                `).join('')}
            </div>
            <button class="text-blue-500 text-xs" id="view-all-comments-${postId}">View all ${comments.length} comments</button>
        `;
    } else if (comments.length === 1) {
        const comment = comments[0];
        return `
            <div class="text-sm mb-3">
                <strong>${comment.username || 'Unknown User'}</strong>: ${comment.text}
            </div>
        `;
    } else {
        return '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', function(e) {
        if (e.target && e.target.id.startsWith('view-all-comments-')) {
            const postId = e.target.id.split('-')[3]; 
            const commentsSection = document.getElementById(`extra-comments-${postId}`);
            if (commentsSection) {
                const isHidden = commentsSection.classList.contains('hidden');
                if (isHidden) {
                    commentsSection.classList.remove('hidden');
                    e.target.textContent = `View less comments`;
                } else {
                    commentsSection.classList.add('hidden');
                    e.target.textContent = `View all comments`;
                }
            }
        }
    });
});

function attachFollowListeners() {
    const followButtons = document.querySelectorAll(".follow-btn");
    followButtons.forEach(button => {
        button.addEventListener("click", async (e) => {
            const username = e.target.getAttribute("data-username");
            await followUser(username);
        });
    });
}

async function renderPosts(postListJSON) {
    const container = document.querySelector("main");

    postListJSON.forEach(postJSON => {
        const template = `
            <section class="bg-white border mb-10">
                <div class="p-4 flex justify-between">
                    <h3 class="text-lg font-Comfortaa font-bold">${postJSON.user.username}</h3>
                    <button class="icon-button"><i class="fas fa-ellipsis-h"></i></button>
                </div>
                <img src="${postJSON.image_url}" alt="placeholder image" width="300" height="300" class="w-full bg-cover">
                <div class="p-4">
                    <div class="flex justify-between text-2xl mb-3">
                        <div>
                            <button class="like-btn" data-post-id="${postJSON.id}" data-like-id="${postJSON.current_user_like_id || ''}">
                                <i class="${postJSON.current_user_like_id ? 'fas' : 'far'} fa-heart" style="color: ${postJSON.current_user_like_id ? 'red' : 'black'};"></i>
                            </button>
                            <button><i class="far fa-comment"></i></button>
                            <button><i class="far fa-paper-plane"></i></button>
                        </div>
                        <div>
                            ${renderBookmarkButton(postJSON)}
                        </div>
                    </div>
                    <p class="font-bold mb-3"><span id="like-count-${postJSON.id}">${postJSON.likes.length}</span> likes</p>
                    <div class="text-sm mb-3">
                        <p>
                            <strong>${postJSON.user.username}</strong>
                            ${postJSON.caption} <button class="button">more</button>
                        </p>
                    </div>
                    <p class="uppercase text-gray-500 text-xs">1 day ago</p>
                    
                    <!-- Render Comments -->
                    <div class="comments-section" id="comments-section-${postJSON.id}">
                        ${renderComments(postJSON.comments, postJSON.id)}
                    </div>
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

        container.insertAdjacentHTML("beforeend", template);
    });

    attatchBookmarkListeners(postListJSON);
    attachLikeListeners(postListJSON);
}

//  async Function Declarations
async function initializeScreen() {
    token = await getAccessToken(rootURL, username, password);
    showNav();
    await getAndShowData();
    await getPosts();
    await getSuggestions();
}

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
        console.log(" getAndShowData API Response:", data);  
        username = data.username;  
        console.log("Username:", username);
        console.log("Profile Image URL:", data.image_url);
        renderProfile(data);  
    } else {
        console.error("Failed to fetch profile data:", response.status);
    }
}

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
    console.error(data);
    renderPosts(data);
}

async function getSuggestions() {
    const response = await fetch(`${rootURL}/api/suggestions`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.ok) {
        const data = await response.json();
        console.log("Suggestions data:", data);
        renderSuggestions(data); 
        renderStories(data);        
    } else {
        console.error("Failed to fetch suggestions:", response.status)
    }
}


async function followUser(username) {
    const response = await fetch(`${rootURL}/api/follow`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ username }),
    });
    if (response.ok) {
        console.log(`You followed ${username}`);
    } else {
        console.error("failed to follow user:", response.status);
    }
}

//  Window. functions
window.createBookmark = async function (postId) {  
    const postData = {post_id: postId}; 
    const response = await fetch (
        `${rootURL}/api/bookmarks`,  
        {
            
            method: "POST",  
            headers: {       
                "Content-Type": "application/json",  
                Authorization: `Bearer ${token}`,    
            },
            body: JSON.stringify(postData),
        }
    );
    const data = await response.json();  
    console.log(data);
};

window.toggleBookmark = async function (buttonEl, postJSON) {  
    const iconEl = buttonEl.querySelector("i");                

    console.log("Toggle bookmark for post:", postJSON.id);      

    if (postJSON.current_user_bookmark_id) {
        console.log("Remove bookmark for post:" , postJSON.id);
        const response = await fetch (
            `${rootURL}/api/bookmarks/${postJSON.current_user_bookmark_id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("Response from bookmark remove:" , response);
        if (response.ok) {
            iconEl.classList.remove("fas");
            iconEl.classList.add("far");
            postJSON.current_user_bookmark_id = null;
        }
    } else {
        console.log("Add bookmark for post:", postJSON.id);
        const response = await fetch(
            `${rootURL}/api/bookmarks/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ post_id: postJSON.id }),
            }
        );
        console.log("Bookmark add Response:", response);
        const data = await response.json();
        console.log("Bookmark Added:", data);
        if (response.ok)  {
            iconEl.classList.remove("far");
            iconEl.classList.add("fas");
            postJSON.current_user_bookmark_id = data.id;
        }
    }
};

window.toggleLike = async function (buttonEl, postJSON) {
    const iconEl = buttonEl.querySelector("i");
    const likeCountEl = document.getElementById(`like-count-${postJSON.id}`);

    console.log("Toggling like for post:", postJSON.id);

    if (postJSON.current_user_like_id) {
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
            iconEl.style.color = "";
            postJSON.current_user_like_id = null;
            postJSON.likes.length -= 1;
            likeCountEl.textContent = postJSON.likes.length;
        }
    } else {
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
            iconEl.style.color = "red";
            postJSON.current_user_like_id = data.id;
            postJSON.likes.length += 1;
            likeCountEl.textContent = postJSON.likes.length;
        }
    }
};

initializeScreen();
