import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {

// ═══════════════════════════════════════════════════════════
// CURSOR EFFECTS
// ═══════════════════════════════════════════════════════════

const cursorTrail = document.querySelector('.cursor-trail');
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor trail with easing
function animateCursor() {
    const ease = 0.15;
    trailX += (mouseX - trailX) * ease;
    trailY += (mouseY - trailY) * ease;
    
    if (cursorTrail) {
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
    }
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor interaction with elements
const interactiveElements = document.querySelectorAll('a, button, .album, .project, .rotation-album');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursorTrail, { 
            scale: 2, 
            borderColor: '#ffffff',
            duration: 0.3,
            ease: 'back.out'
        });
    });
    
    el.addEventListener('mouseleave', () => {
        gsap.to(cursorTrail, { 
            scale: 1, 
            borderColor: '#ffffff',
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// ═══════════════════════════════════════════════════════════
// TEXT SCRAMBLE EFFECT
// ═══════════════════════════════════════════════════════════

class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += char;
            } else {
                output += from;
            }
        }
        
        this.el.innerText = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Apply text scramble to section headers
const sectionHeaders = document.querySelectorAll('.section-header-glitch');
sectionHeaders.forEach(header => {
    const scramble = new TextScramble(header);
    const originalText = header.textContent;
    
    header.addEventListener('mouseenter', () => {
        scramble.setText(originalText);
    });
});

// ═══════════════════════════════════════════════════════════
// RANDOM GLITCH EFFECTS
// ═══════════════════════════════════════════════════════════

function randomGlitch() {
    const glitchElements = document.querySelectorAll('.glitch-text, .section-header-glitch');
    
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every interval
            const randomEl = glitchElements[Math.floor(Math.random() * glitchElements.length)];
            randomEl.classList.add('glitching');
            
            setTimeout(() => {
                randomEl.classList.remove('glitching');
            }, 300);
        }
    }, 3000);
}

randomGlitch();

// ═══════════════════════════════════════════════════════════
// PARALLAX EFFECTS
// ═══════════════════════════════════════════════════════════

// Geometric shapes parallax
gsap.utils.toArray('.geo-shape').forEach((shape, i) => {
    const speed = (i + 1) * 0.5;
    
    gsap.to(shape, {
        y: () => window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1
        }
    });
});

// Stars parallax
gsap.utils.toArray('.star').forEach((star, i) => {
    const speed = 0.3 + (i * 0.1);
    
    gsap.to(star, {
        y: () => -window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 2
        }
    });
});

// ═══════════════════════════════════════════════════════════
// SCROLL-TRIGGERED ANIMATIONS
// ═══════════════════════════════════════════════════════════

// Fade in projects on scroll
gsap.utils.toArray('.project').forEach((project, i) => {
    gsap.from(project, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: project,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Albums stagger animation
gsap.utils.toArray('.album').forEach((album, i) => {
    const direction = i % 2 === 0 ? 100 : -100;
    
    gsap.from(album, {
        opacity: 0,
        x: direction,
        rotation: 5,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: album,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Rotation grid cards
gsap.utils.toArray('.rotation-album').forEach((card, i) => {
    gsap.from(card, {
        opacity: 0,
        y: 50,
        scale: 0.8,
        duration: 0.6,
        delay: i * 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });
});

// ═══════════════════════════════════════════════════════════
// MAGNETIC ELEMENTS
// ═══════════════════════════════════════════════════════════

function createMagneticEffect(elements) {
    elements.forEach(el => {
        const strength = 0.3;
        
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(el, {
                x: x * strength,
                y: y * strength,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
}

createMagneticEffect(document.querySelectorAll('.social-links a, .project-links a'));

// ═══════════════════════════════════════════════════════════
// PROFILE PIC TILT EFFECT
// ═══════════════════════════════════════════════════════════

const profilePic = document.querySelector('.profile-pic');
if (profilePic) {
    profilePic.addEventListener('mousemove', (e) => {
        const rect = profilePic.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 5;
        const rotateY = (centerX - x) / 5;
        
        gsap.to(profilePic, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    profilePic.addEventListener('mouseleave', () => {
        gsap.to(profilePic, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
    });
}

// ═══════════════════════════════════════════════════════════
// ENHANCED TAB NAVIGATION WITH GSAP
// ═══════════════════════════════════════════════════════════

const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('main section');

if (sections.length > 0) {
    // Show about section by default
    gsap.set('#about', { opacity: 1, visibility: 'visible' });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            
            // Hide all sections with GSAP
            sections.forEach(s => {
                gsap.to(s, {
                    opacity: 0,
                    y: 20,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => {
                        s.classList.remove('active');
                    }
                });
            });
            
            // Show target section with GSAP
            setTimeout(() => {
                const target = document.getElementById(targetSection);
                target.classList.add('active');
                
                gsap.fromTo(target, 
                    { opacity: 0, y: 30 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 0.6,
                        ease: 'power3.out'
                    }
                );
            }, 300);
            
            // Update nav links
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ═══════════════════════════════════════════════════════════
// EASTER EGG: KONAMI CODE
// ═══════════════════════════════════════════════════════════

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        
        if (konamiIndex === konamiCode.length) {
            triggerEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function triggerEasterEgg() {
    // Ultra glitch mode
    document.body.style.animation = 'glitch-skew 0.1s infinite';
    
    const allText = document.querySelectorAll('h1, h2, h3, p, a');
    allText.forEach(el => {
        el.classList.add('glitching');
    });
    
    // Create particle explosion
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.textContent = '✦';
        particle.style.position = 'fixed';
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.fontSize = Math.random() * 30 + 10 + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        document.body.appendChild(particle);
        
        gsap.to(particle, {
            x: (Math.random() - 0.5) * 2000,
            y: (Math.random() - 0.5) * 2000,
            opacity: 0,
            rotation: Math.random() * 720,
            duration: 2,
            ease: 'power2.out',
            onComplete: () => particle.remove()
        });
    }
    
    setTimeout(() => {
        document.body.style.animation = '';
        allText.forEach(el => {
            el.classList.remove('glitching');
        });
    }, 2000);
}

console.log('%c✦ EXPERIMENTAL MODE ACTIVE ✦', 'font-size: 20px; color: #666;');
console.log('%cTry the Konami code: ↑ ↑ ↓ ↓ ← → ← → B A', 'font-size: 12px; color: #666;');

}); // End DOMContentLoaded
