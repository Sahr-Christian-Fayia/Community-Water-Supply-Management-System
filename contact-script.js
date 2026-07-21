document.querySelectorAll('.contact-card').forEach(card => {
    // Add hover effect for better UX
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

document.querySelectorAll('.phone-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const phoneNumber = this.getAttribute('href').replace('tel:', '');
        const developerName = this.closest('.contact-card').querySelector('.contact-name').textContent;
        
        console.log(Initiating call to ${developerName} at ${phoneNumber});
        
         Log analytics or tracking
        trackContactAction('phone_call', developerName, phoneNumber);
    });
});


Email Button Handler

document.querySelectorAll('.email-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const email = this.getAttribute('href').replace('mailto:', '');
        const developerName = this.closest('.contact-card').querySelector('.contact-name').textContent;
        
        console.log(Opening email to ${developerName} at ${email});
        
         Log analytics or tracking
        trackContactAction('email_sent', developerName, email);
    });
});


 Call Button on Image Overlay


document.querySelectorAll('.call-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const phoneNumber = this.getAttribute('href').replace('tel:', '');
        const developerName = this.closest('.contact-card').querySelector('.contact-name').textContent;
        
        console.log(Quick call to ${developerName} at ${phoneNumber});
        
        // Log analytics or tracking
        trackContactAction('quick_call', developerName, phoneNumber);
    });
});


// Analytics/Tracking Function


function trackContactAction(actionType, developerName, contactInfo) {
    // You can replace this with your actual analytics service
    // Examples: Google Analytics, Mixpanel, Amplitude, etc.
    
    const timestamp = new Date().toLocaleString();
    const logEntry = {
        action: actionType,
        developer: developerName,
        contact: contactInfo,
        timestamp: timestamp,
        userAgent: navigator.userAgent
    };
    
    // Log to console for debugging
    console.log('Contact Action Tracked:', logEntry);
    
    // Example: Send to analytics service
    // sendToAnalytics(logEntry);
}


// Smooth Scroll for Navigation Links


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
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


// Copy Contact Information to Clipboard


function copyToClipboard(text, type) {
    navigator.clipboard.writeText(text).then(() => {
        console.log(${type} copied to clipboard: ${text});
        showNotification(${type} copied to clipboard!);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}


// Notification System


function showNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}


// Add Slide Animation Style

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);


// Intersection Observer for Card Animations


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

// Observe all contact cards
document.querySelectorAll('.contact-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = ${index * 0.1}s;
    observer.observe(card);
});


// Mobile-Friendly Contact Actions


// Detect if device supports tel: protocol
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Enhance mobile experience
if (isMobileDevice()) {
    document.querySelectorAll('.contact-card').forEach(card => {
        card.style.cursor = 'pointer';
        
        // Add tap feedback
        card.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        });
        
        card.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
}


// Console Welcome Message


console.log('%c📞 Contact Directory Loaded!', 'font-size: 18px; color: #3b82f6; font-weight: bold;');
console.log('%cClick on any team member to call or email them directly.', 'font-size: 14px; color: #60a5fa;');