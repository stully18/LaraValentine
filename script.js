// ============================================
// VALENTINE'S DAY WEBSITE - JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initFloatingHearts();
    initAudioToggle();
    initButtons();
    initScrollReveal();
});

// ============================================
// COUNTDOWN TIMER
// ============================================
function initCountdown() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        // Valentine's Day - February 14th of current/next year
        const now = new Date();
        let valentinesDay = new Date(now.getFullYear(), 1, 14); // Month is 0-indexed

        // If Valentine's Day has passed this year, target next year
        if (now > valentinesDay) {
            valentinesDay = new Date(now.getFullYear() + 1, 1, 14);
        }

        const diff = valentinesDay - now;

        if (diff <= 0) {
            // It's Valentine's Day!
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            document.querySelector('.countdown-label').textContent = "It's Valentine's Day!";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ============================================
// FLOATING HEARTS BACKGROUND
// ============================================
function initFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const heartSymbols = ['♥', '♡', '❤', '💕'];

    function createHeart() {
        const heart = document.createElement('span');
        heart.className = 'floating-bg-heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

        // Random properties
        const size = Math.random() * 30 + 15;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 5;

        heart.style.cssText = `
            font-size: ${size}px;
            left: ${left}%;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;

        container.appendChild(heart);

        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, (duration + delay) * 1000);
    }

    // Create initial hearts
    for (let i = 0; i < 10; i++) {
        setTimeout(() => createHeart(), i * 500);
    }

    // Continue creating hearts
    setInterval(createHeart, 2000);
}

// ============================================
// AUDIO TOGGLE
// ============================================
function initAudioToggle() {
    const audioToggle = document.getElementById('audioToggle');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;

    function playMusic() {
        bgMusic.play().then(() => {
            isPlaying = true;
            audioToggle.classList.remove('muted');
        }).catch(e => {
            console.log('Autoplay blocked, waiting for user interaction');
            audioToggle.classList.add('muted');
        });
    }

    function toggleMusic() {
        if (isPlaying) {
            bgMusic.pause();
            audioToggle.classList.add('muted');
            isPlaying = false;
        } else {
            playMusic();
        }
    }

    audioToggle.addEventListener('click', toggleMusic);

    // Try to autoplay on load
    playMusic();

    // Also try on first user interaction if autoplay was blocked
    document.addEventListener('click', function tryPlay() {
        if (!isPlaying) {
            playMusic();
        }
        document.removeEventListener('click', tryPlay);
    }, { once: true });
}

// ============================================
// YES/NO BUTTONS
// ============================================
function initButtons() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const buttonContainer = document.getElementById('buttonContainer');
    const yesResponse = document.getElementById('yesResponse');
    const noResponse = document.getElementById('noResponse');

    let noClickCount = 0;
    const noMessages = [
        "Are you sure? The button seems to disagree...",
        "Hmm, try again! The button is playing hard to get.",
        "The button is getting smaller... suspicious!",
        "One more try? Pretty please? 🥺",
        "Okay okay, just click Yes already! 💕"
    ];

    // YES button click
    yesBtn.addEventListener('click', () => {
        buttonContainer.style.display = 'none';
        noResponse.classList.remove('active');
        yesResponse.classList.add('active');

        // Trigger confetti
        createConfetti();

        // Add celebration hearts burst
        createHeartBurst();
    });

    // NO button - playful dodge behavior
    noBtn.addEventListener('click', () => {
        noClickCount++;

        // Show playful message
        noResponse.querySelector('.no-text').textContent = noMessages[Math.min(noClickCount - 1, noMessages.length - 1)];
        noResponse.classList.add('active');

        // Make the No button smaller and move it
        const currentScale = 1 - (noClickCount * 0.15);
        if (currentScale > 0.3) {
            noBtn.style.transform = `scale(${currentScale})`;
        }

        // Random position dodge after 2 clicks
        if (noClickCount >= 2) {
            const containerRect = buttonContainer.getBoundingClientRect();
            const btnRect = noBtn.getBoundingClientRect();

            const maxX = containerRect.width - btnRect.width;
            const maxY = 100;

            const randomX = Math.random() * maxX - maxX / 2;
            const randomY = Math.random() * maxY;

            noBtn.style.position = 'relative';
            noBtn.style.left = `${randomX}px`;
            noBtn.style.top = `${randomY}px`;
        }

        // Make Yes button bigger
        const yesScale = 1 + (noClickCount * 0.1);
        yesBtn.style.transform = `scale(${Math.min(yesScale, 1.5)})`;

        // After 5 clicks, hide the No button
        if (noClickCount >= 5) {
            noBtn.style.opacity = '0';
            noBtn.style.pointerEvents = 'none';
        }
    });
}

// ============================================
// CONFETTI EFFECT
// ============================================
function createConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#b76e79', '#d4a5ab', '#f7e7ce', '#d4af37', '#722f37', '#ff6b8a', '#ffd700'];
    const shapes = ['❤', '♥', '✨', '💕', '💗'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('span');
            confetti.className = 'confetti';

            // Random between heart shapes and squares
            if (Math.random() > 0.5) {
                confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
                confetti.style.fontSize = Math.random() * 20 + 10 + 'px';
                confetti.style.background = 'transparent';
            } else {
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            }

            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDuration = Math.random() * 2 + 2 + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';

            container.appendChild(confetti);

            // Remove after animation
            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
}

// ============================================
// HEART BURST EFFECT
// ============================================
function createHeartBurst() {
    const heartsContainer = document.getElementById('heartsContainer');
    const hearts = ['❤', '💕', '💗', '💖', '💓'];

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.className = 'floating-bg-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                font-size: ${Math.random() * 40 + 20}px;
                left: ${Math.random() * 100}%;
                animation-duration: ${Math.random() * 5 + 8}s;
                opacity: 0.4;
            `;
            heartsContainer.appendChild(heart);

            setTimeout(() => heart.remove(), 13000);
        }, i * 100);
    }
}

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
function initScrollReveal() {
    const reveals = document.querySelectorAll('.letter-container, .gallery-item, .question-container');

    reveals.forEach(el => el.classList.add('reveal'));

    function checkReveal() {
        const windowHeight = window.innerHeight;

        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = 150;

            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    }

    // Check on scroll
    window.addEventListener('scroll', checkReveal);

    // Check on load
    checkReveal();
}

// ============================================
// PHOTO GALLERY - Replace placeholders with real photos
// ============================================
// To add your photos, either:
// 1. Replace the placeholder divs in HTML with <img> tags
// 2. Or use this function to dynamically load images:

function loadGalleryPhotos(photos) {
    // photos should be an array of objects: { src: 'path/to/photo.jpg', caption: 'Caption text' }
    const placeholders = document.querySelectorAll('.photo-placeholder');

    photos.forEach((photo, index) => {
        if (placeholders[index]) {
            const parent = placeholders[index].parentElement;
            const img = document.createElement('img');
            img.src = photo.src;
            img.alt = photo.caption || 'Our memory';
            img.loading = 'lazy';

            placeholders[index].replaceWith(img);

            // Update caption if provided
            if (photo.caption) {
                const caption = parent.querySelector('.photo-caption');
                if (caption) caption.textContent = photo.caption;
            }
        }
    });
}

// Example usage (uncomment and modify when ready):
// loadGalleryPhotos([
//     { src: 'photos/photo1.jpg', caption: 'Our first date' },
//     { src: 'photos/photo2.jpg', caption: 'That amazing trip' },
//     { src: 'photos/photo3.jpg', caption: 'Laughing together' },
//     { src: 'photos/photo4.jpg', caption: 'My favorite smile' },
//     { src: 'photos/photo5.jpg', caption: 'Making memories' },
//     { src: 'photos/photo6.jpg', caption: 'Together forever' }
// ]);
