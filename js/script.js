document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Reveal text animation
    const revealTexts = document.querySelectorAll('.reveal-text');
    
    function revealOnScroll() {
        revealTexts.forEach(text => {
            const textTop = text.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (textTop < windowHeight * 0.8) {
                text.style.opacity = '1';
                text.style.transform = 'translateY(0)';
            }
        });
    }

    // Initial check for elements in view
    revealOnScroll();

    // Add scroll event listener
    window.addEventListener('scroll', revealOnScroll);

    // Submenu hover effect for desktop
    const navWithSub = document.querySelectorAll('.nav-with-sub');
    
    navWithSub.forEach(nav => {
        const submenu = nav.querySelector('.submenu');
        if (submenu) {
            nav.addEventListener('mouseenter', () => {
                submenu.style.display = 'block';
            });
            
            nav.addEventListener('mouseleave', () => {
                submenu.style.display = 'none';
            });
        }
    });
}); 