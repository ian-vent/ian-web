// Header scroll effect
const header = document.querySelector('.main-header');
const content = document.querySelector('.content');
const ianMain = document.querySelector('.ian-main');
const companyIntro = document.querySelector('.company-intro');
const features = document.querySelector('.features');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const mainHeight = ianMain.offsetHeight;
    const companyIntroBottom = companyIntro.getBoundingClientRect().bottom;
    const scrollProgress = Math.min(currentScroll / (mainHeight * 0.5), 1);
    
    // Update header visibility
    if (scrollProgress > 0.5) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Main section fade out
    if (scrollProgress < 1) {
        ianMain.style.opacity = 1 - scrollProgress;
        
        // Content fade in only after main is completely faded out
        if (scrollProgress > 0.8) { // main이 거의 사라졌을 때
            const contentProgress = (scrollProgress - 0.8) * 5; // 0.8~1.0 구간을 0~1로 변환
            content.style.opacity = contentProgress;
            
            if (contentProgress > 0.1) {
                content.classList.add('visible');
                
                // Company intro appears first
                if (contentProgress > 0.2) {
                    companyIntro.classList.add('visible');
                }
                
                // Features appears when company intro is almost scrolled past
                if (companyIntroBottom < window.innerHeight * 1.5) {
                    features.classList.add('visible');
                } else {
                    features.classList.remove('visible');
                }
            } else {
                content.classList.remove('visible');
                companyIntro.classList.remove('visible');
                features.classList.remove('visible');
            }
        } else {
            content.style.opacity = 0;
            content.classList.remove('visible');
            companyIntro.classList.remove('visible');
            features.classList.remove('visible');
        }
    } else {
        // When fully scrolled
        ianMain.style.opacity = 0;
        content.style.opacity = 1;
        content.classList.add('visible');
        companyIntro.classList.add('visible');
        features.classList.add('visible');
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