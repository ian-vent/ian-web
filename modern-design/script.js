// Header scroll effect
const header = document.querySelector('.main-header');
const content = document.querySelector('.content');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const heroHeight = document.querySelector('.hero').offsetHeight;
    const scrollProgress = Math.min(currentScroll / (heroHeight * 0.5), 1);
    
    // Update header visibility
    if (scrollProgress > 0.5) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Update hero section and content transition
    const hero = document.querySelector('.hero');
    
    if (scrollProgress < 1) {
        // Hero section fade out
        hero.style.opacity = 1 - scrollProgress;
        
        // Content fade in only after hero is completely faded out
        if (scrollProgress > 0.8) { // hero가 거의 사라졌을 때
            const contentProgress = (scrollProgress - 0.8) * 5; // 0.8~1.0 구간을 0~1로 변환
            content.style.opacity = contentProgress;
            
            if (contentProgress > 0.1) {
                content.classList.add('visible');
                
                // Animate sections with delay
                const sections = document.querySelectorAll('.features, .company-intro');
                sections.forEach((section, index) => {
                    if (contentProgress > 0.2 + (index * 0.15)) {
                        section.classList.add('visible');
                    }
                });
            } else {
                content.classList.remove('visible');
            }
        } else {
            content.style.opacity = 0;
            content.classList.remove('visible');
        }
    } else {
        // When fully scrolled
        hero.style.opacity = 0;
        content.style.opacity = 1;
        content.classList.add('visible');
        
        // Show all sections
        document.querySelectorAll('.features, .company-intro').forEach(section => {
            section.classList.add('visible');
        });
    }
    
    lastScroll = currentScroll;
});

// Scroll reveal animation for all pages
const revealElements = document.querySelectorAll('.reveal-text');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(element => {
    observer.observe(element);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}); 