// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });
}

// Phone screenshot carousel
const slides = Array.from(document.querySelectorAll('.slide'));
const dots = Array.from(document.querySelectorAll('.dot'));
let activeIndex = 0;
let timer = null;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function goTo(index) {
    if (index === activeIndex) return;
    slides[activeIndex].classList.remove('is-active');
    dots[activeIndex].classList.remove('is-active');
    dots[activeIndex].setAttribute('aria-selected', 'false');

    activeIndex = index;

    slides[activeIndex].classList.add('is-active');
    dots[activeIndex].classList.add('is-active');
    dots[activeIndex].setAttribute('aria-selected', 'true');
}

function next() {
    goTo((activeIndex + 1) % slides.length);
}

function startAutoplay() {
    if (prefersReducedMotion) return;
    stopAutoplay();
    timer = setInterval(next, 4000);
}

function stopAutoplay() {
    if (timer) clearInterval(timer);
}

dots.forEach((dot) => {
    dot.addEventListener('click', () => {
        goTo(Number(dot.dataset.target));
        startAutoplay();
    });
});

const phone = document.querySelector('.phone');
if (phone) {
    phone.addEventListener('mouseenter', stopAutoplay);
    phone.addEventListener('mouseleave', startAutoplay);
}

if (slides.length && dots.length) {
    startAutoplay();
}