import './gtm'; // This assumes you named the file gtm.js

// Assuming your images are in 'src/img' and you want them copied to 'dist/img'
// This example uses a dynamic require context which Webpack understands
function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context('./img', false, /\.(png|jpe?g|svg)$/));

let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
}

function handleTouchMove(event) {
    touchEndX = event.touches[0].clientX;
}

function handleTouchEnd() {
    if (touchStartX - touchEndX > 75) {
        // Swipe left, show next image
        changeImage();
    } else if (touchStartX - touchEndX < -75) {
        // Swipe right, show previous image
        changeImage(true); // Assuming changeImage can take a parameter to reverse direction
    }
}

// Assuming 'carousel' is the ID of your carousel element
const carouselElement = document.getElementById('carousel');

// Add event listeners
carouselElement.addEventListener('touchstart', handleTouchStart, false);
carouselElement.addEventListener('touchmove', handleTouchMove, false);
carouselElement.addEventListener('touchend', handleTouchEnd, false);

document.addEventListener('keydown', function(event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        pauseAutoMove(); // Pause automatic movement on key press

        // Optionally, restart automatic movement after a delay of inactivity
        setTimeout(startAutoMove, 10000); // Wait for 10 seconds of inactivity before resuming

        // Move the carousel based on the key pressed
        if (event.key === "ArrowLeft") {
            changeImage(true); // Show the previous image
        } else if (event.key === "ArrowRight") {
            changeImage(); // Show the next image
        }
    }
});


let currentImageIndex = 0;

function changeImage(previous = false) {
    if (previous) {
        // If 'previous' is true, show the previous image
        // Ensure currentImageIndex never goes below 0
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    } else {
        // If 'previous' is false, show the next image
        currentImageIndex = (currentImageIndex + 1) % images.length;
    }
    carousel.src = images[currentImageIndex];
}

let autoMoveInterval;
const moveInterval = 5000; // Change image every 5000 milliseconds (5 seconds)

function startAutoMove() {
    // Clear existing interval to avoid duplicates if startAutoMove is called multiple times
    if (autoMoveInterval) clearInterval(autoMoveInterval);

    autoMoveInterval = setInterval(() => {
        changeImage(); // Move to the next image automatically
    }, moveInterval);
}

function pauseAutoMove() {
    if (autoMoveInterval) clearInterval(autoMoveInterval);
}

// // Initialize the carousel with the first image
changeImage();
// Start the automatic movement when the page loads
startAutoMove();