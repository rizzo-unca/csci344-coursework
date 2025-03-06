
document.addEventListener('DOMContentLoaded', function() {
    const mobileMessage = document.getElementById('mobile-message');

    function showMobileMessage() {
        if (window.innerWidth <= 768) {
            mobileMessage.style.display = 'block'; // Show the message

            // Set a timeout to hide the message after 7 seconds
            setTimeout(function() {
                mobileMessage.style.display = 'none'; // Hide the message
            }, 7000); // 7000ms = 7 seconds
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
