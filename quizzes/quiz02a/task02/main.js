// function to insert the code from the test website
function insertTrackSnippet(targetSelector ='#track-list', position = 'beforeend') {
    const trackSnippet= `
     <section class="track">
        <img src="https://i.scdn.co/image/ab67616d0000b273f6e31941d10e4819d290af41">
        <div>
            <h3>When the Sun Hits</h3>
            <p>Slowdive</p>
            <p>Souvlaki</p>
        </div>
    </section>

`;

    const targetElement = document.querySelector(targetSelector)

    // Debugging & error handeling
    if (!targetElement) {
        console.error(`Target element not found: ${targetSelector}`);
        return;
    }

   targetElement.insertAdjacentHTML(position, trackSnippet);
}


    // function to use the button to do said insertion
    const insertButton = document.getElementById('insert');{
        if (insertButton) {
            insertButton.addEventListener('click', function() {
                insertTrackSnippet();
            });
        }
   }