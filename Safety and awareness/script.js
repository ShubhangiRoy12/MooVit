// Enhanced Road Safety Website JavaScript

// Welcome animation and initialization
window.onload = function() {
    // Create welcome popup instead of alert
    showWelcomePopup();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize statistics counter
    initializeStatsCounter();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
};

// Welcome popup function
function showWelcomePopup() {
    const popupContent = `
        <div style="text-align: center; padding: 20px;">
            <i class="fas fa-shield-alt" style="font-size: 4em; color: #0066cc; margin-bottom: 20px;"></i>
            <h2 style="color: #003366; margin-bottom: 15px;">Welcome to Road Safety Awareness!</h2>
            <p style="color: #666; margin-bottom: 25px; line-height: 1.6;">
                Your safety is our top priority. Explore our comprehensive resources to learn how to stay safe on the road.
            </p>
            <button onclick="closePopup()" style="
                background: linear-gradient(135deg, #0066cc 0%, #0080ff 100%);
                color: white;
                border: none;
                padding: 12px 25px;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            ">Let's Get Started!</button>
        </div>
    `;
    
    setTimeout(() => {
        showPopup(popupContent);
    }, 1000);
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Statistics counter animation
function initializeStatsCounter() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });
    
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (current > target) current = target;
                
                // Format numbers for display
                if (target >= 1000000) {
                    counter.textContent = (current / 1000000).toFixed(1) + 'M';
                } else if (target >= 1000) {
                    counter.textContent = (current / 1000).toFixed(0) + 'K';
                } else {
                    counter.textContent = Math.floor(current) + '%';
                }
                
                requestAnimationFrame(updateCounter);
            }
        };
        
        updateCounter();
    });
}

// Initialize scroll animations
function initializeAnimations() {
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
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.importance-card, .tip-card, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Tip details popup
function showTipDetails(tipType) {
    const tipDetails = {
        seatbelt: {
            title: "Always Wear Your Seatbelt",
            icon: "fas fa-user-shield",
            content: `
                <h3><i class="fas fa-user-shield"></i> Seatbelt Safety</h3>
                <div style="margin: 20px 0;">
                    <p><strong>Why it matters:</strong> Seatbelts reduce the risk of death by 45% and serious injury by 50% for front-seat passengers.</p>
                    <br>
                    <p><strong>Proper usage:</strong></p>
                    <ul style="text-align: left; margin: 10px 0;">
                        <li>Always buckle up before starting the engine</li>
                        <li>Ensure the belt crosses your chest and hips</li>
                        <li>Never put the belt behind your back or under your arm</li>
                        <li>Check that all passengers are properly secured</li>
                    </ul>
                    <br>
                    <div style="background: #e6f3ff; padding: 15px; border-radius: 10px; margin: 15px 0;">
                        <i class="fas fa-lightbulb" style="color: #0066cc;"></i>
                        <strong> Remember:</strong> It only takes 3 seconds to buckle up, but it can save your life!
                    </div>
                </div>
            `
        },
        speed: {
            title: "Follow Speed Limits",
            icon: "fas fa-tachometer-alt",
            content: `
                <h3><i class="fas fa-tachometer-alt"></i> Speed Management</h3>
                <div style="margin: 20px 0;">
                    <p><strong>The impact of speed:</strong> Higher speeds dramatically increase both the likelihood of crashes and their severity.</p>
                    <br>
                    <p><strong>Key guidelines:</strong></p>
                    <ul style="text-align: left; margin: 10px 0;">
                        <li>Always observe posted speed limits</li>
                        <li>Reduce speed in bad weather conditions</li>
                        <li>Slow down in school zones and residential areas</li>
                        <li>Maintain safe following distance</li>
                    </ul>
                    <br>
                    <div style="background: #ffe6e6; padding: 15px; border-radius: 10px; margin: 15px 0;">
                        <i class="fas fa-exclamation-triangle" style="color: #cc0000;"></i>
                        <strong> Fact:</strong> A 10% increase in speed leads to a 40% increase in fatal crash risk!
                    </div>
                </div>
            `
        },
        phone: {
            title: "No Phone While Driving",
            icon: "fas fa-mobile-alt",
            content: `
                <h3><i class="fas fa-mobile-alt"></i> Distraction-Free Driving</h3>
                <div style="margin: 20px 0;">
                    <p><strong>The danger:</strong> Using a phone while driving makes you 4 times more likely to be in a crash.</p>
                    <br>
                    <p><strong>Safe practices:</strong></p>
                    <ul style="text-align: left; margin: 10px 0;">
                        <li>Put your phone in airplane mode or silent</li>
                        <li>Use hands-free systems for emergency calls only</li>
                        <li>Pull over safely if you must use your phone</li>
                        <li>Let passengers handle navigation and calls</li>
                    </ul>
                    <br>
                    <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 15px 0;">
                        <i class="fas fa-info-circle" style="color: #856404;"></i>
                        <strong> Tip:</strong> Use "Do Not Disturb While Driving" mode on your smartphone!
                    </div>
                </div>
            `
        },
        alcohol: {
            title: "Never Drink and Drive",
            icon: "fas fa-ban",
            content: `
                <h3><i class="fas fa-ban"></i> Zero Tolerance Policy</h3>
                <div style="margin: 20px 0;">
                    <p><strong>The reality:</strong> Alcohol impairs judgment, reaction time, and motor control - even in small amounts.</p>
                    <br>
                    <p><strong>Safe alternatives:</strong></p>
                    <ul style="text-align: left; margin: 10px 0;">
                        <li>Designate a sober driver before going out</li>
                        <li>Use rideshare services or public transportation</li>
                        <li>Stay overnight if necessary</li>
                        <li>Call a friend or family member for a ride</li>
                    </ul>
                    <br>
                    <div style="background: #f8d7da; padding: 15px; border-radius: 10px; margin: 15px 0;">
                        <i class="fas fa-skull-crossbones" style="color: #721c24;"></i>
                        <strong> Warning:</strong> One drink can be one too many. There's no safe amount when driving!
                    </div>
                </div>
            `
        },
        pedestrians: {
            title: "Watch for Pedestrians",
            icon: "fas fa-walking",
            content: `
                <h3><i class="fas fa-walking"></i> Protecting Vulnerable Road Users</h3>
                <div style="margin: 20px 0;">
                    <p><strong>Why it's crucial:</strong> Pedestrians and cyclists are the most vulnerable road users with the highest injury rates.</p>
                    <br>
                    <p><strong>Best practices:</strong></p>
                    <ul style="text-align: left; margin: 10px 0;">
                        <li>Always check blind spots before turning</li>
                        <li>Yield right of way at crosswalks</li>
                        <li>Reduce speed in pedestrian-heavy areas</li>
                        <li>Be extra cautious during school hours</li>
                        <li>Watch for cyclists in bike lanes</li>
                    </ul>
                    <br>
                    <div style="background: #d1ecf1; padding: 15px; border-radius: 10px; margin: 15px 0;">
                        <i class="fas fa-heart" style="color: #0c5460;"></i>
                        <strong> Remember:</strong> Every pedestrian is someone's family member. Drive with care!
                    </div>
                </div>
            `
        },
        helmet: {
            title: "Always Wear Helmets",
            icon: "fas fa-hard-hat",
            content: `
                <h3><i class="fas fa-hard-hat"></i> Head Protection Saves Lives</h3>
                <div style="margin: 20px 0;">
                    <p><strong>Life-saving protection:</strong> Helmets reduce the risk of head injury by 70% and death by 40%.</p>
                    <br>
                    <p><strong>Helmet safety tips:</strong></p>
                    <ul style="text-align: left; margin: 10px 0;">
                        <li>Choose a helmet that meets safety standards</li>
                        <li>Ensure proper fit - snug but comfortable</li>
                        <li>Replace helmets after any impact</li>
                        <li>Check straps and buckles regularly</li>
                        <li>Wear it every time, even for short trips</li>
                    </ul>
                    <br>
                    <div style="background: #d4edda; padding: 15px; border-radius: 10px; margin: 15px 0;">
                        <i class="fas fa-shield-alt" style="color: #155724;"></i>
                        <strong> Protection:</strong> Your brain is irreplaceable. Always wear a quality helmet!
                    </div>
                </div>
            `
        }
    };
    
    if (tipDetails[tipType]) {
        showPopup(tipDetails[tipType].content);
    }
}

// Importance card popup
function showImportancePopup(type) {
    const importanceDetails = {
        lives: {
            content: `
                <h3><i class="fas fa-user-friends"></i> Saving Lives Through Road Safety</h3>
                <div style="margin: 20px 0;">
                    <p>Road traffic crashes are a leading cause of death worldwide, claiming over 1.35 million lives annually. However, most of these deaths are preventable through proper safety measures.</p>
                    <br>
                    <h4>Impact of Safety Measures:</h4>
                    <ul style="text-align: left; margin: 10px 0;">
                        <li><strong>Seatbelts:</strong> Save approximately 15,000 lives per year</li>
                        <li><strong>Airbags:</strong> Reduce driver fatality risk by 29%</li>
                        <li><strong>Speed reduction:</strong> A 5% decrease in speed reduces fatal crashes by 30%</li>
                        <li><strong>Helmet use:</strong> Prevents 37% of motorcycle fatalities</li>
                    </ul>
                </div>
            `
        },
        families: {
            content: `
                <h3><i class="fas fa-home"></i> Protecting Families and Communities</h3>
                <div style="margin: 20px 0;">
                    <p>Road crashes don't just affect individuals - they devastate entire families and communities. The ripple effects include emotional trauma, financial hardship, and long-term care needs.</p>
                    <br>
                    <h4>Community Impact:</h4>
                    <ul style="text-align: left; margin: 10px 0;">
                        <li><strong>Family stability:</strong> Prevents breadwinner loss</li>
                        <li><strong>Child welfare:</strong> Keeps families intact</li>
                        <li><strong>Community resources:</strong> Reduces strain on emergency services</li>
                        <li><strong>Social cohesion:</strong> Maintains neighborhood safety</li>
                    </ul>
                </div>
            `
        },
        economy: {
            content: `
                <h3><i class="fas fa-chart-line"></i> Economic Benefits of Road Safety</h3>
                <div style="margin: 20px 0;">
                    <p>Road crashes cost countries 3-5% of their GDP annually. Investing in road safety generates significant economic returns through reduced healthcare costs, property damage, and productivity losses.</p>
                    <br>
                    <h4>Cost Savings Include:</h4>
                    <ul style="text-align: left; margin: 10px 0;">
                        <li><strong>Healthcare:</strong> Reduced emergency and long-term medical costs</li>
                        <li><strong>Insurance:</strong> Lower premiums and claims</li>
                        <li><strong>Productivity:</strong> Fewer work days lost to injuries</li>
                        <li><strong>Infrastructure:</strong> Less damage to roads and property</li>
                    </ul>
                </div>
            `
        }
    };
    
    if (importanceDetails[type]) {
        showPopup(importanceDetails[type].content);
    }
}

// Add click listeners for importance cards
document.addEventListener('DOMContentLoaded', function() {
    const importanceCards = document.querySelectorAll('.importance-card');
    importanceCards.forEach(card => {
        const popupType = card.getAttribute('data-popup');
        if (popupType) {
            card.addEventListener('click', () => showImportancePopup(popupType));
        }
    });
});

// Emergency information popup
function showEmergencyInfo() {
    const emergencyContent = `
        <div style="text-align: center;">
            <h3><i class="fas fa-phone" style="color: #dc3545;"></i> Emergency Contacts</h3>
            <div style="margin: 20px 0;">
                <div style="background: #f8d7da; padding: 15px; border-radius: 10px; margin: 10px 0;">
                    <strong style="color: #721c24;">Police Emergency: 100</strong>
                </div>
                <div style="background: #f8d7da; padding: 15px; border-radius: 10px; margin: 10px 0;">
                    <strong style="color: #721c24;">Medical Emergency: 108</strong>
                </div>
                <div style="background: #f8d7da; padding: 15px; border-radius: 10px; margin: 10px 0;">
                    <strong style="color: #721c24;">Fire Emergency: 101</strong>
                </div>
                <div style="background: #d1ecf1; padding: 15px; border-radius: 10px; margin: 10px 0;">
                    <strong style="color: #0c5460;">Traffic Helpline: 1073</strong>
                </div>
            </div>
            <p style="color: #666; margin-top: 15px;">
                <i class="fas fa-info-circle"></i> Save these numbers in your phone for quick access during emergencies.
            </p>
        </div>
    `;
    
    showPopup(emergencyContent);
}

// Report form popup
function showReportForm() {
    const reportContent = `
        <h3><i class="fas fa-exclamation-triangle"></i> Report Unsafe Road Conditions</h3>
        <form onsubmit="submitReport(event)" style="margin: 20px 0;">
            <div style="margin: 15px 0;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">Location:</label>
                <input type="text" placeholder="Street address or landmark" style="width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 5px;">
            </div>
            <div style="margin: 15px 0;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">Issue Type:</label>
                <select style="width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 5px;">
                    <option>Pothole</option>
                    <option>Broken traffic light</option>
                    <option>Missing road signs</option>
                    <option>Poor lighting</option>
                    <option>Debris on road</option>
                    <option>Other</option>
                </select>
            </div>
            <div style="margin: 15px 0;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">Description:</label>
                <textarea placeholder="Describe the safety issue in detail..." style="width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 5px; height: 80px; resize: vertical;"></textarea>
            </div>
            <button type="submit" style="
                background: linear-gradient(135deg, #0066cc 0%, #0080ff 100%);
                color: white;
                border: none;
                padding: 12px 25px;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
                width: 100%;
                margin-top: 10px;
            ">Submit Report</button>
        </form>
    `;
    
    showPopup(reportContent);
}

// Submit report function
function submitReport(event) {
    event.preventDefault();
    
    // Simulate form submission
    const successContent = `
        <div style="text-align: center; padding: 20px;">
            <i class="fas fa-check-circle" style="font-size: 4em; color: #28a745; margin-bottom: 20px;"></i>
            <h3 style="color: #155724; margin-bottom: 15px;">Report Submitted Successfully!</h3>
            <p style="color: #666; margin-bottom: 25px;">
                Thank you for helping make our roads safer. Your report has been forwarded to the relevant authorities.
            </p>
            <p style="color: #666; font-size: 0.9em;">
                Reference ID: RS-2025-${Math.floor(Math.random() * 10000)}
            </p>
        </div>
    `;
    
    showPopup(successContent);
}

// Generic popup functions
function showPopup(content) {
    const overlay = document.getElementById('popup-overlay');
    const body = document.getElementById('popup-body');
    
    body.innerHTML = content;
    overlay.classList.add('active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    const overlay = document.getElementById('popup-overlay');
    overlay.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Keyboard event for closing popup
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePopup();
    }
});

// Add loading animation for page transitions
function addLoadingEffect() {
    const loader = document.createElement('div');
    loader.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0066cc 0%, #0080ff 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 1;
            transition: opacity 0.5s ease;
        ">
            <div style="text-align: center; color: white;">
                <i class="fas fa-shield-alt fa-spin" style="font-size: 3em; margin-bottom: 20px;"></i>
                <h3>Loading Road Safety Information...</h3>
            </div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loader);
        }, 500);
    }, 1500);
}