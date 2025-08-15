 // State management
            let currentPage = 'home';
            let currentTheme = 'dark';

            // Page navigation
            function showPage(pageName) {
                // Hide all pages
                document.querySelectorAll('.page').forEach(page => {
                    page.classList.remove('active');
                });
                
                // Show selected page
                const targetPage = document.getElementById(pageName + '-page');
                if (targetPage) {
                    targetPage.classList.add('active');
                    currentPage = pageName;
                    
                    // Scroll to top smoothly
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    
                    // Update page title
                    const pageTitles = {
                        'home': 'GitHub Clone - Enhanced',
                        'features': 'Features - GitHub Clone',
                        'solutions': 'Solutions - GitHub Clone', 
                        'opensource': 'Open Source - GitHub Clone',
                        'pricing': 'Pricing - GitHub Clone',
                        'enterprise': 'Enterprise - GitHub Clone'
                    };
                    document.title = pageTitles[pageName] || 'GitHub Clone';
                }
            }

            // Modal management
            function openModal(modalName) {
                const modal = document.getElementById(modalName + '-modal');
                if (modal) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    
                    // Focus on first input
                    setTimeout(() => {
                        const firstInput = modal.querySelector('input');
                        if (firstInput) firstInput.focus();
                    }, 300);
                }
            }

            function closeModal(modalName) {
                const modal = document.getElementById(modalName + '-modal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }

            function switchModal(fromModal, toModal) {
                closeModal(fromModal);
                setTimeout(() => openModal(toModal), 200);
            }

            // Theme toggle
            function toggleTheme() {
                const html = document.documentElement;
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                html.setAttribute('data-theme', newTheme);
                currentTheme = newTheme;
                
                // Save theme preference
                try {
                    localStorage.setItem('github-clone-theme', newTheme);
                } catch (e) {
                    console.log('LocalStorage not available');
                }
            }

            // Form handlers
            function handleSignIn(event) {
                event.preventDefault();
                const formData = new FormData(event.target);
                
                // Show loading state
                const submitBtn = event.target.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Signing in...';
                submitBtn.disabled = true;
                submitBtn.classList.add('loading');
                
                // Simulate API call
                setTimeout(() => {
                    alert('Welcome back! Sign in successful.');
                    closeModal('signin');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('loading');
                    event.target.reset();
                }, 2000);
            }

            function handleSignUp(event) {
                event.preventDefault();
                const formData = new FormData(event.target);
                
                // Show loading state
                const submitBtn = event.target.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Creating account...';
                submitBtn.disabled = true;
                submitBtn.classList.add('loading');
                
                // Simulate API call
                setTimeout(() => {
                    alert('Account created successfully! Welcome to GitHub.');
                    closeModal('signup');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('loading');
                    event.target.reset();
                }, 2000);
            }

            // Search functionality
            function setupSearch() {
                const searchInput = document.querySelector('.search-input');
                if (searchInput) {
                    searchInput.addEventListener('input', (e) => {
                        if (e.target.value.length > 0) {
                            // Simulate search suggestions
                            console.log('Searching for:', e.target.value);
                        }
                    });
                    
                    searchInput.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            alert(`Searching for: "${e.target.value}"`);
                        }
                    });
                }
            }

            // Header scroll effect
            function setupHeaderScroll() {
                const header = document.querySelector('.site-header');
                let lastScroll = 0;
                
                window.addEventListener('scroll', () => {
                    const currentScroll = window.pageYOffset;
                    
                    if (currentScroll > 50) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                    
                    lastScroll = currentScroll;
                });
            }

            // Intersection Observer for animations
            function setupAnimations() {
                const observerOptions = {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                };

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }
                    });
                }, observerOptions);

                // Observe feature cards that aren't in the hero
                document.querySelectorAll('.feature-card:not(.hero .feature-card)').forEach(card => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    card.style.transition = 'all 0.6s ease';
                    observer.observe(card);
                });
            }

            // Keyboard shortcuts
            function setupKeyboardShortcuts() {
                document.addEventListener('keydown', (e) => {
                    // Close modals with Escape
                    if (e.key === 'Escape') {
                        document.querySelectorAll('.modal.active').forEach(modal => {
                            const modalName = modal.id.replace('-modal', '');
                            closeModal(modalName);
                        });
                    }
                    
                    // Focus search with '/'
                    if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
                        const activeElement = document.activeElement;
                        if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
                            e.preventDefault();
                            const searchInput = document.querySelector('.search-input');
                            if (searchInput) searchInput.focus();
                        }
                    }
                    
                    // Quick navigation with Alt + number
                    if (e.altKey && e.key >= '1' && e.key <= '5') {
                        e.preventDefault();
                        const pages = ['home', 'features', 'solutions', 'opensource', 'pricing'];
                        const pageIndex = parseInt(e.key) - 1;
                        if (pages[pageIndex]) {
                            showPage(pages[pageIndex]);
                        }
                    }
                });
            }

            // Click outside to close modals
            function setupModalClickOutside() {
                document.addEventListener('click', (e) => {
                    if (e.target.classList.contains('modal')) {
                        const modalName = e.target.id.replace('-modal', '');
                        closeModal(modalName);
                    }
                });
            }

            // Enhanced button effects
            function setupButtonEffects() {
                document.querySelectorAll('.btn').forEach(btn => {
                    btn.addEventListener('click', function(e) {
                        // Create ripple effect
                        const ripple = document.createElement('span');
                        const rect = this.getBoundingClientRect();
                        const size = Math.max(rect.width, rect.height);
                        const x = e.clientX - rect.left - size / 2;
                        const y = e.clientY - rect.top - size / 2;
                        
                        ripple.style.width = ripple.style.height = size + 'px';
                        ripple.style.left = x + 'px';
                        ripple.style.top = y + 'px';
                        ripple.style.position = 'absolute';
                        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
                        ripple.style.borderRadius = '50%';
                        ripple.style.transform = 'scale(0)';
                        ripple.style.animation = 'ripple 0.6s linear';
                        ripple.style.pointerEvents = 'none';
                        
                        this.style.position = 'relative';
                        this.style.overflow = 'hidden';
                        this.appendChild(ripple);
                        
                        setTimeout(() => {
                            ripple.remove();
                        }, 600);
                    });
                });
            }

            // Add ripple animation to CSS
            function addRippleAnimation() {
                const style = document.createElement('style');
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

            // Initialize everything when DOM is loaded
            function init() {
                // Load saved theme
                try {
                    const savedTheme = localStorage.getItem('github-clone-theme');
                    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
                        currentTheme = savedTheme;
                        document.documentElement.setAttribute('data-theme', savedTheme);
                    }
                } catch (e) {
                    console.log('LocalStorage not available');
                }

                // Setup all functionality
                setupSearch();
                setupHeaderScroll();
                setupAnimations();
                setupKeyboardShortcuts();
                setupModalClickOutside();
                setupButtonEffects();
                addRippleAnimation();

                // Add some dynamic content loading simulation
                setTimeout(() => {
                    document.querySelectorAll('.loading').forEach(el => {
                        el.classList.remove('loading');
                    });
                }, 1000);

                console.log('🚀 Enhanced GitHub Clone initialized!');
                console.log('💡 Keyboard shortcuts:');
                console.log('  - Press "/" to focus search');
                console.log('  - Press Alt + 1-5 for quick navigation');
                console.log('  - Press Escape to close modals');
            }

            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', init);
            } else {
                init();
            }

            // Add some easter eggs for fun
            console.log(`
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⣠⣴⣶⣿⣿⣷⣿⣿⣷⣿⣿⣶⣦⣄⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀
    ⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀
    ⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀
    ⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀
    ⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀
    ⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀
    ⠀⠀⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠀⠀⠀⠀
    ⠀⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠉⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠉⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠛⠛⠛⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    
    Welcome to the Enhanced GitHub Clone! 🎉
            `);