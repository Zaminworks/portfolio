// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animations
gsap.from(".hero-content h1", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out"
});

gsap.from(".hero-content p", {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.3,
    ease: "power3.out"
});

gsap.from(".hero-content .btn", {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.6,
    ease: "power3.out"
});

// Section Animations
gsap.utils.toArray(".section").forEach(section => {
    gsap.from(section.querySelector(".section-title"), {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out"
    });

    gsap.from(section.querySelectorAll(".skill-card, .project-card, .about-content, #contact-form, .social-links"), {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });
});

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scroll
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
        navLinks.classList.remove('active');
    });
});

// Form Submission to Google Sheets
const contactForm = document.getElementById('contact-form');
const googleSheetsUrl = 'https://script.google.com/macros/s/AKfycbyH-Mon0A9qV_mFFES1393kEI54J3mTV-VFVySDrZkrD0mUYKVI0KeVS4df5gz3V-m5ZA/exec'; // Replace with your Apps Script Web App URL

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Log to confirm form submission is triggered
    console.log('Form submitted');

    // Get form data
    const formData = {
        name: contactForm.querySelector('input[name="name"]').value,
        email: contactForm.querySelector('input[name="email"]').value,
        message: contactForm.querySelector('textarea[name="message"]').value
    };

    // Log the form data to verify it's being captured correctly
    console.log('Form Data:', formData);

    // Send to Google Sheets
    fetch(googleSheetsUrl, {
        method: 'POST',
        body: new FormData(contactForm)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Google Sheets Response:', data);
        if (data.result === 'success') {
            console.log('Data successfully saved to Google Sheets, Row:', data.row);
            alert('Thank you for your message! Your submission has been recorded.');
            contactForm.reset();
        } else {
            console.error('Google Sheets Error:', data.error);
            alert('Failed to submit the form. Please try again later.');
        }
    })
    .catch(error => {
        console.error('Failed to send to Google Sheets:', error);
        alert('Failed to submit the form. Please try again later.');
    });
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Load Theme Preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}