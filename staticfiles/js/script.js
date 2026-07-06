document.addEventListener('DOMContentLoaded', () => {
    // Theme Switcher Logic
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Add a temporary ripple/rotate effect on click
            themeToggleBtn.classList.add('clicked');
            setTimeout(() => themeToggleBtn.classList.remove('clicked'), 300);
        });
    }

    // Typewriter Effect for the Hero Subtitle
    const subtitleEl = document.querySelector('.hero-subtitle');
    if (subtitleEl) {
        const roles = [
            "Machine Learning Engineer",
            "Django Developer",
            "Full-Stack AI Enthusiast"
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 80;

        function type() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                subtitleEl.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 40; // speed up deletion
            } else {
                subtitleEl.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 80;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                typingSpeed = 2200; // pause at the end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 400; // pause before next word
            }

            setTimeout(type, typingSpeed);
        }

        // Add visual cursor class
        subtitleEl.classList.add('typewriter-active');
        setTimeout(type, 800);
    }

    // Sticky Frosted Glass Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Custom Interactive Pink Cursor (Desktop Fine Pointer Only)
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        if (window.matchMedia('(pointer: fine)').matches) {
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });

            // Expand cursor on hovering interactive items
            const attachCursorEvents = () => {
                const hoverables = document.querySelectorAll('a, button, .project-card, .social-icon, .tag, .contact-detail-card, .theme-toggle, .stat-card, .timeline-item');
                hoverables.forEach(item => {
                    item.addEventListener('mouseenter', () => cursor.classList.add('hover'));
                    item.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
                });
            };
            attachCursorEvents();
            
            // Re-run on layout change/navigation to ensure new items register
            document.addEventListener('DOMNodeInserted', attachCursorEvents);
        } else {
            // Hide cursor element on touch devices
            cursor.style.display = 'none';
        }
    }

    // Initialize AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 900,
            once: true,
            easing: 'ease-out-quad'
        });
    }
});