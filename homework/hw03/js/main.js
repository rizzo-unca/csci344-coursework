import { getAccessToken } from "./utilities.js";
const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "ryan";
let password = "password";

async function initializeScreen() {
    // this function gets invoced when the page loads
    token = await getToken();
    showNav();
    // get posts;
    getPosts();
}

async function getToken() {
    return await getAccessToken(rootURL, username, password);
}

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

// implement remaining functionality below:



//await / async syntax:
async function getPosts() {
    const response = await fetch("https://photo-app-secured.herokuapp.com/api/posts/?limit=10", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    const data = await response.json();
    console.log(data);
    renderPosts(data);
}

// Function to make our bookmarks
function renderBookmarkButton(postJSON) {
    let template = "";
    if (postJSON.current_user_bookmark_id) {
        template = `
            <button class="bookmark-button" data-post-id="${postJSON.id}" data-bookmark-id="${postJSON.current_user_bookmark_id}">
                <i class="fas fa-bookmark"></i>
            </button>
        `;
    } else {
        template = `
            <button class="bookmark-button" data-post-id="${postJSON.id}" data-bookmark-id="null">
                <i class="far fa-bookmark"></i>
            </button>
        `;
    }
    return template;
}

function renderPost(postJSON) {
    const template = `
<section class="bg-white border mb-10">
            <div class="p-4 flex justify-between">
                <h3 class="text-lg font-Comfortaa font-bold">${postJSON.user.username}</h3>
                <button class="icon-button"><i class="fas fa-ellipsis-h"></i></button>
            </div>
            <img src="${postJSON.image_url}" alt="placeholder image" width="300" height="300"
                class="w-full bg-cover">
            <div class="p-4">
                <div class="flex justify-between text-2xl mb-3">
                    <div>
                        <button><i class="far fa-heart"></i></button>
                        <button><i class="far fa-comment"></i></button>
                        <button><i class="far fa-paper-plane"></i></button>
                    </div>
                    <div>
                        ${renderBookmarkButton(postJSON)}
                    </div>
                </div>
                <p class="font-bold mb-3">${postJSON.likes.length}</p>
                <div class="text-sm mb-3">
                    <p>
                        <strong>${postJSON.user.username}</strong>
                        ${postJSON.caption} <button class="button">more</button>
                    </p>
                </div>
                <p class="text-sm mb-3">
                    <strong>lizzie</strong>
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
    const container = document.querySelector('main');
    container.insertAdjacentHTML('beforeend', template);
}

function renderLikeButton(post.JSON) {
    let template = "";
    const userLiked = post.JSON.likes.some(like => like.user.usermname === username;
        if (userLiked) {
            template = `
                <button class`
        }
    )
}

function renderPosts(postListJSON) {
    postListJSON.forEach(renderPost)

    // Bookmark 
    document.querySelector('main').addEventListener('click', async (event) => {
        if (event.target.classList.contains('bookmark-button') || event.target.parentElement.classList.contains('bookmark-button')) {
            const button = event.target.classList.contains('bookmark-button') ? event.target : event.target.parentElement;
            const postId = button.dataset.postId;
            const bookmarkId = button.dataset.bookmarkId;
            await toggleBookmark(postId, bookmarkId, button);
        }
    });
}

const postData = {
    "post_id": 1
};

async function toggleBookmark(postId, bookmarkId, button) {
    try {
        let response;
        if (bookmarkId === 'null') {
            response = await fetch(`${rootURL}/api/bookmarks/`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ post_id: postId})
            });
        } else {
            response = await fetch(`${rootURL}/api/bookmarks/${bookmarkId}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        }

        // UI changes for bookmark
        if(bookmarkId === 'null'){
            button.innerHTML = '<i class="fas fa-bookmark"></i>';
            const data = await response.json();
            button.dataset.bookmarkId = data.id;
        } else {
            button.innerHTML = '<i class="far fa-bookmark"></i>';
            button.dataset.bookmarkId = "null";
        }
    }

    catch (error) {
        console.error("Bookmark toggle error", error);
    }


}
// after all of the functions are defined, invoke initalize at the bottom:
initializeScreen();