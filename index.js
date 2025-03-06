document.addEventListener('DOMContentLoaded', function() {
    const mobileMessage = document.getElementById('mobile-message');

    function showMobileMessage() {
        if (window.innerWidth <= 768) {
            mobileMessage.style.display = 'block'; // Show the message

            // Set a timeout to add the slide-down class after 7 seconds
            setTimeout(function() {
                mobileMessage.classList.add('slide-down'); // Add the slide-down class to trigger the animation
            }, 7000); // 7000ms = 7 seconds

            // Set a timeout to hide the message completely after 7.5 seconds (to ensure animation completes)
            setTimeout(function() {
                mobileMessage.style.display = 'none'; // Hide the message completely
                mobileMessage.classList.remove('slide-down'); // Remove slide-down class for next time
            }, 7500); // 7500ms = 7.5 seconds to allow animation to finish
        }
    }

    // Check on page load
    showMobileMessage();

    // Add event listener to check on resize
    window.addEventListener('resize', function() {
        // Ensure the message is shown or hidden based on current screen size
        if (window.innerWidth <= 768) {
            showMobileMessage(); // Show the message on mobile
        } else {
            mobileMessage.style.display = 'none'; // Hide the message on larger screens
            mobileMessage.classList.remove('slide-down'); // Remove slide-down class if resizing to larger screen
        }
    });
});

const linkSections = document.querySelectorAll('.tutorial-links a, .homework-links a, .quiz-links a');

let maxWidth = 0;

linkSections.forEach(link => {
    const width = link.offsetWidth; // Get the element's width
    maxWidth = Math.max(maxWidth, width);
});

linkSections.forEach(link => {
    link.style.width = maxWidth + 'px';
    link.style.boxSizing = 'border-box'; // Include padding and border in width
    link.style.display = 'flex'; // Use flexbox for consistent alignment
    link.style.justifyContent = 'center'; // Center the text
});
