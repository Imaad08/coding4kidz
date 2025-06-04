document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Typing animation for terminals
    function typeWriter(element, messages, speed = 100) {
        let messageIndex = 0;
        let charIndex = 0;
        let currentMessage = '';
        let isDeleting = false;

        function type() {
            const fullMessage = messages[messageIndex];
            
            if (isDeleting) {
                currentMessage = fullMessage.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentMessage = fullMessage.substring(0, charIndex + 1);
                charIndex++;
            }
            
            element.innerHTML = currentMessage + '<span class="cursor">|</span>';
            
            let typeSpeed = speed;
            if (isDeleting) typeSpeed /= 2;
            
            if (!isDeleting && charIndex === fullMessage.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                messageIndex = (messageIndex + 1) % messages.length;
                typeSpeed = 500; // Pause before new message
            }
            
            setTimeout(type, typeSpeed);
        }
        
        type();
    }

    // Initialize terminal typing animations
    document.querySelectorAll('.typing-animation').forEach((element, index) => {
        const messages = JSON.parse(element.getAttribute('data-messages'));
        setTimeout(() => {
            typeWriter(element, messages, 80);
        }, index * 500); // Stagger the start times
    });

    // Hero subtitle typing animation
    const heroSubtitle = document.querySelector('.typing-text');
    if (heroSubtitle) {
        const words = JSON.parse(heroSubtitle.getAttribute('data-words'));
        typeWriter(heroSubtitle, words, 60);
    }

    // Add cursor blinking CSS
    const style = document.createElement('style');
    style.textContent = `
        .cursor {
            animation: blink 1s infinite;
        }
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}); 