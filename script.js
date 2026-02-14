// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing tabs...');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = prompt('Search Philippines NCL cruises:');
            if (searchTerm) {
                searchCruises(searchTerm);
            }
        });
    }

    // Wishlist functionality
    const wishlistBtn = document.querySelector('.wishlist-btn');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            this.textContent = this.textContent === '♡' ? '♥' : '♡';
            this.style.color = this.textContent === '♥' ? '#ff6b6b' : '#333';
        });
    }

    // View Cruises button
    const viewCruisesBtn = document.querySelector('.view-cruises-btn');
    if (viewCruisesBtn) {
        viewCruisesBtn.addEventListener('click', function() {
            alert('Redirecting to Philippines NCL cruise bookings...');
            // Here you would redirect to the booking page
        });
    }

    // Mobile menu toggle (if needed)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Dynamic content loading for tabs
    function loadTabContent(tabName) {
        const content = document.getElementById(tabName);
        if (!content) return;

        switch(tabName) {
            case 'itineraries':
                if (!content.innerHTML.trim()) {
                    content.innerHTML = `
                        <h2>Philippines Cruise Itineraries</h2>
                        <div class="itinerary-list">
                            <div class="itinerary-item">
                                <h3>7-Day Philippines Island Hopping</h3>
                                <p><strong>Ports:</strong> Manila → Boracay → Palawan → Bohol → Cebu → Manila</p>
                                <p>Experience the best of the Philippines with Philippines NCL - visits to pristine beaches, cultural sites, and natural wonders.</p>
                            </div>
                            <div class="itinerary-item">
                                <h3>10-Day Philippines & Southeast Asia</h3>
                                <p><strong>Ports:</strong> Manila → Boracay → Palawan → Singapore → Kuala Lumpur → Manila</p>
                                <p>Combine Philippines beauty with Southeast Asian culture in this extended Philippines NCL cruise.</p>
                            </div>
                            <div class="itinerary-item">
                                <h3>5-Day Philippines Highlights</h3>
                                <p><strong>Ports:</strong> Manila → Boracay → Palawan → Manila</p>
                                <p>Perfect introduction to Philippines NCL cruising with key destinations.</p>
                            </div>
                        </div>
                    `;
                }
                break;
            case 'hotels':
                if (!content.innerHTML.trim()) {
                    content.innerHTML = `
                        <h2>Pre & Post Cruise Hotels</h2>
                        <div class="hotels-list">
                            <div class="hotel-item">
                                <h3>Manila Hotel</h3>
                                <p>Historic luxury hotel in the heart of Manila with bay views</p>
                                <div class="hotel-rating">★★★★★</div>
                            </div>
                            <div class="hotel-item">
                                <h3>Shangri-La Boracay</h3>
                                <p>Beachfront resort with world-class amenities</p>
                                <div class="hotel-rating">★★★★★</div>
                            </div>
                            <div class="hotel-item">
                                <h3>El Nido Resorts</h3>
                                <p>Eco-luxury resorts in stunning Palawan</p>
                                <div class="hotel-rating">★★★★★</div>
                            </div>
                        </div>
                    `;
                }
                break;
            case 'things-to-know':
                if (!content.innerHTML.trim()) {
                    content.innerHTML = `
                        <h2>Things to Know About Philippines Cruises</h2>
                        <div class="info-sections">
                            <div class="info-section">
                                <h3>Best Time to Cruise</h3>
                                <p>November to April offers the best weather with dry conditions and calm seas.</p>
                            </div>
                            <div class="info-section">
                                <h3>What to Pack</h3>
                                <ul>
                                    <li>Lightweight, breathable clothing</li>
                                    <li>Reef-safe sunscreen</li>
                                    <li>Snorkeling gear (optional)</li>
                                    <li>Waterproof camera</li>
                                    <li>Light rain jacket</li>
                                </ul>
                            </div>
                            <div class="info-section">
                                <h3>Currency & Tipping</h3>
                                <p>Philippine Peso (PHP) is the local currency. USD is widely accepted. Tipping is appreciated but not mandatory.</p>
                            </div>
                            <div class="info-section">
                                <h3>Health & Safety</h3>
                                <p>No special vaccinations required. Drink bottled water and use reef-safe sunscreen to protect marine life.</p>
                            </div>
                        </div>
                    `;
                }
                break;
        }
    }

    // Load content when tabs are clicked
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            loadTabContent(targetTab);
        });
    });
});

// Function to show specific tab
function showTab(tabName) {
    // Remove active class from all buttons and contents
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to target tab
    const targetButton = document.querySelector(`[data-tab="${tabName}"]`);
    const targetContent = document.getElementById(tabName);
    
    if (targetButton && targetContent) {
        targetButton.classList.add('active');
        targetContent.classList.add('active');
    }
    
    // Load dynamic content if needed
    loadTabContent(tabName);
}

// Navigation functions
function showDeals() {
    console.log('Deals clicked');
    showTab('highlights');
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showAbout() {
    console.log('About clicked');
    showTab('highlights');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showManage() {
    console.log('Manage clicked');
    showTab('highlights');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showHelp() {
    console.log('Help clicked');
    showTab('highlights');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Booking functionality
function showBookingForm() {
    // Simply redirect to the itineraries tab to show cruise options
    showTab('itineraries');
    // Scroll to the tab section
    document.querySelector('.tabs-container').scrollIntoView({ behavior: 'smooth' });
}

// Search functionality
async function searchCruises(searchTerm) {
    try {
        // Show the ports tab which has all destinations
        showTab('ports');
        // Scroll to the tab section
        document.querySelector('.tabs-container').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.log('Searching...');
    }
}

// Load and display cruises
async function loadCruises() {
    try {
        showTab('itineraries');
        // Scroll to the tab section
        document.querySelector('.tabs-container').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.log('Loading cruises...');
    }
}

// Utility functions
function formatCurrency(amount, currency = 'PHP') {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-PH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
    console.log('Event tracked:', eventName, eventData);
    // Here you would integrate with your analytics service
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Here you would log errors to your monitoring service
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log('Page loaded in:', Math.round(loadTime), 'ms');
    trackEvent('page_load_time', { loadTime: Math.round(loadTime) });
});

// Interactive functions for new pages
function showRegion(region) {
    alert(`Exploring ${region} region! Cruises available to this beautiful area.`);
}

function showIsland(island) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.island-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.island-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    event.target.classList.add('active');
    document.getElementById(island).classList.add('active');
}

function findCruises() {
    const duration = document.getElementById('duration')?.value;
    const budget = document.getElementById('budget')?.value;
    
    if (duration && budget) {
        alert(`Finding cruises: ${duration} days in ${budget} budget range...`);
    } else {
        alert('Please select both duration and budget to find your perfect cruise!');
    }
}

function updatePrice() {
    const packagePrice = parseFloat(document.getElementById('cruise-package')?.value || 59900);
    const cabinMultiplier = parseFloat(document.getElementById('cabin-type')?.value || 1.0);
    const passengers = parseInt(document.getElementById('passengers')?.value || 2);
    
    const totalPrice = packagePrice * cabinMultiplier * passengers;
    const perPersonPrice = totalPrice / passengers;
    
    if (document.getElementById('total-price')) {
        document.getElementById('total-price').textContent = `₱${totalPrice.toLocaleString()}`;
        document.getElementById('per-person').textContent = `₱${perPersonPrice.toLocaleString()} per person`;
    }
}

// Flash sale countdown timer
function startCountdown() {
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (!hoursEl) return;
    
    let hours = 23, minutes = 45, seconds = 30;
    
    setInterval(() => {
        seconds--;
        if (seconds < 0) {
            seconds = 59;
            minutes--;
            if (minutes < 0) {
                minutes = 59;
                hours--;
                if (hours < 0) {
                    hours = 23;
                    minutes = 59;
                    seconds = 59;
                }
            }
        }
        
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}

// Start countdown when page loads
document.addEventListener('DOMContentLoaded', function() {
    startCountdown();
    updatePrice();
});

// Quick Cruise Search
function searchQuickCruises() {
    const destination = document.getElementById('quick-destination')?.value;
    const duration = document.getElementById('quick-duration')?.value;
    const date = document.getElementById('quick-date')?.value;
    
    if (!destination || !duration) {
        alert('Please select a destination and cruise duration to search.');
        return;
    }
    
    // Build search message
    let searchMsg = `Searching for ${duration}-day cruises`;
    if (destination) searchMsg += ` to ${destination.charAt(0).toUpperCase() + destination.slice(1)}`;
    if (date) searchMsg += ` departing on ${date}`;
    searchMsg += '...';
    
    alert(searchMsg + '\n\nRedirecting to cruise deals page...');
    
    // Redirect to deals page with parameters
    window.location.href = `deals.html?destination=${destination}&duration=${duration}&date=${date}`;
}

// Set minimum date to today for date picker
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('quick-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});
