// Assuming your images are in 'src/img' and you want them copied to 'dist/img'
// This example uses a dynamic require context which Webpack understands
function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context('./img', false, /\.(png|jpe?g|svg)$/));

let currentImageIndex = 0;
const carousel = document.getElementById('carousel');

function changeImage() {
    carousel.src = images[currentImageIndex];
    currentImageIndex = (currentImageIndex + 1) % images.length;
}

changeImage(); // Display the first image initially
setInterval(changeImage, 3000); // Change image every 3 seconds