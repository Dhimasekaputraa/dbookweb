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

// Scroll reveal animation
const revealEls = Array.from(document.querySelectorAll('.reveal'));

if (revealEls.length) {
    // Stagger cards inside the same grid so they cascade in one after another
    const groups = new Map();
    revealEls.forEach((el) => {
        const parent = el.parentElement;
        const group = groups.get(parent) || [];
        group.push(el);
        groups.set(parent, group);
    });
    groups.forEach((group) => {
        group.forEach((el, i) => {
            el.style.setProperty('--reveal-delay', `${Math.min(i * 60, 240)}ms`);
        });
    });

    if (prefersReducedMotion) {
        revealEls.forEach((el) => el.classList.add('is-visible'));
    } else {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );

        revealEls.forEach((el) => revealObserver.observe(el));
    }
}