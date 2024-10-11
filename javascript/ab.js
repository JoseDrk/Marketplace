const images = document.querySelector('.carousel-images');
const totalImages = document.querySelectorAll('.carousel-images img').length;
let currentIndex = 0;

document.querySelector('.next').addEventListener('click', function() {
    if (currentIndex < totalImages - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateCarousel();
});

document.querySelector('.prev').addEventListener('click', function() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalImages - 1;
    }
    updateCarousel();
});

function updateCarousel() {
    const imageWidth = images.querySelector('img').clientWidth;
    images.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
}

window.addEventListener('resize', updateCarousel);
