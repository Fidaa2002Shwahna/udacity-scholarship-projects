/**
 * Define Global Variables
 */

// Select all sections
const sections = document.querySelectorAll('section');
// Select the navigation menu
const navList = document.getElementById('navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 */

// Function to check if a section is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top <= 150 && rect.bottom >= 150;
}

// Function to remove active state
function removeActiveState() {
    sections.forEach(section => {
        section.classList.remove('your-active-class');
        const navLink = document.querySelector(`a[href="#${section.id}"]`);
        if (navLink) navLink.classList.remove('active-link');
    });
}

// Function to add active state
function addActiveState(section) {
    section.classList.add('your-active-class');
    const navLink = document.querySelector(`a[href="#${section.id}"]`);
    if (navLink) navLink.classList.add('active-link');
}

/**
 * End Helper Functions
 * Begin Main Functions
 */

// Build the navigation menu
function buildNav() {
    const fragment = document.createDocumentFragment();
    sections.forEach(section => {
        const navItem = document.createElement('li');
        const navLink = document.createElement('a');
        navLink.textContent = section.getAttribute('data-nav');
        navLink.setAttribute('href', `#${section.id}`);
        navLink.classList.add('menu__link');
        navItem.appendChild(navLink);
        fragment.appendChild(navItem);
    });
    navList.appendChild(fragment);
}

// Add class 'active' to section when near top of viewport
function setActiveSection() {
    window.addEventListener('scroll', () => {
        sections.forEach(section => {
            if (isInViewport(section)) {
                removeActiveState();
                addActiveState(section);
            }
        });
    });
}

// Scroll to anchor ID using scrollIntoView event
function scrollToSection() {
    navList.addEventListener('click', event => {
        event.preventDefault();
        if (event.target.nodeName === 'A') {
            const targetSection = document.querySelector(event.target.getAttribute('href'));
            targetSection.scrollIntoView({ behavior: 'smooth' });
            removeActiveState(); // Ensure previous active state is removed
            addActiveState(targetSection); // Set active state for the clicked section
        }
    });
}

/**
 * End Main Functions
 * Begin Events
 */

// Build menu
document.addEventListener('DOMContentLoaded', buildNav);

// Set sections as active
document.addEventListener('scroll', setActiveSection);

// Scroll to section on link click
scrollToSection();
