   /**
 * About Page - Interactive Features & Animations
 * Enhances user experience with smooth scrolling, animations, and dynamic interactions
 */

// ===================================
// Animated Particle Background
// ===================================

function createParticles() {
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 20) + 's';
        document.body.appendChild(particle);
    }
}

// Initialize particles on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createParticles);
} else {
    createParticles();
}

// ===================================
// Smooth Scroll for Navigation Links
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Update active navigation link
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// ===================================
// Intersection Observer for Animations
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all developer cards
document.querySelectorAll('.developer-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// ===================================
// Active Navigation Link on Scroll
// ===================================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===================================
// Parallax Effect for Hero Section
// ===================================

const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    if (heroBackground) {
        const scrollPosition = window.pageYOffset;
        heroBackground.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// ===================================
// Card Hover Effects
// ===================================

document.querySelectorAll('.developer-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// ===================================
// Social Icon Click Handler with Link Navigation
// ===================================

document.querySelectorAll('.social-link').forEach(icon => {
    icon.addEventListener('click', function(e) {
        // Allow default link behavior to navigate
        const platform = this.getAttribute('data-platform');
        const url = this.getAttribute('href');
        const developerName = this.closest('.developer-card').querySelector('.developer-name').textContent;
        
        // Log the action for analytics or debugging
        console.log(`Opening ${platform} profile for ${developerName}: ${url}`);
        
        // The link will open in a new tab due to target="_blank"
        // If you want to prevent default and handle it manually, uncomment below:
        // e.preventDefault();
        // window.open(url, '_blank', 'noopener,noreferrer');
    });
});

// ===================================
// Lazy Loading for Images
// ===================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Image will load naturally, but you can add custom logic here
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('.developer-image').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Keyboard Navigation
// ===================================

document.addEventListener('keydown', (e) => {
    // Escape key to close any open modals (if added in future)
    if (e.key === 'Escape') {
        console.log('Escape key pressed');
    }

    // Tab key for accessibility
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ===================================
// Smooth Fade-in on Page Load
// ===================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease-in';
});

// ===================================
// Performance: Debounce Scroll Events
// ===================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedScroll = debounce(() => {
    // Add any expensive scroll operations here
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ===================================
// Console Welcome Message
// ===================================

console.log('%c🚀 Welcome to Our Team!', 'font-size: 20px; color: #3b82f6; font-weight: bold;');
console.log('%cCheck out our amazing developers and their contributions to this project.', 'font-size: 14px; color: #60a5fa;');
