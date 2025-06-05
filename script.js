// ===== Main Application Class =====
class Coding4KidzApp {
    constructor() {
        this.components = {};
        this.init();
    }

    init() {
        // Initialize all components
        this.components.loading = new LoadingManager();
        this.components.navigation = new NavigationManager();
        this.components.scrollAnimations = new ScrollAnimations();
        this.components.parallax = new ParallaxManager();
        this.components.cards = new CardAnimations();
        this.components.counter = new CounterAnimation();
        this.components.buttons = new ButtonAnimations();
        this.components.newsletter = new NewsletterManager();
        this.components.theme = new ThemeManager();
        this.components.performance = new PerformanceOptimizer();
        this.components.easterEgg = new EasterEgg();
        this.components.codingAnimations = new CodingAnimations();
        this.components.terminalAnimations = new TerminalAnimations();
        this.components.cardPopups = new CardPopupAnimations();

        // Start the application
        this.start();
    }

    start() {
        // Initialize all components
        Object.values(this.components).forEach(component => {
            if (typeof component.init === 'function') {
                component.init();
            }
        });

        console.log('🚀 Coding4Kidz App Initialized Successfully!');
    }
}

// ===== Loading Manager =====
class LoadingManager {
    constructor() {
        this.loadingElement = document.getElementById('loading');
        this.isLoaded = false;
    }

    init() {
        // Simulate loading time and ensure content is ready
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.hideLoading();
                this.isLoaded = true;
            }, 800); // Reduced loading time
        });
    }

    hideLoading() {
        if (this.loadingElement) {
            this.loadingElement.classList.add('hidden');
            setTimeout(() => {
                this.loadingElement.style.display = 'none';
            }, 500);
        }
    }
}

// ===== Navigation Manager =====
class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navMenu = document.getElementById('nav-menu');
        this.hamburger = document.getElementById('hamburger');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.isMenuOpen = false;
    }

    init() {
        this.bindEvents();
        this.initSmoothScrolling();
    }

    bindEvents() {
        // Scroll effect for navbar
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Hamburger menu toggle
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMenu());
        }

        // Close menu when clicking nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
            }
    });

    // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !this.navMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
                this.closeMenu();
            }
        });
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.navMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    }

    closeMenu() {
        this.isMenuOpen = false;
        this.navMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }

    initSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navHeight = this.navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ===== Enhanced Scroll Animations =====
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.observer = null;
        this.animatedElements = new Set();
    }

    init() {
        this.setupObserver();
        this.observeElements();
        
        // Also check on page load in case elements are already in view
        setTimeout(() => {
            this.checkElementsInView();
        }, 100);
    }

    setupObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, this.observerOptions);
    }

    observeElements() {
        // Find all elements with animation classes
        const animationSelectors = [
            '.scroll-reveal',
            '.scroll-reveal-left', 
            '.scroll-reveal-right',
            '.scroll-reveal-scale',
            '.animate-fade-in',
            '.animate-slide-left',
            '.animate-slide-right', 
            '.animate-slide-up',
            '.animate-scale',
            '.card-pop-up',
            '.card-slide-left',
            '.card-slide-right',
            '.card-bounce-in',
            '.card-flip-in'
        ];

        animationSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (!this.animatedElements.has(element)) {
                    this.observer.observe(element);
                }
            });
        });
    }

    checkElementsInView() {
        // Check if any elements are already in view on page load
        const allAnimatedElements = document.querySelectorAll(`
            .scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale,
            .animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-slide-up, .animate-scale,
            .card-pop-up, .card-slide-left, .card-slide-right, .card-bounce-in, .card-flip-in
        `);

        allAnimatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // If element is in viewport
            if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
                this.animateElement(element);
            }
        });
    }

    animateElement(element) {
        if (this.animatedElements.has(element)) return;
        
        // Add the appropriate animation class
        if (element.classList.contains('scroll-reveal')) {
            element.classList.add('revealed');
        } else if (element.classList.contains('scroll-reveal-left')) {
            element.classList.add('revealed');
        } else if (element.classList.contains('scroll-reveal-right')) {
            element.classList.add('revealed');
        } else if (element.classList.contains('scroll-reveal-scale')) {
            element.classList.add('revealed');
        } else {
            // For all the new animation classes
            element.classList.add('visible');
        }

        // Add to animated set
        this.animatedElements.add(element);
        
        // Stop observing this element
        this.observer.unobserve(element);
        
        console.log('Animating element:', element.className);
    }
}

// ===== Parallax Manager =====
class ParallaxManager {
    constructor() {
        this.shapes = document.querySelectorAll('.shape');
        this.lastScrollY = 0;
        this.ticking = false;
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('scroll', () => this.requestTick());
        window.addEventListener('resize', () => this.handleResize());
    }

    requestTick() {
        if (!this.ticking) {
            requestAnimationFrame(() => this.updateParallax());
            this.ticking = true;
        }
    }

    updateParallax() {
        const scrollY = window.pageYOffset;
        const scrollDelta = scrollY - this.lastScrollY;
        
        this.shapes.forEach((shape, index) => {
            const speed = 0.3 + (index * 0.1); // Reduced parallax speed
            const yPos = scrollY * speed;
            
            shape.style.transform = `translateY(${yPos}px) rotate(${scrollY * 0.05}deg)`;
        });

        this.lastScrollY = scrollY;
        this.ticking = false;
    }

    handleResize() {
        // Reset positions on resize
        this.updateParallax();
    }
}

// ===== Card Animations =====
class CardAnimations {
    constructor() {
        this.programCards = document.querySelectorAll('.program-card');
        this.leaderCards = document.querySelectorAll('.leader-card');
        this.featureCards = document.querySelectorAll('.feature-card');
    }

    init() {
        this.initHoverEffects();
    }

    initHoverEffects() {
        // Program cards
        this.programCards.forEach(card => {
            this.addCardHoverEffect(card);
        });

        // Leader cards  
        this.leaderCards.forEach(card => {
            this.addCardHoverEffect(card);
        });

        // Feature cards
        this.featureCards.forEach(card => {
            this.addCardHoverEffect(card, 'gentle');
        });
    }

    addCardHoverEffect(card, intensity = 'normal') {
        const multiplier = intensity === 'gentle' ? 0.5 : 1;
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = `translateY(-${8 * multiplier}px) scale(${1 + (0.02 * multiplier)})`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    }
}

// ===== Counter Animation =====
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number[data-target]');
        this.hasAnimated = false;
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animateCounters();
                    this.hasAnimated = true;
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.hero-stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    animateCounters() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 1500; // Faster animation
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }
}

// ===== Button Animations =====
class ButtonAnimations {
    constructor() {
        this.buttons = document.querySelectorAll('.btn');
    }

    init() {
        this.addRippleEffect();
        this.addHoverEffects();
    }

    addRippleEffect() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    pointer-events: none;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                `;
                
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Add CSS for ripple animation
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    addHoverEffects() {
        this.buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px) scale(1.02)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// ===== Newsletter Manager =====
class NewsletterManager {
    constructor() {
        this.form = document.querySelector('.newsletter-form');
        this.emailInput = document.getElementById('newsletter-email');
        this.submitButton = document.getElementById('newsletter-submit');
    }

    init() {
        if (this.form && this.emailInput && this.submitButton) {
            this.bindEvents();
        }
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.emailInput.addEventListener('input', () => this.validateEmail());
    }

    handleSubmit(e) {
        e.preventDefault();
        const email = this.emailInput.value.trim();
        
        if (this.isValidEmail(email)) {
            this.showSuccess();
            this.emailInput.value = '';
        } else {
            this.showError('Please enter a valid email address.');
        }
    }

    validateEmail() {
        const email = this.emailInput.value.trim();
        const isValid = this.isValidEmail(email);
        
        this.emailInput.style.borderColor = isValid || email === '' ? '' : '#ff6b6b';
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showSuccess() {
        this.showMessage('🎉 Thank you for subscribing!', 'success');
    }

    showError(message) {
        this.showMessage(message, 'error');
    }

    showMessage(message, type) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === 'success' ? 'var(--primary-color)' : '#ff6b6b'};
            color: white;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(messageElement);
        
        setTimeout(() => {
            messageElement.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => messageElement.remove(), 300);
        }, 3000);
    }
}

// ===== Theme Manager =====
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.createThemeToggle();
    }

    init() {
        this.applyTheme();
    }

    createThemeToggle() {
        const toggle = document.createElement('button');
        toggle.innerHTML = '<i class="fas fa-moon"></i>';
        toggle.className = 'theme-toggle';
        toggle.style.cssText = `
            position: fixed;
            top: 50%;
            right: 20px;
            transform: translateY(-50%);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background: var(--primary-gradient);
            color: white;
            box-shadow: var(--shadow-lg);
            cursor: pointer;
            font-size: 1.2rem;
            z-index: 1000;
            transition: var(--transition);
        `;
        
        toggle.addEventListener('click', () => this.toggleTheme());
        document.body.appendChild(toggle);
        
        this.themeToggle = toggle;
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        localStorage.setItem('theme', this.theme);
    }

    applyTheme() {
        if (this.theme === 'dark') {
            document.documentElement.style.setProperty('--background-light', '#1a1a1a');
            document.documentElement.style.setProperty('--text-primary', '#ffffff');
            document.documentElement.style.setProperty('--text-secondary', '#cccccc');
            if (this.themeToggle) {
                this.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        } else {
            document.documentElement.style.setProperty('--background-light', '#ffffff');
            document.documentElement.style.setProperty('--text-primary', '#303030');
            document.documentElement.style.setProperty('--text-secondary', '#666666');
            if (this.themeToggle) {
                this.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        }
    }
}

// ===== Performance Optimizer =====
class PerformanceOptimizer {
    init() {
        this.optimizeImages();
        this.prefetchResources();
        this.enableHardwareAcceleration();
    }

    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
            img.decoding = 'async';
        });
    }

    prefetchResources() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    // Preload target section content
                    targetElement.style.willChange = 'transform';
                }
            });
        });
    }

    enableHardwareAcceleration() {
        const animatedElements = document.querySelectorAll('.hero-content, .floating-shapes, .program-card, .leader-card');
        animatedElements.forEach(element => {
            element.style.willChange = 'transform';
            element.style.backfaceVisibility = 'hidden';
        });
    }
}

// ===== Easter Egg =====
class EasterEgg {
    constructor() {
        this.konamiCode = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];
        this.userInput = [];
    }

    init() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    handleKeyPress(e) {
        this.userInput.push(e.code);
        
        if (this.userInput.length > this.konamiCode.length) {
            this.userInput.shift();
        }
        
        if (this.userInput.length === this.konamiCode.length) {
            if (this.userInput.every((key, index) => key === this.konamiCode[index])) {
                this.activateEasterEgg();
                this.userInput = [];
            }
        }
    }

    activateEasterEgg() {
        const easterEggElement = document.createElement('div');
        easterEggElement.innerHTML = `
            <div style="text-align: center; color: white;">
                <h2>🎉 You found the secret!</h2>
                <p>Welcome to the Coding4Kidz developer console!</p>
                <p>Keep exploring and keep coding! 💻</p>
            </div>
        `;
        easterEggElement.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--primary-gradient);
            padding: 3rem;
            border-radius: var(--border-radius-lg);
            box-shadow: var(--shadow-xl);
            z-index: 10000;
            animation: bounceIn 0.5s ease-out;
        `;
        
        document.body.appendChild(easterEggElement);
        
        setTimeout(() => {
            easterEggElement.style.animation = 'fadeOut 0.5s ease-in forwards';
            setTimeout(() => easterEggElement.remove(), 500);
        }, 3000);
    }
}

// ===== NEW: Coding Animations Class =====
class CodingAnimations {
    constructor() {
        this.codeLines = [
            'function learnCoding() {',
            '  return "awesome skills";',
            '}',
            'class Student {',
            '  constructor() {',
            '    this.motivation = "high";',
            '  }',
            '}',
            'if (coding === fun) {',
            '  joinCoding4Kidz();',
            '}',
            'import { creativity } from "imagination";',
            'const future = await buildProjects();',
            'console.log("Hello, World!");',
            'def create_game():',
            '    return pygame.sprite.Sprite()',
            'scratch.when_green_flag_clicked()',
            'let dreams = true;',
            'while (learning) { grow(); }',
            'print("Coding is amazing!")',
            '// Building the future, one line at a time',
            'for student in class:',
            '    student.learn_programming()',
            'roblox.script.Parent.Touched:Connect()',
            'var skills = ["Python", "Scratch", "Lua"];'
        ];
        
        this.codingSymbols = [
            '{', '}', '(', ')', '[', ']', '<', '>', 
            '=', '+', '-', '*', '/', '%', '&', '|',
            ';', ':', ',', '.', '?', '!', '@', '#',
            '$', '^', '~', '`', '"', "'", '\\', '_'
        ];
        
        this.matrixChars = [
            '0', '1', 'a', 'b', 'c', 'd', 'e', 'f',
            'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
            'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
            'w', 'x', 'y', 'z', '{', '}', '(', ')'
        ];
    }

    init() {
        this.createCodingBackground();
        this.createParticleSystem();
        this.createMatrixRain();
        this.startAnimationLoops();
    }

    createCodingBackground() {
        const codingBg = document.getElementById('coding-bg');
        if (!codingBg) return;

        // Create floating code lines
        setInterval(() => {
            this.createFloatingCodeLine(codingBg);
        }, 3000); // New code line every 3 seconds

        // Create floating symbols
        setInterval(() => {
            this.createFloatingSymbol(codingBg);
        }, 2000); // New symbol every 2 seconds
    }

    createFloatingCodeLine(container) {
        const codeLine = document.createElement('div');
        codeLine.className = 'code-line';
        codeLine.textContent = this.codeLines[Math.floor(Math.random() * this.codeLines.length)];
        
        // Random position and styling
        codeLine.style.top = Math.random() * 100 + 'vh';
        codeLine.style.fontSize = (12 + Math.random() * 8) + 'px';
        codeLine.style.animationDelay = Math.random() * 2 + 's';
        codeLine.style.animationDuration = (12 + Math.random() * 6) + 's';
        
        container.appendChild(codeLine);
        
        // Remove after animation
        setTimeout(() => {
            if (codeLine.parentNode) {
                codeLine.parentNode.removeChild(codeLine);
            }
        }, 18000);
    }

    createFloatingSymbol(container) {
        const symbol = document.createElement('div');
        symbol.className = 'symbol';
        symbol.textContent = this.codingSymbols[Math.floor(Math.random() * this.codingSymbols.length)];
        
        // Random position and styling
        symbol.style.left = Math.random() * 100 + 'vw';
        symbol.style.fontSize = (16 + Math.random() * 12) + 'px';
        symbol.style.animationDelay = Math.random() * 3 + 's';
        symbol.style.animationDuration = (15 + Math.random() * 10) + 's';
        
        container.appendChild(symbol);
        
        // Remove after animation
        setTimeout(() => {
            if (symbol.parentNode) {
                symbol.parentNode.removeChild(symbol);
            }
        }, 25000);
    }

    createParticleSystem() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        // Create initial particles
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createParticle(particlesContainer);
            }, i * 500);
        }

        // Continuously create new particles
        setInterval(() => {
            this.createParticle(particlesContainer);
        }, 1000);
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        
        // Random size
        const size = 2 + Math.random() * 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Add swirl effect to some particles
        if (Math.random() > 0.5) {
            particle.style.animation += ', swirl-particle ' + (8 + Math.random() * 4) + 's linear infinite';
        }
        
        container.appendChild(particle);
        
        // Remove after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 20000);
    }

    createMatrixRain() {
        const matrixContainer = document.getElementById('matrix-rain');
        if (!matrixContainer) return;

        // Create matrix columns
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                this.createMatrixColumn(matrixContainer);
            }, i * 1000);
        }

        // Continuously create new columns
        setInterval(() => {
            this.createMatrixColumn(matrixContainer);
        }, 2000);
    }

    createMatrixColumn(container) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        
        // Create random text
        let text = '';
        for (let i = 0; i < 15; i++) {
            text += this.matrixChars[Math.floor(Math.random() * this.matrixChars.length)] + '<br>';
        }
        column.innerHTML = text;
        
        // Random position and styling
        column.style.left = Math.random() * 100 + 'vw';
        column.style.animationDelay = Math.random() * 2 + 's';
        column.style.animationDuration = (6 + Math.random() * 4) + 's';
        
        container.appendChild(column);
        
        // Remove after animation
        setTimeout(() => {
            if (column.parentNode) {
                column.parentNode.removeChild(column);
            }
        }, 12000);
    }

    startAnimationLoops() {
        // Clean up old elements periodically
        setInterval(() => {
            this.cleanupOldElements();
        }, 30000); // Clean up every 30 seconds
        
        // Add supercar-inspired effects
        this.addTurboBoostEffect();
        this.addNeonTrails();
        this.addSpeedLines();
    }

    cleanupOldElements() {
        const containers = ['coding-bg', 'particles', 'matrix-rain'];
        containers.forEach(containerId => {
            const container = document.getElementById(containerId);
            if (container && container.children.length > 50) {
                // Remove oldest elements if too many exist
                while (container.children.length > 30) {
                    container.removeChild(container.firstChild);
                }
            }
        });
    }

    addTurboBoostEffect() {
        // Create turbo boost particles on scroll
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const scrollSpeed = Math.abs(currentScrollY - lastScrollY);
            
            if (scrollSpeed > 10) {
                this.createTurboParticle();
            }
            lastScrollY = currentScrollY;
        });
    }

    createTurboParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 20px;
            background: linear-gradient(90deg, #ff6b00, #00ffff);
            border-radius: 2px;
            left: ${Math.random() * window.innerWidth}px;
            top: ${Math.random() * window.innerHeight}px;
            pointer-events: none;
            z-index: 9999;
            animation: turbo-boost 0.8s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
    }

    addNeonTrails() {
        // Add neon trails to moving elements
        const movingElements = document.querySelectorAll('.shape, .particle, .terminal-window');
        movingElements.forEach(element => {
            element.addEventListener('mouseover', () => {
                this.createNeonTrail(element);
            });
        });
    }

    createNeonTrail(element) {
        const trail = document.createElement('div');
        const rect = element.getBoundingClientRect();
        
        trail.style.cssText = `
            position: fixed;
            width: ${rect.width + 10}px;
            height: ${rect.height + 10}px;
            left: ${rect.left - 5}px;
            top: ${rect.top - 5}px;
            border: 2px solid #00ffff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            animation: neon-trail-fade 1s ease-out forwards;
            box-shadow: 0 0 20px #00ffff, inset 0 0 20px #00ffff;
        `;
        
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 1000);
    }

    addSpeedLines() {
        // Create speed lines effect
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.createSpeedLine();
            }
        }, 200);
    }

    createSpeedLine() {
        const line = document.createElement('div');
        line.style.cssText = `
            position: fixed;
            width: 100px;
            height: 2px;
            background: linear-gradient(90deg, transparent, #ff6b00, transparent);
            left: -100px;
            top: ${Math.random() * window.innerHeight}px;
            pointer-events: none;
            z-index: 1;
            animation: speed-line 1.5s linear forwards;
        `;
        
        document.body.appendChild(line);
        setTimeout(() => line.remove(), 1500);
    }
}

// Terminal Animations Manager
class TerminalAnimations {
    constructor() {
        this.terminals = document.querySelectorAll('.terminal-window');
        this.initTerminals();
    }

    initTerminals() {
        this.terminals.forEach((terminal, index) => {
            // Add slight delay for each terminal to appear
            setTimeout(() => {
                this.animateTerminalLines(terminal);
            }, (index + 1) * 1000);
        });
    }

    animateTerminalLines(terminal) {
        const lines = terminal.querySelectorAll('.terminal-line');
        
        lines.forEach((line, index) => {
            const delay = parseInt(line.dataset.delay) || (index + 1) * 1000;
            
            setTimeout(() => {
                line.classList.add('typing');
                
                // Add typing sound effect (optional)
                if (index === lines.length - 1) {
                    // Start blinking cursor after last line
                    this.startCursorBlink(line);
                }
            }, delay);
        });
    }

    startCursorBlink(lastLine) {
        const cursor = lastLine.querySelector('.typing-cursor');
        if (cursor) {
            // Make cursor more visible and start animation
            cursor.style.opacity = '1';
        }
    }

    // Method to restart animations (useful for re-visiting the page)
    restartAnimations() {
        this.terminals.forEach(terminal => {
            const lines = terminal.querySelectorAll('.terminal-line');
            lines.forEach(line => {
                line.classList.remove('typing');
    });
}); 
        
        // Restart after small delay
        setTimeout(() => {
            this.initTerminals();
        }, 500);
    }
}

// ===== Card Popup Animations Manager =====
class CardPopupAnimations {
    constructor() {
        this.observer = null;
        this.animatedSections = new Set();
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.observeCardSections();
    }

    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
                    this.triggerSectionAnimation(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });
    }

    observeCardSections() {
        // Observe sections that contain cards
        const sections = [
            '.about-features',
            '.programs-grid', 
            '.leadership-grid',
            '.mission-card'
        ];

        sections.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                this.observer.observe(element);
            }
        });
    }

    triggerSectionAnimation(section) {
        const sectionClass = section.className;
        
        if (this.animatedSections.has(section)) return;
        this.animatedSections.add(section);

        if (sectionClass.includes('about-features')) {
            this.animateFeatureCards(section);
        } else if (sectionClass.includes('programs-grid')) {
            this.animateProgramCards(section);
        } else if (sectionClass.includes('leadership-grid')) {
            this.animateLeadershipCards(section);
        } else if (sectionClass.includes('mission-card')) {
            this.animateMissionCard(section);
        }
    }

    animateFeatureCards(container) {
        const cards = container.querySelectorAll('.feature-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = `card-pop-sequence 1s ease-out forwards`;
            }, index * 200);
        });
    }

    animateProgramCards(container) {
        const cards = container.querySelectorAll('.program-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = `card-pop-dramatic 1.2s ease-out forwards`;
            }, index * 300);
        });
    }

    animateLeadershipCards(container) {
        const cards = container.querySelectorAll('.leader-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = `card-pop-bounce 1s ease-out forwards`;
            }, index * 200);
        });
    }

    animateMissionCard(card) {
        setTimeout(() => {
            card.style.animation = `mission-card-reveal 1.5s ease-out forwards`;
        }, 600);
    }
}

// ===== Initialize Application =====
document.addEventListener('DOMContentLoaded', () => {
    new Coding4KidzApp();
});

// ===== Additional CSS Animations =====
if (!document.querySelector('#additional-animations')) {
    const style = document.createElement('style');
    style.id = 'additional-animations';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
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
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes bounceIn {
            0% {
                transform: translate(-50%, -50%) scale(0.3);
                opacity: 0;
            }
            50% {
                transform: translate(-50%, -50%) scale(1.05);
            }
            70% {
                transform: translate(-50%, -50%) scale(0.9);
            }
            100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
        }
    `;
    document.head.appendChild(style);
} 