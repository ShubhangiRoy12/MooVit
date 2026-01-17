// City coordinates for Madhya Pradesh transport network
const cities = {
    bhopal: [23.2599, 77.4126],
    indore: [22.7196, 75.8577],
    gwalior: [26.2183, 78.1828],
    jabalpur: [23.1815, 79.9864],
    ujjain: [23.1765, 75.7885],
    sagar: [23.8388, 78.7378],
    ratlam: [23.3315, 75.0367],
    dewas: [22.9659, 76.0591]
};

// Transport data
let selectedRoutes = {
    bus: 0,
    train: 0
};

let selectedItems = [];
let currentTransportMode = 'bus';
let routeMap;
let fromMarker = null;
let toMarker = null;
let routeLine = null;

// DOM elements
const fromCitySelect = document.getElementById('fromCity');
const toCitySelect = document.getElementById('toCity');
const travelDateInput = document.getElementById('travelDate');
const passengersInput = document.getElementById('passengers');
const searchButton = document.getElementById('searchRoutes');
const selectedRouteDiv = document.getElementById('selectedRoute');
const transportToggleButtons = document.querySelectorAll('.toggle-btn');
const routeItems = document.querySelectorAll('.route-item');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    initializeCharts();
    initializeEventListeners();
    setDefaultDate();
});

function initializeMap() {
    // Initialize main route map
    routeMap = L.map('routeMap').setView([23.5, 77.0], 7);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(routeMap);

    // Add city markers with blue landmarks
    addCityMarkers();
    addRouteLines();
}

function addCityMarkers() {
    // Create custom blue marker icon
    const blueIcon = L.divIcon({
        className: 'blue-marker',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -10],
        html: '<div style="background-color: #4A90E2; border: 3px solid white; border-radius: 50%; width: 20px; height: 20px; box-shadow: 0 2px 8px rgba(74, 144, 226, 0.5);"></div>'
    });

    Object.entries(cities).forEach(([city, coords]) => {
        L.marker(coords, { icon: blueIcon })
            .addTo(routeMap)
            .bindPopup(`📍 ${capitalizeFirstLetter(city)}<br>Click to select as origin/destination`)
            .on('click', function() {
                handleMarkerClick(city, coords);
            });
    });
}

function handleMarkerClick(city, coords) {
    const cityName = capitalizeFirstLetter(city);
    
    // If no from city selected, set as from
    if (!fromCitySelect.value) {
        fromCitySelect.value = city;
        showNotification(`Selected ${cityName} as departure city`);
        updateFromMarker(coords, cityName);
    } 
    // If from is selected but no to city, set as to
    else if (!toCitySelect.value && fromCitySelect.value !== city) {
        toCitySelect.value = city;
        showNotification(`Selected ${cityName} as destination city`);
        updateToMarker(coords, cityName);
        drawRouteLine();
    }
    // If both are selected, replace the from city
    else if (fromCitySelect.value !== city) {
        fromCitySelect.value = city;
        showNotification(`Changed departure city to ${cityName}`);
        updateFromMarker(coords, cityName);
        if (toCitySelect.value) {
            drawRouteLine();
        }
    }
    
    validateForm();
}

function updateFromMarker(coords, cityName) {
    if (fromMarker) {
        routeMap.removeLayer(fromMarker);
    }
    
    const greenIcon = L.divIcon({
        className: 'from-marker',
        iconSize: [25, 25],
        iconAnchor: [12, 12],
        html: '<div style="background-color: #4caf50; border: 3px solid white; border-radius: 50%; width: 25px; height: 25px; box-shadow: 0 3px 10px rgba(76, 175, 80, 0.6); display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold;">F</div>'
    });
    
    fromMarker = L.marker(coords, { icon: greenIcon })
        .addTo(routeMap)
        .bindPopup(`🚀 Departure: ${cityName}`);
}

function updateToMarker(coords, cityName) {
    if (toMarker) {
        routeMap.removeLayer(toMarker);
    }
    
    const redIcon = L.divIcon({
        className: 'to-marker',
        iconSize: [25, 25],
        iconAnchor: [12, 12],
        html: '<div style="background-color: #f44336; border: 3px solid white; border-radius: 50%; width: 25px; height: 25px; box-shadow: 0 3px 10px rgba(244, 67, 54, 0.6); display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold;">T</div>'
    });
    
    toMarker = L.marker(coords, { icon: redIcon })
        .addTo(routeMap)
        .bindPopup(`🎯 Destination: ${cityName}`);
}

function drawRouteLine() {
    if (routeLine) {
        routeMap.removeLayer(routeLine);
    }
    
    const fromCity = fromCitySelect.value;
    const toCity = toCitySelect.value;
    
    if (fromCity && toCity && cities[fromCity] && cities[toCity]) {
        routeLine = L.polyline([cities[fromCity], cities[toCity]], {
            color: '#e74c3c',
            weight: 4,
            opacity: 0.8,
            dashArray: '10, 10'
        }).addTo(routeMap);
        
        // Fit map to show the route
        const group = new L.featureGroup([fromMarker, toMarker, routeLine]);
        routeMap.fitBounds(group.getBounds().pad(0.1));
    }
}

function addRouteLines() {
    // Add some sample routes with different colors for visual appeal
    const sampleRoutes = [
        { from: 'indore', to: 'dewas', color: '#ff6b6b', weight: 3, opacity: 0.4 },
        { from: 'ujjain', to: 'bhopal', color: '#4ecdc4', weight: 3, opacity: 0.4 },
        { from: 'bhopal', to: 'indore', color: '#45b7d1', weight: 3, opacity: 0.4 },
        { from: 'gwalior', to: 'jabalpur', color: '#f9ca24', weight: 3, opacity: 0.4 },
        { from: 'bhopal', to: 'jabalpur', color: '#6c5ce7', weight: 3, opacity: 0.4 },
        { from: 'sagar', to: 'bhopal', color: '#a29bfe', weight: 3, opacity: 0.4 }
    ];

    sampleRoutes.forEach(route => {
        if (cities[route.from] && cities[route.to]) {
            L.polyline([cities[route.from], cities[route.to]], {
                color: route.color,
                weight: route.weight,
                opacity: route.opacity,
                interactive: false
            }).addTo(routeMap);
        }
    });
}

function initializeCharts() {
    // Safety Score Chart
    const safetyCtx = document.getElementById('safetyChart').getContext('2d');
    new Chart(safetyCtx, {
        type: 'doughnut',
        data: {
            labels: ['High Safety', 'Moderate Safety', 'Low Safety'],
            datasets: [{
                data: [65, 25, 10],
                backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            onClick: (event, elements) => {
                if (elements.length > 0) {
                    const index = elements[0].index;
                    const labels = ['High Safety', 'Moderate Safety', 'Low Safety'];
                    filterRoutesBySafety(labels[index]);
                }
            }
        }
    });

    // Selections Chart
    const selectionsCtx = document.getElementById('selectionsChart').getContext('2d');
    window.selectionsChart = new Chart(selectionsCtx, {
        type: 'pie',
        data: {
            labels: ['Bus Routes', 'Train Routes'],
            datasets: [{
                data: [selectedRoutes.bus, selectedRoutes.train],
                backgroundColor: ['#4A90E2', '#8b5cf6'],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function initializeEventListeners() {
    // Search routes button
    searchButton.addEventListener('click', searchRoutes);

    // Transport mode toggle
    transportToggleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const mode = e.target.dataset.mode;
            switchTransportMode(mode);
        });
    });

    // Route item clicks
    routeItems.forEach(item => {
        item.addEventListener('click', () => {
            selectRoute(item);
        });
    });

    // Form validation
    fromCitySelect.addEventListener('change', (e) => {
        const fromCity = e.target.value;
        if (fromCity && cities[fromCity]) {
            updateFromMarker(cities[fromCity], capitalizeFirstLetter(fromCity));
            if (toCitySelect.value) {
                drawRouteLine();
            }
        }
        validateForm();
    });

    toCitySelect.addEventListener('change', (e) => {
        const toCity = e.target.value;
        if (toCity && cities[toCity]) {
            updateToMarker(cities[toCity], capitalizeFirstLetter(toCity));
            if (fromCitySelect.value) {
                drawRouteLine();
            }
        }
        validateForm();
    });
}

function setDefaultDate() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    travelDateInput.valueAsDate = tomorrow;
}

function searchRoutes() {
    const fromCity = fromCitySelect.value;
    const toCity = toCitySelect.value;
    const travelDate = travelDateInput.value;
    const passengers = passengersInput.value;

    if (!fromCity || !toCity) {
        alert('Please select both departure and destination cities');
        return;
    }

    if (fromCity === toCity) {
        alert('Departure and destination cities cannot be the same');
        return;
    }

    if (!travelDate) {
        alert('Please select a travel date');
        return;
    }

    if (!passengers || passengers < 1) {
        alert('Please enter number of passengers');
        return;
    }

    // Update selected route display
    selectedRouteDiv.innerHTML = `
        <strong>Route:</strong> ${capitalizeFirstLetter(fromCity)} → ${capitalizeFirstLetter(toCity)}<br>
        <strong>Date:</strong> ${formatDate(travelDate)}<br>
        <strong>Passengers:</strong> ${passengers}<br>
        <strong>Mode:</strong> ${currentTransportMode === 'bus' ? '🚌 Bus' : '🚂 Train'}
    `;

    // Show relevant routes
    filterRoutesBySelection(fromCity, toCity);
    
    // Show notification
    showNotification(`Found routes from ${capitalizeFirstLetter(fromCity)} to ${capitalizeFirstLetter(toCity)}`);
}

function switchTransportMode(mode) {
    currentTransportMode = mode;
    
    // Update button states
    transportToggleButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.mode === mode) {
            btn.classList.add('active');
        }
    });

    // Update route display if search has been performed
    if (fromCitySelect.value && toCitySelect.value) {
        selectedRouteDiv.innerHTML = selectedRouteDiv.innerHTML.replace(
            /<strong>Mode:<\/strong>.*?(<br>|$)/,
            `<strong>Mode:</strong> ${mode === 'bus' ? '🚌 Bus' : '🚂 Train'}$1`
        );
    }
}

function selectRoute(routeElement) {
    // Toggle selection
    routeElement.classList.toggle('selected');
    
    const isSelected = routeElement.classList.contains('selected');
    const isTrainRoute = routeElement.closest('.schedule-card').querySelector('h3').textContent.includes('Train');
    
    if (isSelected) {
        selectedItems.push({
            element: routeElement,
            type: isTrainRoute ? 'train' : 'bus',
            price: parseInt(routeElement.dataset.price)
        });
        
        if (isTrainRoute) {
            selectedRoutes.train++;
        } else {
            selectedRoutes.bus++;
        }
    } else {
        // Remove from selected items
        selectedItems = selectedItems.filter(item => item.element !== routeElement);
        
        if (isTrainRoute) {
            selectedRoutes.train--;
        } else {
            selectedRoutes.bus--;
        }
    }
    
    // Update selections chart
    updateSelectionsChart();
}

function updateSelectionsChart() {
    if (window.selectionsChart) {
        window.selectionsChart.data.datasets[0].data = [selectedRoutes.bus, selectedRoutes.train];
        window.selectionsChart.update();
    }
}

function filterRoutesBySelection(fromCity, toCity) {
    routeItems.forEach(item => {
        const routeText = item.querySelector('.route-header').textContent.toLowerCase();
        const from = capitalizeFirstLetter(fromCity).toLowerCase();
        const to = capitalizeFirstLetter(toCity).toLowerCase();
        
        if (routeText.includes(from) && routeText.includes(to)) {
            item.style.backgroundColor = '#e8f5e8';
            item.style.borderLeftColor = '#4caf50';
        } else {
            item.style.backgroundColor = '#f8fbff';
            item.style.borderLeftColor = '#4A90E2';
        }
    });
}

function filterRoutesBySafety(safetyLevel) {
    // Simulate filtering routes by safety level
    routeItems.forEach(item => {
        // Reset styles
        item.style.opacity = '1';
        
        // Apply filter based on safety level
        if (safetyLevel === 'High Safety') {
            // Show premium routes (higher prices typically mean better safety)
            const price = parseInt(item.dataset.price);
            if (price < 100) {
                item.style.opacity = '0.5';
            }
        } else if (safetyLevel === 'Low Safety') {
            // Show budget routes
            const price = parseInt(item.dataset.price);
            if (price > 200) {
                item.style.opacity = '0.5';
            }
        }
    });
    
    // Show notification
    showNotification(`Filtered routes by: ${safetyLevel}`);
}

function validateForm() {
    const fromCity = fromCitySelect.value;
    const toCity = toCitySelect.value;
    
    if (fromCity && toCity && fromCity === toCity) {
        alert('Please select different cities for departure and destination');
        toCitySelect.value = '';
        if (toMarker) {
            routeMap.removeLayer(toMarker);
            toMarker = null;
        }
        if (routeLine) {
            routeMap.removeLayer(routeLine);
            routeLine = null;
        }
        return false;
    }
    
    return true;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function showNotification(message) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        font-weight: 500;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    // Add animation styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Sort routes by price (low to high)
function sortRoutesByPrice() {
    const scheduleCards = document.querySelectorAll('.schedule-card');
    
    scheduleCards.forEach(card => {
        const routeItems = Array.from(card.querySelectorAll('.route-item'));
        
        // Sort by price
        routeItems.sort((a, b) => {
            const priceA = parseInt(a.dataset.price);
            const priceB = parseInt(b.dataset.price);
            return priceA - priceB;
        });
        
        // Reorder in DOM
        const container = card;
        const heading = container.querySelector('h3');
        
        // Remove all route items
        routeItems.forEach(item => item.remove());
        
        // Add them back in sorted order
        routeItems.forEach(item => container.appendChild(item));
    });
}

// Add price comparison feature
function compareSelectedRoutes() {
    if (selectedItems.length === 0) {
        showNotification('Please select some routes to compare');
        return;
    }
    
    const totalCost = selectedItems.reduce((sum, item) => sum + item.price, 0);
    const averageCost = Math.round(totalCost / selectedItems.length);
    
    const comparisonText = `Selected: ${selectedItems.length} routes | Total: ₹${totalCost} | Average: ₹${averageCost}`;
    showNotification(comparisonText);
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'f':
                e.preventDefault();
                fromCitySelect.focus();
                break;
            case 't':
                e.preventDefault();
                toCitySelect.focus();
                break;
            case 'Enter':
                e.preventDefault();
                searchRoutes();
                break;
        }
    }
});

// Initialize price sorting on load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(sortRoutesByPrice, 100);
});

// Add real-time route updates simulation
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Randomly update safety scores
        const safetyChart = Chart.getChart('safetyChart');
        if (safetyChart) {
            const data = safetyChart.data.datasets[0].data;
            const randomIndex = Math.floor(Math.random() * data.length);
            const variation = Math.random() * 5 - 2.5; // ±2.5% variation
            data[randomIndex] = Math.max(0, Math.min(100, data[randomIndex] + variation));
            safetyChart.update('none');
        }
    }, 30000); // Update every 30 seconds
}

// Start real-time updates
setTimeout(simulateRealTimeUpdates, 5000);