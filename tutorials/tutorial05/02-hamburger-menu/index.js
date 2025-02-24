// Your code here
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !expanded);

});

// Closing the menu if a link is clicked
navLinks.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {  // Check if a link was clicked
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});

// Closing the menu if the user clicks outside of it on "mobile"
document.addEventListener('click', (event) => {
    if (window.innerWidth <= 768 &&
        navLinks.classList.contains('active') &&
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});


//Teacher code
/*
function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    nav.className = "nav-links active";
}

*/
