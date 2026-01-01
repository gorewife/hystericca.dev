import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const titleText = heroTitle.textContent;
    const chars = titleText.split('');
    
    // Create scramble effect on load
    const scrambleChars = '▓▒░█▄▀■□▪▫';
    let frame = 0;
    const maxFrames = 20;
    
    const scrambleInterval = setInterval(() => {
        if (frame >= maxFrames) {
            clearInterval(scrambleInterval);
            heroTitle.textContent = titleText;
            return;
        }
        
        const scrambled = chars.map((char, i) => {
            if (char === ' ') return ' ';
            if (Math.random() < frame / maxFrames) {
                return char;
            }
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }).join('');
        
        heroTitle.textContent = scrambled;
        frame++;
    }, 50);
}

const workTitles = document.querySelectorAll('.work-title');
workTitles.forEach(title => {
    const text = title.textContent;
    const letters = text.split('').map((char, i) => {
        return `<span style="display:inline-block;transform-origin:bottom center">${char === ' ' ? '&nbsp;' : char}</span>`;
    }).join('');
    
    title.innerHTML = letters;
    const spans = title.querySelectorAll('span');
    
    title.addEventListener('mouseenter', () => {
        gsap.to(spans, {
            y: -10,
            duration: 0.3,
            stagger: {
                each: 0.02,
                from: 'start',
                ease: 'power2.out'
            },
            ease: 'back.out(3)'
        });
    });
    
    title.addEventListener('mouseleave', () => {
        gsap.to(spans, {
            y: 0,
            duration: 0.3,
            stagger: {
                each: 0.02,
                from: 'start'
            },
            ease: 'power2.inOut'
        });
    });
});
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '░▒▓█■□▪▫';
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
            const start = Math.floor(Math.random() * 20);
            const end = start + Math.floor(Math.random() * 20);
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

const sectionHeaders = document.querySelectorAll('.section-header h2');
sectionHeaders.forEach(header => {
    const scramble = new TextScramble(header);
    const originalText = header.textContent;
    
    ScrollTrigger.create({
        trigger: header,
        start: 'top 70%',
        once: true,
        onEnter: () => {
            scramble.setText(originalText);
        }
    });
});

const descriptions = document.querySelectorAll('.work-description');
descriptions.forEach(desc => {
    desc.addEventListener('mousemove', (e) => {
        const rect = desc.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(desc, {
            x: x * 0.05,
            y: y * 0.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    desc.addEventListener('mouseleave', () => {
        gsap.to(desc, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
        });
    });
});

const metaItems = document.querySelectorAll('.meta-item');
if (metaItems.length > 0) {
    setInterval(() => {
        if (Math.random() < 0.15) {
            const randomItem = metaItems[Math.floor(Math.random() * metaItems.length)];
            const originalText = randomItem.textContent;
            
            gsap.to(randomItem, {
                x: Math.random() * 4 - 2,
                duration: 0.05,
                yoyo: true,
                repeat: 3,
                onComplete: () => {
                    randomItem.textContent = originalText;
                    gsap.set(randomItem, { x: 0 });
                }
            });
        }
    }, 2000);
}

const workItems = document.querySelectorAll('.work-item');
workItems.forEach((item, index) => {
    gsap.from(item, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });
});

const sectionNumbers = document.querySelectorAll('.section-number-large');
sectionNumbers.forEach(num => {
    gsap.to(num, {
        y: 100,
        ease: 'none',
        scrollTrigger: {
            trigger: num,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });
});

workItems.forEach(item => {
    const title = item.querySelector('.work-title');
    
    item.addEventListener('mouseenter', () => {
        gsap.to(title, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    item.addEventListener('mouseleave', () => {
        gsap.to(title, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.inOut'
        });
    });
});

const albumItems = document.querySelectorAll('.album-item');
albumItems.forEach(album => {
    gsap.from(album, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        scrollTrigger: {
            trigger: album,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });
    
    album.addEventListener('mouseenter', () => {
        gsap.to(album, {
            y: -8,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    album.addEventListener('mouseleave', () => {
        gsap.to(album, {
            y: 0,
            duration: 0.3,
            ease: 'power2.inOut'
        });
    });
});

const contactLinks = document.querySelectorAll('.contact-link');
contactLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(link, {
            x: 10,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    link.addEventListener('mouseleave', () => {
        gsap.to(link, {
            x: 0,
            duration: 0.3,
            ease: 'power2.inOut'
        });
    });
});

// NOW section animations
const nowBlocks = document.querySelectorAll('.now-block');
nowBlocks.forEach((block, index) => {
    // Staggered entrance
    gsap.from(block, {
        opacity: 0,
        y: 80,
        rotation: -2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: block,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        delay: index * 0.15
    });

    // Glitch effect on hover
    const heading = block.querySelector('h3');
    if (heading) {
        const originalText = heading.textContent;
        const glitchChars = '▓▒░█▄▀■□▪▫';
        
        block.addEventListener('mouseenter', () => {
            let iterations = 0;
            const interval = setInterval(() => {
                heading.textContent = originalText
                    .split('')
                    .map((char, i) => {
                        if (i < iterations) return originalText[i];
                        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    })
                    .join('');
                
                if (iterations >= originalText.length) {
                    clearInterval(interval);
                    heading.textContent = originalText;
                }
                iterations += 1/2;
            }, 30);
        });
    }

    // Animate list items on scroll
    const listItems = block.querySelectorAll('li');
    listItems.forEach((item, i) => {
        gsap.from(item, {
            opacity: 0,
            x: -20,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            delay: (index * 0.15) + (i * 0.1)
        });
    });
});

// Parallax effect for NOW section number
const nowSection = document.querySelector('.section-now');
if (nowSection) {
    const nowNumber = nowSection.querySelector('.section-number-large');
    if (nowNumber) {
        gsap.to(nowNumber, {
            y: 100,
            opacity: 0.05,
            ease: 'none',
            scrollTrigger: {
                trigger: nowSection,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5
            }
        });
    }
}

// Floating animation for NOW date
const nowDate = document.querySelector('.now-date');
if (nowDate) {
    gsap.to(nowDate, {
        y: -5,
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
    });
}

console.log('%c▓ HYSTERICCA', 'font-size: 24px; font-weight: 900; color: #dc143c;');
console.log('%cMidnight/Crimson · 2025', 'font-size: 12px; color: #999;');

});
