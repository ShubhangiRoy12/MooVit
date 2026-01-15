// MooVit Dashboard - Enhanced JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== CHART.JS INTEGRATION =====
    // Your original chart data with enhanced styling
    const chartCards = [
        { 
            id: 'chartShipments', 
            data: [5, 6, 7, 6, 8], 
            color: '#3b82f6', 
            label: 'Shipments',
            gradient: ['#3b82f6', '#1d4ed8']
        },
        { 
            id: 'chartVehicles', 
            data: [3, 4, 3, 5, 4], 
            color: '#059669', 
            label: 'Vehicles',
            gradient: ['#059669', '#047857']
        },
        { 
            id: 'chartRoutes', 
            data: [6, 8, 7, 9, 8], 
            color: '#7c3aed', 
            label: 'Routes',
            gradient: ['#7c3aed', '#5b21b6']
        },
        { 
            id: 'chartSchedule', 
            data: [4, 5, 6, 5, 7], 
            color: '#0891b2', 
            label: 'Schedule',
            gradient: ['#0891b2', '#0e7490']
        }
    ];

    // Initialize Charts (if Chart.js is loaded)
    if (typeof Chart !== 'undefined') {
        chartCards.forEach(chartConfig => {
            const ctx = document.getElementById(chartConfig.id);
            if (ctx) {
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                        datasets: [{
                            data: chartConfig.data,
                            borderColor: chartConfig.color,
                            backgroundColor: chartConfig.color + '20',
                            tension: 0.4,
                            fill: true,
                            borderWidth: 3,
                            pointBackgroundColor: chartConfig.color,
                            pointBorderColor: '#ffffff',
                            pointBorderWidth: 2,
                            pointRadius: 4,
                            pointHoverRadius: 6,
                            pointHoverBackgroundColor: chartConfig.color,
                            pointHoverBorderColor: '#ffffff'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                enabled: true,
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                titleColor: '#fff',
                                bodyColor: '#fff',
                                borderColor: chartConfig.color,
                                borderWidth: 1,
                                cornerRadius: 8,
                                displayColors: false,
                                callbacks: {
                                    title: function(context) {
                                        return chartConfig.label + ' - ' + context[0].label;
                                    },
                                    label: function(context) {
                                        return 'Value: ' + context.parsed.y;
                                    }
                                }
                            }
                        },
                        scales: {
                            x: { 
                                display: false,
                                grid: { display: false }
                            },
                            y: { 
                                display: false,
                                grid: { display: false }
                            }
                        },
                        elements: {
                            point: { 
                                radius: 0, 
                                hoverRadius: 6 
                            }
                        },
                        interaction: {
                            intersect: false,
                            mode: 'index'
                        }
                    }
                });
            }
        });
    }

    // ===== ENHANCED ANIMATIONS & INTERACTIONS =====
    
    // 1. Smooth Scroll Animation for Service Cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animate-in');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Apply observer to all service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)`;
        cardObserver.observe(card);
    });

    // 2. Enhanced Card Hover Effects
    serviceCards.forEach(card => {
        const cardIcon = card.querySelector('.card-icon');
        const cardLink = card.querySelector('.card-link');
        
        card.addEventListener('mouseenter', function() {
            // Card animation
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
            
            // Icon rotation
            if (cardIcon) {
                cardIcon.style.transform = 'rotate(5deg) scale(1.1)';
            }
            
            // Link arrow animation
            if (cardLink) {
                const arrow = cardLink.querySelector('i');
                if (arrow) {
                    arrow.style.transform = 'translateX(5px)';
                }
            }
            
            // Add glow effect
            this.style.boxShadow += ', 0 0 30px rgba(102, 126, 234, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)';
            
            if (cardIcon) {
                cardIcon.style.transform = 'rotate(0deg) scale(1)';
            }
            
            if (cardLink) {
                const arrow = cardLink.querySelector('i');
                if (arrow) {
                    arrow.style.transform = 'translateX(0)';
                }
            }
        });
    });

    // 3. Animated Statistics Counter
    function animateValue(element, start, end, duration) {
        const startTimestamp = performance.now();
        
        const step = (timestamp) => {
            const elapsed = timestamp - startTimestamp;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            
            element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        
        requestAnimationFrame(step);
    }

    // Animate any numbers found in stats
    const statElements = document.querySelectorAll('.card-stat');
    statElements.forEach(stat => {
        const text = stat.textContent;
        const numbers = text.match(/\d+/);
        if (numbers) {
            const finalValue = parseInt(numbers[0]);
            if (finalValue > 10) { // Only animate larger numbers
                stat.textContent = text.replace(numbers[0], '0');
                
                setTimeout(() => {
                    const newText = text.replace(numbers[0], finalValue);
                    animateValue(stat, 0, finalValue, 2000);
                    
                    // Update text after animation
                    setTimeout(() => {
                        stat.textContent = newText;
                    }, 2000);
                }, 500);
            }
        }
    });

    // 4. Header Scroll Effect
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        }
        
        lastScroll = currentScroll;
    });

    // 5. Parallax Background Effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.body;
        const speed = scrolled * 0.3;
        
        parallax.style.backgroundPosition = `center ${-speed}px`;
    });

    // 6. Dynamic Welcome Message
    function updateWelcomeMessage() {
        const hour = new Date().getHours();
        const welcomeTitle = document.querySelector('.welcome-section h2');
        
        if (welcomeTitle) {
            let greeting = 'Welcome to MooVit';
            
            if (hour < 12) {
                greeting = 'Good Morning! Welcome to MooVit';
            } else if (hour < 18) {
                greeting = 'Good Afternoon! Welcome to MooVit';
            } else {
                greeting = 'Good Evening! Welcome to MooVit';
            }
            
            welcomeTitle.textContent = greeting;
        }
    }
    
    updateWelcomeMessage();

    // 7. Interactive Service Card Stats
    function updateLiveStats() {
        const stats = [
            { selector: '.shipments .card-stat:first-child', baseValue: 152, variance: 10 },
            { selector: '.vehicles .card-stat:first-child', baseValue: 32, variance: 2 },
            { selector: '.routes .card-stat:first-child', baseValue: 12, variance: 1 },
            { selector: '.schedule .card-stat:first-child', baseValue: 25, variance: 3 },
            { selector: '.transit .card-stat:first-child', baseValue: 23, variance: 2 },
            { selector: '.hotel .card-stat:first-child', baseValue: 58, variance: 3 },
            { selector: '.hotel .card-stat:last-child', baseValue: 214, variance: 15 }
        ];
        
        stats.forEach(stat => {
            const element = document.querySelector(stat.selector);
            if (element) {
                const randomChange = Math.floor(Math.random() * stat.variance * 2) - stat.variance;
                const newValue = stat.baseValue + randomChange;
                const text = element.textContent;
                
                element.textContent = text.replace(/\d+/, newValue);
            }
        });
    }

    // Update stats every 30 seconds
    setInterval(updateLiveStats, 30000);

    // 8. Keyboard Navigation Support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('click', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // 9. Service Card Click Analytics (Optional)
    serviceCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const serviceName = this.querySelector('.card-title').textContent;
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Console log for analytics (replace with actual analytics)
            console.log(`Service clicked: ${serviceName}`);
        });
    });

    // 10. Loading State Management
    function hideLoadingState() {
        const loadingElements = document.querySelectorAll('.loading');
        loadingElements.forEach(el => {
            el.style.opacity = '0';
            setTimeout(() => el.remove(), 300);
        });
    }

    // Remove loading states after everything is loaded
    setTimeout(hideLoadingState, 1000);

    // 11. Performance Monitoring
    function logPerformance() {
        if (performance.navigation) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
        }
    }

    window.addEventListener('load', logPerformance);

    // 12. Error Handling for Charts
    window.addEventListener('error', function(e) {
        if (e.message.includes('Chart')) {
            console.warn('Chart.js not loaded. Charts will be hidden.');
            const chartContainers = document.querySelectorAll('.card-chart');
            chartContainers.forEach(container => {
                container.style.display = 'none';
            });
        }
    });

    // 13. Accessibility Improvements
    serviceCards.forEach(card => {
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // 14. Theme Support (Optional for future)
    function initializeTheme() {
        const savedTheme = localStorage.getItem('moovit-theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
    }

    // Uncomment to enable theme support
    // initializeTheme();

    console.log('🚛 MooVit Dashboard initialized successfully!');
});

// ===== UTILITY FUNCTIONS =====

// Smooth scroll to element
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}

// Format numbers with proper separators
function formatNumber(num) {
    return new Intl.NumberFormat().format(num);
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Export functions for global use
window.MooVit = {
    scrollToElement,
    formatNumber,
    debounce,
    isInViewport
};