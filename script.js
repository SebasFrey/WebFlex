document.addEventListener('DOMContentLoaded', () => {
    const navSlide = () => {
      const burger = document.querySelector('.burger');
      const nav = document.querySelector('.nav-links');
      const navLinks = document.querySelectorAll('.nav-links li');
      const dropdown = document.querySelector('.dropdown');

      burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

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

      // Handle dropdown on mobile
      if (dropdown) {
        dropdown.addEventListener('click', (e) => {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
          }
        });
      }
    }

    const scrollAnimation = () => {
      const features = document.querySelectorAll('.feature');
      const tools = document.querySelectorAll('.tool-item');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          } else {
            entry.target.classList.remove('show');
          }
        });
      }, { threshold: 0.5, rootMargin: '0px 0px -50px 0px' });

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

    const smoothScroll = () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
          });
        });
      });
    }

    const stickyHeader = () => {
      const header = document.querySelector('header');
      const headerHeight = header.offsetHeight;
      let lastScrollTop = 0;

      window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
          header.style.transform = `translateY(-${headerHeight}px)`;
        } else {
          header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
      });
    }

    const lazyLoadImages = () => {
      const images = document.querySelectorAll('img[data-src]');
      const options = {
        threshold:  0,
        rootMargin: '0px 0px 200px 0px'
      };

      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      }, options);

      images.forEach(img => imageObserver.observe(img));
    }

    const initializeSlider = () => {
      const slider = document.querySelector('.slider');
      if (slider) {
        const slides = slider.querySelectorAll('.slide');
        const prevBtn = slider.querySelector('.prev');
        const nextBtn = slider.querySelector('.next');
        let currentSlide = 0;

        const showSlide = (n) => {
          slides[currentSlide].classList.remove('active');
          currentSlide = (n + slides.length) % slides.length;
          slides[currentSlide].classList.add('active');
        }

        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
      }
    }

    const initializeTabs = () => {
      const tabContainers = document.querySelectorAll('.tab-container');
      tabContainers.forEach(container => {
        const tabs = container.querySelectorAll('.tab');
        const tabContents = container.querySelectorAll('.tab-content');

        tabs.forEach((tab, index) => {
          tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            tabContents[index].classList.add('active');
          });
        });
      });
    }

    navSlide();
    scrollAnimation();
    scrollToTop();
    handleReviewForm();
    smoothScroll();
    stickyHeader();
    lazyLoadImages();
    initializeSlider();
    initializeTabs();
  });