import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

// ═══════════════════════════════════════════════════════════
// HERO TITLE ENTRANCE - Smooth fade in
// ═══════════════════════════════════════════════════════════

const heroTitleLines = document.querySelectorAll('.hero-title .title-line');
if (heroTitleLines.length > 0) {
    heroTitleLines.forEach((line, i) => {
        gsap.fromTo(line, 
            {
                opacity: 0,
                x: -60,
            },
            {
                opacity: 1,
                x: 0,
                duration: 1.2,
                delay: i * 0.25,
                ease: 'power3.out'
            }
        );
    });
}

// Fade in hero meta
const heroMeta = document.querySelector('.hero-meta');
if (heroMeta) {
    gsap.fromTo(heroMeta,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: 'power2.out' }
    );
}

// ═══════════════════════════════════════════════════════════
// SCROLL ANIMATIONS
// ═══════════════════════════════════════════════════════════

document.querySelectorAll('[data-parallax]').forEach(el => {
    const speed = el.getAttribute('data-parallax');
    gsap.to(el, {
        y: speed,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
    });
});

document.querySelectorAll('[data-scroll-reveal]').forEach(el => {
    gsap.from(el.children, {
        y: 100, opacity: 0, stagger: 0.2, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%' }
    });
});

document.querySelectorAll('[data-hover-distort]').forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(el, { scaleX: 1.05, scaleY: 0.95, duration: 0.3, ease: 'power2.out' });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(el, { scaleX: 1, scaleY: 1, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
    });
});

document.querySelectorAll('[data-split-chars]').forEach(el => {
    const text = el.textContent;
    el.innerHTML = text.split('').map(char => 
        `<span style="display:inline-block; opacity:0;">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('');
    gsap.to(el.querySelectorAll('span'), {
        opacity: 1, y: 0, stagger: 0.02, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 80%' }
    });
});

document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('mousemove', (e) => {
        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(link, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
    });
    link.addEventListener('mouseleave', () => {
        gsap.to(link, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    });
});

document.querySelectorAll('.shape').forEach((shape, i) => {
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 50;
        const y = (e.clientY / window.innerHeight - 0.5) * 50;
        gsap.to(shape, { x: x * (i + 1), y: y * (i + 1), duration: 1.5, ease: 'power2.out' });
    });
});

// ═══════════════════════════════════════════════════════════
// INTERACTIVE TEXT EFFECTS
// ═══════════════════════════════════════════════════════════

// Split text into individual letters for animation
function splitText(selector) {
    document.querySelectorAll(selector).forEach(el => {
        const text = el.textContent;
        el.innerHTML = text.split('').map((char, i) => 
            `<span class="char" style="display: inline-block; transition-delay: ${i * 0.02}s;">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
    });
}

splitText('.work-title, .hero-title .title-line');

// Wave effect on hover (constrained)
document.querySelectorAll('.work-title').forEach(title => {
    const chars = title.querySelectorAll('.char');
    
    title.addEventListener('mouseenter', () => {
        chars.forEach((char, i) => {
            gsap.to(char, {
                y: -15,
                duration: 0.5,
                delay: i * 0.03,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1
            });
        });
    });
});

// Text scramble effect
function scrambleText(element, finalText) {
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let iterations = 0;
    const interval = setInterval(() => {
        element.textContent = finalText.split('').map((char, i) => {
            if (i < iterations) return finalText[i];
            return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        
        if (iterations >= finalText.length) clearInterval(interval);
        iterations += 1/3;
    }, 30);
}

// Apply scramble to section headers on scroll
document.querySelectorAll('.section-header h2').forEach(header => {
    const originalText = header.textContent;
    let hasAnimated = false;
    
    ScrollTrigger.create({
        trigger: header,
        start: 'top 80%',
        onEnter: () => {
            if (!hasAnimated) {
                scrambleText(header, originalText);
                hasAnimated = true;
            }
        }
    });
});

// Magnetic text - follows mouse (constrained)
document.querySelectorAll('.work-description').forEach(desc => {
    desc.addEventListener('mousemove', (e) => {
        const rect = desc.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        gsap.to(desc, {
            x: x * 10,
            y: y * 10,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    desc.addEventListener('mouseleave', () => {
        gsap.to(desc, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
});

// Glitch effect on meta items
document.querySelectorAll('.meta-item').forEach((item, i) => {
    setInterval(() => {
        if (Math.random() < 0.05) {
            gsap.to(item, {
                x: Math.random() * 4 - 2,
                duration: 0.05,
                yoyo: true,
                repeat: 3,
                ease: 'power1.inOut'
            });
        }
    }, 3000 + i * 500);
});

// Stagger fade in for list items
document.querySelectorAll('.now-block ul').forEach(list => {
    gsap.from(list.querySelectorAll('li'), {
        opacity: 0,
        x: -30,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: list,
            start: 'top 85%'
        }
    });
});

// Rotate and scale on hover for work tags
document.querySelectorAll('.work-tags span').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        gsap.to(tag, {
            scale: 1.2,
            rotation: Math.random() * 10 - 5,
            duration: 0.3,
            ease: 'back.out(2)'
        });
    });
    
    tag.addEventListener('mouseleave', () => {
        gsap.to(tag, {
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: 'elastic.out(1, 0.5)'
        });
    });
});

// Breathing animation for title overlay
const titleOverlay = document.querySelector('.title-overlay');
if (titleOverlay) {
    gsap.to(titleOverlay, {
        opacity: 0.5,
        scale: 1.05,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
    });
}

// Character reveal on scroll for about section
document.querySelectorAll('.about-description p').forEach(p => {
    const text = p.textContent;
    p.innerHTML = text.split('').map((char, i) => 
        `<span style="opacity: 0; display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('');
    
    gsap.to(p.querySelectorAll('span'), {
        opacity: 1,
        stagger: 0.01,
        duration: 0.05,
        ease: 'none',
        scrollTrigger: {
            trigger: p,
            start: 'top 80%'
        }
    });
});

console.log('%c✦ EXPERIMENTAL MODE ACTIVE ✦', 'font-size: 20px; color: #000;');

});
