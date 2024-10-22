document.addEventListener('DOMContentLoaded', () => {
    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('active');

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }

    const scrollAnimation = () => {
        const features = document.querySelectorAll('.feature');
        const tools = document.querySelectorAll('.tool-item');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                } else {
                    entry.target.classList.remove('animate');
                }
            });
        }, { threshold: 0.5 });

        features.forEach(feature => {
            observer.observe(feature);
        });

        tools.forEach(tool => {
            observer.observe(tool);
        });
    }

    const scrollToTop = () => {
        const scrollToTopBtn = document.getElementById('scroll-to-top');

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const handleReviewForm = () => {
        const form = document.getElementById('review-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                // Here you would typically send the form data to a server
                alert('Gracias por tu reseña. Ha sido enviada correctamente.');
                form.reset();
            });
        }
    }

    navSlide();
    scrollAnimation();
    scrollToTop();
    handleReviewForm();
});