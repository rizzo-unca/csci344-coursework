document.addEventListener('DOMContentLoaded', function() {
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
});