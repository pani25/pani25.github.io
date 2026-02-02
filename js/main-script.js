// Smooth scroll to sections
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking
            closeMobileMenu();
        }
    });
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');

function openMobileMenu() {
    navToggle.classList.add('active');
    navMenu.classList.add('active');
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (navToggle) {
    navToggle.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
}

if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileMenu);
}

// Close menu on window resize if open
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Active navigation highlighting
function updateActiveNav() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.pageYOffset + 150;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// Download CV button
const downloadBtn = document.querySelector('.download-btn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        // Add your CV file path here
        const cvPath = 'files/CV_Muhamad_Pani_Rayadi.pdf';
        
        // Create temporary link and trigger download
        const link = document.createElement('a');
        link.href = cvPath;
        link.download = 'CV_Muhamad_Pani_Rayadi.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Fallback if file doesn't exist
        setTimeout(() => {
            alert('CV download will be available soon! Please contact me directly for my CV.');
        }, 100);
    });
}

// Parallax effect for sections
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const sections = document.querySelectorAll('.section');
    
    sections.forEach((section, index) => {
        const speed = 0.5;
        const yPos = -(scrolled * speed) + (index * 100);
        section.style.backgroundPositionY = yPos + 'px';
    });
});

// Grid cards animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const gridObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

// Apply observer to grid items
window.addEventListener('load', () => {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.5s ease-out';
        gridObserver.observe(item);
    });
});

// Add hover sound effect (optional)
class PixelSound {
    constructor() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Audio context not available');
        }
    }
    
    playHover() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = 600;
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.05);
    }
    
    playClick() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }
}

const pixelSound = new PixelSound();

// Add hover sounds to interactive elements
document.querySelectorAll('.nav-link, .pixel-btn, .grid-card, .social-icon').forEach(element => {
    element.addEventListener('mouseenter', () => {
        pixelSound.playHover();
    });
    
    element.addEventListener('click', () => {
        pixelSound.playClick();
    });
});

// Scroll to top on page load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    updateActiveNav();
});

// Easter egg - Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    const body = document.body;
    body.style.animation = 'rainbow 2s infinite';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        body.style.animation = '';
        style.remove();
    }, 5000);
    
    console.log('🎮 GAME MODE ACTIVATED! 🎮');
}

// Add click effect to grid cards
document.querySelectorAll('.grid-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
    });
});

// Image Lightbox Modal
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');

// Get all grid cards (projects and certificates)
const gridCards = document.querySelectorAll('.grid-card');

// Add click event to each grid card
if (gridCards && lightboxModal && lightboxImage) {
    gridCards.forEach(card => {
        card.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img && img.src) {
                lightboxImage.src = img.src;
                lightboxImage.alt = img.alt;
                lightboxModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });
    
    // Close lightbox on close button click
    if (lightboxClose) {
        lightboxClose.addEventListener('click', function() {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
            setTimeout(() => {
                lightboxImage.src = ''; // Clear image after animation
            }, 300);
        });
    }
    
    // Close lightbox when clicking outside the image
    lightboxModal.addEventListener('click', function(e) {
        if (e.target === lightboxModal) {
            lightboxClose.click();
        }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
            lightboxClose.click();
        }
    });
}

// Profile photo image swap on hover with power aura
const profileImg = document.querySelector('.profile-img');
if (profileImg) {
    const originalSrc = 'images/profile.jpg';
    const hoverSrc = 'images/character.png';
    
    // Preload hover image
    const hoverImage = new Image();
    hoverImage.src = hoverSrc;
    
    const photoFrame = document.querySelector('.photo-frame');
    if (photoFrame) {
        photoFrame.addEventListener('mouseenter', () => {
            // Fade out briefly before changing
            profileImg.style.opacity = '0.3';
            setTimeout(() => {
                profileImg.src = hoverSrc;
                profileImg.style.opacity = '1';
                // Activate power aura for character
                photoFrame.classList.add('power-mode');
            }, 200);
        });
        
        photoFrame.addEventListener('mouseleave', () => {
            // Fade out briefly before changing back
            profileImg.style.opacity = '0.3';
            setTimeout(() => {
                profileImg.src = originalSrc;
                profileImg.style.opacity = '1';
                // Deactivate power aura
                photoFrame.classList.remove('power-mode');
            }, 200);
        });
    }
}

// Typing effect for about description (optional)
function typeWriter(element, text, speed = 30) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Console message
console.log('%c🎮 WELCOME TO MY PORTFOLIO! 🎮', 'font-size: 20px; color: #FFD700; font-weight: bold;');
console.log('%cBuilt with ❤️ using Pixel Game Theme', 'font-size: 12px; color: #9370DB;');
console.log('%cTry the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A', 'font-size: 10px; color: #FF6B00;');
