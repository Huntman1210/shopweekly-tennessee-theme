// ShopWeekly Premium Animated Theme JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Scroll Progress Indicator
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        const progressBar = document.querySelector('.scroll-indicator');
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
    }

    // Header Scroll Effect
    function handleHeaderScroll() {
        const header = document.querySelector('.site-header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Parallax Effect for Hero Section
    function handleParallax() {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    }

    // Animate Elements on Scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animated');
            }
        });
    }

    // Smooth Scroll for Anchor Links
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Product Card Hover Effects
    function initProductCardEffects() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    // Button Ripple Effect
    function addRippleEffect() {
        const buttons = document.querySelectorAll('.product-button, .hero-cta');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Typing Animation for Hero Title
    function initTypingAnimation() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            setTimeout(typeWriter, 1000);
        }
    }

    // Floating Elements Animation
    function initFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((element, index) => {
            const delay = index * 2000;
            element.style.animationDelay = delay + 'ms';
        });
    }

    // Image Lazy Loading with Fade In
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('loading-shimmer');
                    img.classList.add('fade-in');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // Mobile Menu Toggle
    function initMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mainNav = document.querySelector('.main-nav');
        
        if (mobileToggle && mainNav) {
            mobileToggle.addEventListener('click', function() {
                mainNav.classList.toggle('active');
                this.classList.toggle('active');
            });
        }
    }

    // Shopping Cart Animation
    function initCartAnimation() {
        const addToCartButtons = document.querySelectorAll('.product-button');
        const cartIcon = document.querySelector('.cart-icon');
        
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Create flying product animation
                const productCard = this.closest('.product-card');
                const productImage = productCard.querySelector('.product-image');
                const rect = productImage.getBoundingClientRect();
                
                const flyingProduct = productImage.cloneNode(true);
                flyingProduct.style.position = 'fixed';
                flyingProduct.style.top = rect.top + 'px';
                flyingProduct.style.left = rect.left + 'px';
                flyingProduct.style.width = rect.width + 'px';
                flyingProduct.style.height = rect.height + 'px';
                flyingProduct.style.zIndex = '9999';
                flyingProduct.style.transition = 'all 1s ease';
                flyingProduct.style.pointerEvents = 'none';
                
                document.body.appendChild(flyingProduct);
                
                // Animate to cart
                setTimeout(() => {
                    const cartRect = cartIcon.getBoundingClientRect();
                    flyingProduct.style.top = cartRect.top + 'px';
                    flyingProduct.style.left = cartRect.left + 'px';
                    flyingProduct.style.width = '20px';
                    flyingProduct.style.height = '20px';
                    flyingProduct.style.opacity = '0';
                }, 100);
                
                // Remove element
                setTimeout(() => {
                    flyingProduct.remove();
                    
                    // Cart bounce animation
                    if (cartIcon) {
                        cartIcon.style.transform = 'scale(1.2)';
                        setTimeout(() => {
                            cartIcon.style.transform = 'scale(1)';
                        }, 200);
                    }
                }, 1100);
                
                // Show success message
                showNotification('Product added to cart!', 'success');
            });
        });
    }

    // Notification System
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#16a34a' : '#1e3a8a'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Testimonials Carousel
    function initTestimonialsCarousel() {
        const testimonials = document.querySelectorAll('.testimonial-card');
        let currentTestimonial = 0;
        
        if (testimonials.length > 1) {
            setInterval(() => {
                testimonials[currentTestimonial].style.opacity = '0.7';
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                testimonials[currentTestimonial].style.opacity = '1';
                testimonials[currentTestimonial].style.transform = 'scale(1.05)';
                
                setTimeout(() => {
                    testimonials.forEach((testimonial, index) => {
                        if (index !== currentTestimonial) {
                            testimonial.style.transform = 'scale(1)';
                        }
                    });
                }, 500);
            }, 4000);
        }
    }

    // Search Functionality
    function initSearch() {
        const searchInput = document.querySelector('.search-input');
        const productCards = document.querySelectorAll('.product-card');
        
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                
                productCards.forEach(card => {
                    const title = card.querySelector('.product-title').textContent.toLowerCase();
                    const description = card.querySelector('.product-description').textContent.toLowerCase();
                    
                    if (title.includes(searchTerm) || description.includes(searchTerm)) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }
    }

    // Performance Optimization
    function optimizePerformance() {
        // Debounce scroll events
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                updateScrollProgress();
                handleHeaderScroll();
                handleParallax();
                animateOnScroll();
            }, 10);
        });
        
        // Preload critical images
        const criticalImages = [
            '/assets/hero-mountains.jpg',
            '/assets/countryside-sunset.jpg'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // Initialize all functions
    function init() {
        updateScrollProgress();
        handleHeaderScroll();
        animateOnScroll();
        initSmoothScroll();
        initProductCardEffects();
        addRippleEffect();
        initTypingAnimation();
        initFloatingElements();
        initLazyLoading();
        initMobileMenu();
        initCartAnimation();
        initTestimonialsCarousel();
        initSearch();
        optimizePerformance();
        
        // Add scroll indicator to page
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        document.body.appendChild(scrollIndicator);
        
        console.log('ShopWeekly Premium Theme Loaded Successfully! 🎉');
    }

    // Initialize everything
    init();
});

// Add CSS for ripple effect
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.fade-in {
    animation: fadeInUp 0.8s ease;
}

.notification {
    font-weight: 500;
    font-size: 0.9rem;
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

