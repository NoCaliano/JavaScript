const toggleBtn = document.querySelector(".burger-btn");
const navDrawer = document.querySelector(".burger-menu");
const track = document.querySelector(".slider-track");
const slides = Array.from(track.children);
const next = document.querySelector(".right-btn");
const prev = document.querySelector(".left-btn");
const dots = document.querySelector(".slider-dots");
const allDots = document.querySelectorAll(".dot");

let position = 0;
let intervalId;

toggleBtn.addEventListener("click", () => {
    navDrawer.classList.toggle("active");
});

function getSlideCount() {
    return window.innerWidth >= 768 ? 3 : 2;
}

function adjustSlideWidth() {
    const width = track.clientWidth / getSlideCount();
    slides.forEach(slide => {
        slide.style.minWidth = `${width}px`;
    });
}

function goToSlide(i) {
    const visible = getSlideCount();
    const max = slides.length - visible;
    position = i < 0 ? max : i > max ? 0 : i;

    const slideW = track.clientWidth / visible;
    track.style.transform = `translateX(-${slideW * position}px)`;
}

function makeDots() {
    dots.innerHTML = "";
    const total = slides.length - getSlideCount() + 1;
    for (let i = 0; i < total; i++) {
        const dot = document.createElement("span");
        if (i === position) dot.classList.add("selected");
        dot.addEventListener("click", () => {
            goToSlide(i);
            resetCycle();
        });
        dots.appendChild(dot);
    }
}

function resetCycle() {
    clearInterval(intervalId);
    startAutoSlide();
}

function startAutoSlide() {
    intervalId = setInterval(() => {
        goToSlide(position + 1);
        makeDots()
    }, 5000);
}

next.addEventListener("click", () => {
    goToSlide(position + 1);
    makeDots()
    resetCycle();
});

prev.addEventListener("click", () => {
    goToSlide(position - 1);
    resetCycle();
    makeDots()
});

window.addEventListener("resize", () => {
    adjustSlideWidth();
    goToSlide(position);
    makeDots();
});

adjustSlideWidth();
goToSlide(0);
makeDots();
startAutoSlide();
