// Pixel sound effects (optional - using Web Audio API)
class PixelSound {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    playClick() {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }
    
    playHover() {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = 600;
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.05);
    }
}

// Initialize sound
const pixelSound = new PixelSound();

// Button interactions
const startBtn = document.getElementById('startButton');

startBtn.addEventListener('mouseenter', () => {
    try {
        pixelSound.playHover();
    } catch (e) {
        console.log('Audio not available');
    }
});

startBtn.addEventListener('click', () => {
    try {
        pixelSound.playClick();
    } catch (e) {
        console.log('Audio not available');
    }
    
    // Start the transition animation sequence
    startTransitionAnimation();
});

// Transition Animation Sequence
function startTransitionAnimation() {
    // Change button text to LOADING...
    startBtn.style.pointerEvents = 'none';
    startBtn.innerHTML = '<span class="button-text">LOADING...</span>';
    
    // Wait a moment then start transition
    setTimeout(() => {
        playTransitionSequence();
    }, 500);
}

async function playTransitionSequence() {
    // Preload all frame images first
    const frame1 = new Image();
    const frame2 = new Image();
    const frame3 = new Image();
    
    frame1.src = 'images/frame1.png';
    frame2.src = 'images/frame2.png';
    frame3.src = 'images/frame3.png';
    
    // Wait for all images to load
    await Promise.all([
        new Promise(resolve => frame1.onload = resolve),
        new Promise(resolve => frame2.onload = resolve),
        new Promise(resolve => frame3.onload = resolve)
    ]).catch(() => {
        console.log('Some images failed to load, continuing anyway...');
    });
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'transition-overlay';
    document.body.appendChild(overlay);
    
    // Create character container
    const characterDiv = document.createElement('div');
    characterDiv.className = 'transition-character';
    
    // Create image element
    const characterImg = document.createElement('img');
    characterImg.src = 'images/frame1.png';
    characterImg.alt = 'Character Animation';
    characterDiv.appendChild(characterImg);
    
    overlay.appendChild(characterDiv);
    
    // Show overlay
    overlay.classList.add('active');
    
    // Step 1: Fade in character from bottom (frame 1 only)
    await delay(100);
    characterDiv.classList.add('fade-in-up');
    
    // Wait for fade in animation to complete - Frame 1 duration: 0.9 seconds
    await delay(900);
    
    // Keep character visible and remove animation class
    characterDiv.style.opacity = '1';
    characterDiv.style.transform = 'translateY(0)';
    characterDiv.classList.remove('fade-in-up');
    
    // Step 2: Switch to frame 2 (drawing sword) - no fade, just instant switch
    // Frame 2 duration: 800ms
    characterImg.src = 'images/frame2.png';
    await delay(800);
    
    // Step 3: Switch to frame 3 (slash) with sound effect - no fade, instant switch
    // Frame 3 duration: 600ms
    characterImg.src = 'images/frame3.png';
    characterDiv.classList.add('slash-effect');
    
    // Play katana slash sound
    playKatanaSlash();
    
    await delay(600);
    
    // Step 4: White flash
    const whiteFlash = document.createElement('div');
    whiteFlash.className = 'white-flash';
    document.body.appendChild(whiteFlash);
    
    await delay(50);
    whiteFlash.classList.add('active');
    
    // Wait for white flash - 1 second
    await delay(1000);
    
    // Step 5: Navigate to main page
    window.location.href = 'main.html';
}

// Katana slash sound effect
function playKatanaSlash() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create a complex slash sound
        const now = audioContext.currentTime;
        
        // Whoosh sound (main slash)
        const oscillator1 = audioContext.createOscillator();
        const gainNode1 = audioContext.createGain();
        
        oscillator1.connect(gainNode1);
        gainNode1.connect(audioContext.destination);
        
        oscillator1.type = 'sawtooth';
        oscillator1.frequency.setValueAtTime(800, now);
        oscillator1.frequency.exponentialRampToValueAtTime(200, now + 0.3);
        
        gainNode1.gain.setValueAtTime(0.3, now);
        gainNode1.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        
        oscillator1.start(now);
        oscillator1.stop(now + 0.3);
        
        // Impact sound (sharp)
        const oscillator2 = audioContext.createOscillator();
        const gainNode2 = audioContext.createGain();
        
        oscillator2.connect(gainNode2);
        gainNode2.connect(audioContext.destination);
        
        oscillator2.type = 'square';
        oscillator2.frequency.setValueAtTime(150, now + 0.2);
        oscillator2.frequency.exponentialRampToValueAtTime(50, now + 0.35);
        
        gainNode2.gain.setValueAtTime(0.4, now + 0.2);
        gainNode2.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        
        oscillator2.start(now + 0.2);
        oscillator2.stop(now + 0.35);
        
        // High pitch zing
        const oscillator3 = audioContext.createOscillator();
        const gainNode3 = audioContext.createGain();
        
        oscillator3.connect(gainNode3);
        gainNode3.connect(audioContext.destination);
        
        oscillator3.type = 'sine';
        oscillator3.frequency.setValueAtTime(2000, now + 0.15);
        oscillator3.frequency.exponentialRampToValueAtTime(4000, now + 0.25);
        
        gainNode3.gain.setValueAtTime(0.2, now + 0.15);
        gainNode3.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        
        oscillator3.start(now + 0.15);
        oscillator3.stop(now + 0.3);
        
    } catch (e) {
        console.log('Katana sound effect not available');
    }
}

// Helper function for delays
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Add typing effect to description (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect
// window.addEventListener('load', () => {
//     const description = document.querySelector('.pixel-description');
//     const originalText = description.textContent;
//     typeWriter(description, originalText, 30);
// });

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        startBtn.click();
    }
});

// Add particle effect on mouse move
document.addEventListener('mousemove', (e) => {
    // Random chance to create a sparkle
    if (Math.random() > 0.95) {
        createSparkle(e.clientX, e.clientY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: #FFD700;
        box-shadow: 0 0 10px #FFD700;
        pointer-events: none;
        z-index: 9999;
        animation: sparkleAnim 0.6s ease-out forwards;
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 600);
}

// Add sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleAnim {
        0% {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
        100% {
            transform: scale(0) translateY(-20px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Console easter egg
console.log('%c🎮 WELCOME BRAVE ADVENTURER! 🎮', 'font-size: 20px; color: #FFD700; text-shadow: 2px 2px 4px #FF6B00;');
console.log('%cYou found a secret! Press Ctrl+Shift+K for a surprise...', 'font-size: 12px; color: #9370DB;');

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'K') {
        const character = document.querySelector('.character-sprite');
        character.style.animation = 'characterJump 0.6s ease-out 3, characterSpin 1.5s ease-in-out 1';
        
        setTimeout(() => {
            character.style.animation = 'characterIdle 4s ease-in-out infinite';
        }, 2500);
    }
});

// Add jump and spin animations
const spinStyle = document.createElement('style');
spinStyle.textContent = `
    @keyframes characterSpin {
        from { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.1); }
        to { transform: rotate(360deg) scale(1); }
    }
    
    @keyframes characterJump {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-50px); }
    }
`;
document.head.appendChild(spinStyle);
