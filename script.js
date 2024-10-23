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
            const dropdownContent = dropdown.querySelector('.dropdown-content');
            if (dropdownContent.style.maxHeight) {
              dropdownContent.style.maxHeight = null;
            } else {
              dropdownContent.style.maxHeight = dropdownContent.scrollHeight + "px";
            }
          }
        });
      }
    }

    const scrollAnimation = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      elements.forEach(element => {
        observer.observe(element);
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
          const formData = new FormData(form);
          const name = formData.get('name');
          const email = formData.get('email');
          const rating = formData.get('rating');
          const comment = formData.get('comment');

          // Validate form data
          if (!name || !email || !rating || !comment) {
            showMessage('Por favor, completa todos los campos.', 'error');
            return;
          }

          if (!isValidEmail(email)) {
            showMessage('Por favor, introduce un email válido.', 'error');
            return;
          }

          // Here you would typically send the form data to a server
          // For now, we'll just show a success message
          showMessage('Gracias por tu reseña. Ha sido enviada correctamente.', 'success');
          form.reset();
        });
      }
    }

    const isValidEmail = (email) => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    const showMessage = (message, type) => {
      const messageElement = document.createElement('div');
      messageElement.textContent = message;
      messageElement.classList.add(type === 'error' ? 'error-message' : 'success-message');
      messageElement.style.opacity = '0';

      const form = document.getElementById('review-form');
      form.appendChild(messageElement);

      // Fade in
      setTimeout(() => {
        messageElement.style.transition = 'opacity 0.5s ease';
        messageElement.style.opacity = '1';
      }, 10);

      // Remove message after 5 seconds
      setTimeout(() => {
        messageElement.style.opacity = '0';
        setTimeout(() => {
          messageElement.remove();
        }, 500);
      }, 5000);
    }

    const initializeLazyLoading = () => {
      const lazyImages = document.querySelectorAll('img[data-src]');
      const lazyVideos = document.querySelectorAll('video[data-src]');

      const lazyLoad = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const media = entry.target;
            media.src = media.dataset.src;
            media.removeAttribute('data-src');
            observer.unobserve(media);
          }
        });
      };

      const mediaObserver = new IntersectionObserver(lazyLoad, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      });

      lazyImages.forEach(image => mediaObserver.observe(image));
      lazyVideos.forEach(video => mediaObserver.observe(video));
    }

    const initializeToolsFilter = () => {
      const filterButtons = document.querySelectorAll('.filter-btn');
      const toolItems = document.querySelectorAll('.tool-item');

      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          const filter = button.dataset.filter;

          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');

          toolItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
              item.style.display = 'block';
              setTimeout(() => item.style.opacity = '1', 10);
            } else {
              item.style.opacity = '0';
              setTimeout(() => item.style.display = 'none', 500);
            }
          });
        });
      });
    }

    const initializeToolSearch = () => {
      const searchInput = document.getElementById('tool-search');
      const toolItems = document.querySelectorAll('.tool-item');

      searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();

        toolItems.forEach(item => {
          const toolName = item.querySelector('h3').textContent.toLowerCase();
          const toolDescription = item.querySelector('p').textContent.toLowerCase();

          if (toolName.includes(searchTerm) || toolDescription.includes(searchTerm)) {
            item.style.display = 'block';
            setTimeout(() => item.style.opacity = '1', 10);
          } else {
            item.style.opacity = '0';
            setTimeout(() => item.style.display = 'none', 500);
          }
        });
      });
    }

    const initializeAccordion = () => {
      const accordionItems = document.querySelectorAll('.accordion-item');

      accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');

        header.addEventListener('click', () => {
          item.classList.toggle('active');

          if (item.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + "px";
          } else {
            content.style.maxHeight = null;
          }
        });
      });
    }

    const initializeTabNavigation = () => {
      const tabButtons = document.querySelectorAll('.tab-button');
      const tabContents = document.querySelectorAll('.tab-content');

      tabButtons.forEach(button => {
        button.addEventListener('click', () => {
          const tabId = button.dataset.tab;

          tabButtons.forEach(btn => btn.classList.remove('active'));
          tabContents.forEach(content => content.classList.remove('active'));

          button.classList.add('active');
          document.getElementById(tabId).classList.add('active');
        });
      });
    }

    const initializeToolRating = () => {
      const ratingContainers = document.querySelectorAll('.tool-rating');

      ratingContainers.forEach(container => {
        const stars = container.querySelectorAll('.star');
        const ratingValue = container.querySelector('.rating-value');

        stars.forEach((star, index) => {
          star.addEventListener('click', () => {
            const rating = index + 1;
            ratingValue.textContent = rating.toFixed(1);

            stars.forEach((s, i) => {
              if (i < rating) {
                s.classList.add('active');
              } else {
                s.classList.remove('active');
              }
            });
          });
        });
      });
    }

    const initializeToolComparison = () => {
      const comparisonTable = document.querySelector('.comparison-table');
      if (comparisonTable) {
        const rows = comparisonTable.querySelectorAll('tr');
        const headerCells = rows[0].querySelectorAll('th');

        headerCells.forEach((cell, index) => {
          if (index > 0) {
            cell.addEventListener('click', () => {
              const isAscending = cell.classList.contains('sort-asc');
              const columnValues = Array.from(rows).slice(1).map(row => ({
                value: row.cells[index].textContent,
                row: row
              }));

              columnValues.sort((a, b) => {
                if (isAscending) {
                  return b.value.localeCompare(a.value, undefined, { numeric: true, sensitivity: 'base' });
                } else {
                  return a.value.localeCompare(b.value, undefined, { numeric: true, sensitivity: 'base' });
                }
              });

              columnValues.forEach(item => comparisonTable.appendChild(item.row));

              headerCells.forEach(c => c.classList.remove('sort-asc', 'sort-desc'));
              cell.classList.toggle('sort-asc', !isAscending);
              cell.classList.toggle('sort-desc', isAscending);
            });
          }
        });
      }
    }

    const initializeToolTips = () => {
      const toolTips = document.querySelectorAll('[data-tooltip]');

      toolTips.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.textContent = tooltipText;

        element.appendChild(tooltip);

        element.addEventListener('mouseenter', () => {
          tooltip.style.opacity = '1';
          tooltip.style.visibility = 'visible';
        });

        element.addEventListener('mouseleave', () => {
          tooltip.style.opacity = '0';
          tooltip.style.visibility = 'hidden';
        });
      });
    }

    const initializeProgressBars = () => {
      const progressBars = document.querySelectorAll('.progress-bar');

      const animateProgressBar = (bar) => {
        const value = bar.dataset.value;
        let width = 0;
        const interval = setInterval(() => {
          if (width >= value) {
            clearInterval(interval);
          } else {
            width++;
            bar.style.width = width + '%';
            bar.textContent = width + '%';
          }
        }, 10);
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateProgressBar(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      progressBars.forEach(bar => observer.observe(bar));
    }

    navSlide();
    scrollAnimation();
    scrollToTop();
    handleReviewForm();
    initializeLazyLoading();
    initializeToolsFilter();
    initializeToolSearch();
    initializeAccordion();
    initializeTabNavigation();
    initializeToolRating();
    initializeToolComparison();
    initializeToolTips();
    initializeProgressBars();
  });