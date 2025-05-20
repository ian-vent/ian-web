// Header scroll effect
const header = document.querySelector('.main-header');
const content = document.querySelector('.content');
const ianMain = document.querySelector('.ian-main');
const companyIntro = document.querySelector('.company-intro');
const introContent = document.querySelector('.intro-content');
const features = document.querySelector('.features');
const featureItems = document.querySelectorAll('.feature-item');
const featureIntroduce = document.querySelector('.feature-introduce');
const featureItemsContainer = document.querySelector('.feature-items-container');
const featureIntroduceContent = document.querySelector('.feature-introduce-content');
const featureIntroduceBg = document.querySelector('.feature-introduce-bg');
let lastScroll = 0;
let scrollDirection = 'down';

// 스크롤 방향 감지 함수
function updateScrollDirection() {
    const currentScroll = window.pageYOffset;
    scrollDirection = currentScroll > lastScroll ? 'down' : 'up';
    
    // body에 스크롤 방향 클래스 추가/제거
    if (scrollDirection === 'up') {
        document.body.classList.add('scrolling-up');
        document.body.classList.remove('scrolling-down');
    } else {
        document.body.classList.add('scrolling-down');
        document.body.classList.remove('scrolling-up');
    }
    
    lastScroll = currentScroll;
}

// 메인 스크롤 이벤트
window.addEventListener('scroll', () => {
    updateScrollDirection();
    
    const currentScroll = window.pageYOffset;
    const mainHeight = ianMain.offsetHeight;
    const companyIntroBottom = companyIntro.getBoundingClientRect().bottom;
    const introContentBottom = introContent ? introContent.getBoundingClientRect().bottom : 0;
    const scrollProgress = Math.min(currentScroll / (mainHeight * 0.5), 1);
    
    // 헤더 가시성 업데이트
    if (scrollProgress > 0.5) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // 메인 섹션 페이드 아웃
    if (scrollProgress < 1) {
        ianMain.style.opacity = 1 - scrollProgress;
        
        // 메인이 거의 사라진 후 콘텐츠 페이드 인
        if (scrollProgress > 0.8) {
            const contentProgress = (scrollProgress - 0.8) * 5;
            content.style.opacity = contentProgress;
            
            if (contentProgress > 0.1) {
                content.classList.add('visible');
                
                // Company intro 먼저 표시
                if (contentProgress > 0.1) {
                    companyIntro.classList.add('visible');
                }
                
                // intro-content 스크롤이 끝났을 때 features 표시
                if (introContentBottom < window.innerHeight * 0.3) {
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
        // 완전히 스크롤된 경우
        ianMain.style.opacity = 0;
        content.style.opacity = 1;
        content.classList.add('visible');
        companyIntro.classList.add('visible');
        
        // intro-content 스크롤이 끝나면 features 표시
        if (introContentBottom < window.innerHeight * 0.3) {
            features.classList.add('visible');
        } else {
            features.classList.remove('visible');
        }
    }
});

// 각 feature 아이템에 대한 개별 IntersectionObserver 설정
featureItems.forEach((item, index) => {
    const featureObserver = new IntersectionObserver((entries) => {
        const entry = entries[0];
        
        if (entry.isIntersecting) {
            // 아이템이 화면에 보이는 경우
            // 애니메이션 지연 설정을 위한 지연 시간 계산
            const delay = scrollDirection === 'down' ? index * 200 : (featureItems.length - index - 1) * 200;
            
            setTimeout(() => {
                item.classList.add('visible');
            }, delay);
        } else {
            // 아이템이 화면에서 벗어난 경우
            const delay = scrollDirection === 'up' ? index * 100 : (featureItems.length - index - 1) * 100;
            
            setTimeout(() => {
                item.classList.remove('visible');
            }, delay);
        }
    }, {
        // 임계값과 마진 설정 - 각 요소마다 서로 다른 임계값 설정
        threshold: [0.2, 0.4],
        rootMargin: `-${10 + (index * 5)}% 0px -${10 + (index * 5)}% 0px`
    });
    
    // 각 feature-item 관찰 시작
    featureObserver.observe(item);
});

// feature-introduce 섹션 관찰
if (featureIntroduce) {
    const featureIntroduceObserver = new IntersectionObserver((entries) => {
        const entry = entries[0];
        
        if (entry.isIntersecting) {
            // feature-introduce가 화면에 보이면 features 섹션 가시화
            if (scrollDirection === 'down' && entry.intersectionRatio > 0.7) {
                features.classList.add('visible');
            } else if (scrollDirection === 'up' && entry.intersectionRatio < 0.3) {
                features.classList.remove('visible');
            }
        }
    }, {
        threshold: [0.1, 0.3, 0.5, 0.7, 0.9]
    });
    
    featureIntroduceObserver.observe(featureIntroduce);
}

// 스크롤 이벤트 최적화 - 디바운싱
let scrollTimer;
let isScrolling = false;

window.addEventListener('scroll', () => {
    // 스크롤 중임을 표시
    isScrolling = true;
    updateScrollDirection();
    clearTimeout(scrollTimer);
    
    // 스크롤이 멈춘 후 200ms가 지나면 스크롤 종료로 간주
    scrollTimer = setTimeout(() => {
        isScrolling = false;
        
        // 스크롤이 끝났을 때 현재 화면에 표시된 feature 항목들의 가시성 재계산
        featureItems.forEach((item) => {
            const itemRect = item.getBoundingClientRect();
            const isVisible = 
                itemRect.top < window.innerHeight * 0.8 && 
                itemRect.bottom > window.innerHeight * 0.2;
                
            if (isVisible) {
                item.classList.add('visible');
            } else if (itemRect.bottom < 0 || itemRect.top > window.innerHeight) {
                item.classList.remove('visible');
            }
        });
    }, 200);
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

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Feature section scroll animation
function handleFeatureScroll() {
    const rect = featureIntroduce.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Show feature introduce content when it's in view
    if (rect.top < windowHeight * 0.8) {
        featureIntroduceContent.style.opacity = '1';
        featureIntroduceContent.style.transform = 'translateY(0)';
        featureIntroduceBg.style.transform = 'scale(1)';
    }
    
    // Show feature items when feature introduce is scrolled past
    if (rect.bottom < windowHeight * 0.5) {
        featureItemsContainer.classList.add('visible');
    }
}

window.addEventListener('scroll', handleFeatureScroll);
window.addEventListener('load', handleFeatureScroll);

// Feature Introduce scroll fade-in
function handleFeatureIntroduceScroll() {
    const featureIntroduce = document.querySelector('.feature-introduce');
    if (!featureIntroduce) return;
    const rect = featureIntroduce.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < windowHeight * 0.85) {
        featureIntroduce.classList.add('visible');
    } else {
        featureIntroduce.classList.remove('visible');
    }
}

window.addEventListener('scroll', handleFeatureIntroduceScroll);
window.addEventListener('load', handleFeatureIntroduceScroll); 