// Enhanced Places Data - Keep some examples but allow custom additions
const predefinedPlaces = [
  {
    id: 'hotel_ujjain_1',
    name: 'Hotel Ujjain Palace',
    lat: 23.1820,
    lng: 75.7749,
    photo: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=300&fit=crop',
    safety: 'High',
    popularity: 'Very popular with travelers',
    type: 'hotel',
    description: 'Comfortable stay near Mahakaleshwar Temple',
    category: 'traditional'
  },
  {
    id: 'food_ujjain_1',
    name: 'Ujjain Street Food Hub',
    lat: 23.1793,
    lng: 75.7847,
    photo: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    safety: 'Moderate',
    popularity: 'Famous for Poha & Jalebi',
    type: 'food',
    description: 'Traditional Ujjain breakfast specialties',
    category: 'street'
  }, 
  {
    id: 'hotel_bhopal_1',
    name: 'Bhopal Heritage Hotel',
    lat: 23.2599,
    lng: 77.4126,
    photo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
    safety: 'High',
    popularity: 'Lakeside location',
    type: 'hotel',
    description: 'Modern amenities with lake view',
    category: 'traditional'
  },
  {
    id: 'food_bhopal_1',
    name: 'Chatori Gali Food Street',
    lat: 23.2619,
    lng: 77.4123,
    photo: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    safety: 'High',
    popularity: 'Famous for Bhopali Paan',
    type: 'food',
    description: 'Street food paradise in old Bhopal',
    category: 'traditional'
  }, 
  {
    id: 'hotel_indore_1',
    name: 'Indore Business Hotel',
    lat: 22.7196,
    lng: 75.8577,
    photo: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
    safety: 'High',
    popularity: 'Central location',
    type: 'hotel',
    description: 'Perfect for business travelers',
    category: 'local'
  },
  {
    id: 'food_indore_1',
    name: 'Sarafa Bazaar Night Market',
    lat: 22.7214,
    lng: 75.8578,
    photo: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    safety: 'Moderate',
    popularity: 'Night food market',
    type: 'food',
    description: 'Famous for Garadu and Kulfi',
    category: 'local'
  }
];

// Dynamic places array that will include both predefined and user-added places
let placesData = [...predefinedPlaces];
let customPlaceCounter = 1;

// Initialize Map - Make sure this runs after DOM is loaded
let map;
let markersCluster;
let routePolyline;

// Store added markers and their order
const addedMarkers = new Map();
let markerOrder = [];
let allMarkers = new Map();

// DOM Elements
let placeSelector;
let addPlaceBtn;
let removePlaceBtn;
let placePhoto;
let placeName;
let placeSafety;
let placePopularity;
let totalSelected;

// Safety filtering
let selectedSafetyLevels = new Set(['High', 'Moderate', 'Low']);

// Chart variables
let safetyChartInstance = null;
let selectionChartInstance = null;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    initializeDOM();
    populateDropdown();
    showAllPlaces();
    updateControlsState();
    setupSafetyChart();
    updateSelectionChart();
    updateSelectionStats();
    clearPlaceInfo();
});

function initializeMap() {
    // Initialize Map - Center on Madhya Pradesh
    map = L.map('map').setView([23.2599, 77.4126], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    markersCluster = L.markerClusterGroup();
    map.addLayer(markersCluster);

    routePolyline = L.polyline([], {
        color: '#667eea', 
        weight: 4,
        opacity: 0.8
    }).addTo(map);

    // Add click handler for custom location adding
    map.on('click', function(e) {
        addCustomLocation(e.latlng);
    });
}

function initializeDOM() {
    placeSelector = document.getElementById('placeSelector');
    addPlaceBtn = document.getElementById('addPlaceBtn');
    removePlaceBtn = document.getElementById('removePlaceBtn');
    placePhoto = document.getElementById('placePhoto');
    placeName = document.getElementById('placeName');
    placeSafety = document.getElementById('placeSafety');
    placePopularity = document.getElementById('placePopularity');
    totalSelected = document.getElementById('totalSelected');

    // Event Listeners
    addPlaceBtn.addEventListener('click', () => {
        if (placeSelector.value) addPlace(placeSelector.value);
    });

    removePlaceBtn.addEventListener('click', () => removeLastPlace());
    placeSelector.addEventListener('change', updateControlsState);
}

// Add custom location when user clicks on map
function addCustomLocation(latlng) {
    const customPlace = {
        id: `custom_${customPlaceCounter}`,
        name: `Custom Location ${customPlaceCounter}`,
        lat: latlng.lat,
        lng: latlng.lng,
        photo: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
        safety: 'Moderate',
        popularity: 'User added location',
        type: 'custom',
        description: 'Custom location added by user',
        category: 'local'
    };
    
    // Add to places data
    placesData.push(customPlace);
    
    // Create and add marker
    const customIcon = createCustomLocationIcon();
    const marker = L.marker([latlng.lat, latlng.lng], { icon: customIcon })
        .bindPopup(`
            <div style="text-align: center; max-width: 200px;">
                <img src="${customPlace.photo}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
                <h3 style="margin: 0 0 5px 0; color: #2c3e50;">${customPlace.name}</h3>
                <input type="text" id="customName${customPlaceCounter}" placeholder="Enter location name" style="width: 100%; padding: 5px; margin: 5px 0; border: 1px solid #ccc; border-radius: 4px;">
                <select id="customType${customPlaceCounter}" style="width: 100%; padding: 5px; margin: 5px 0; border: 1px solid #ccc; border-radius: 4px;">
                    <option value="food">🍽️ Food Place</option>
                    <option value="hotel">🏨 Hotel</option>
                    <option value="custom">📍 Custom</option>
                </select>
                <div style="margin-top: 8px;">
                    <button onclick="saveCustomLocation('${customPlace.id}', ${customPlaceCounter})" style="background: #667eea; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-right: 5px;">Save</button>
                    <button onclick="removeCustomLocation('${customPlace.id}')" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Remove</button>
                </div>
            </div>
        `)
        .on('click', () => showPlaceInfo(customPlace));

    allMarkers.set(customPlace.id, marker);
    markersCluster.addLayer(marker);
    
    // Update dropdown
    updateDropdown();
    
    customPlaceCounter++;
    
    // Show popup immediately for editing
    marker.openPopup();
}

// Create custom location icon (blue landmark)
function createCustomLocationIcon() {
    return L.divIcon({
        html: `<div style="background-color: #2196F3; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);">📍</div>`,
        className: 'custom-marker',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
}

// Save custom location with user input
function saveCustomLocation(placeId, counter) {
    const place = placesData.find(p => p.id === placeId);
    if (!place) return;
    
    const nameInput = document.getElementById(`customName${counter}`);
    const typeSelect = document.getElementById(`customType${counter}`);
    
    if (nameInput && nameInput.value.trim()) {
        place.name = nameInput.value.trim();
    }
    
    if (typeSelect) {
        place.type = typeSelect.value;
    }
    
    // Update marker popup and icon
    const marker = allMarkers.get(placeId);
    if (marker) {
        const newIcon = place.type === 'custom' ? createCustomLocationIcon() : createCustomIcon(place.type, place.safety);
        marker.setIcon(newIcon);
        marker.setPopupContent(`
            <div style="text-align: center; max-width: 200px;">
                <img src="${place.photo}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
                <h3 style="margin: 0 0 5px 0; color: #2c3e50;">${place.name}</h3>
                <p style="margin: 0; color: #7f8c8d; font-size: 12px;">${place.description}</p>
                <div style="margin-top: 8px; font-size: 11px;">
                    <span style="background: #667eea; color: white; padding: 2px 6px; border-radius: 10px; margin-right: 4px;">📍 Custom</span>
                </div>
                <button onclick="addPlaceFromPopup('${place.id}')" style="margin-top: 8px; background: #667eea; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Add to Route</button>
            </div>
        `);
        marker.closePopup();
    }
    
    updateDropdown();
}

// Remove custom location
function removeCustomLocation(placeId) {
    // Remove from placesData
    placesData = placesData.filter(p => p.id !== placeId);
    
    // Remove marker
    const marker = allMarkers.get(placeId);
    if (marker) {
        markersCluster.removeLayer(marker);
        allMarkers.delete(placeId);
    }
    
    // Remove from added markers if it was added to route
    if (addedMarkers.has(placeId)) {
        addedMarkers.delete(placeId);
        markerOrder = markerOrder.filter(id => id !== placeId);
        updateRoutePolyline();
        updateSelectionChart();
        updateSelectionStats();
    }
    
    updateDropdown();
}

// Update dropdown with current places
function updateDropdown() {
    const currentValue = placeSelector.value;
    placeSelector.innerHTML = '<option value="">Choose a place to explore</option>';
    
    placesData.forEach(place => {
        const option = document.createElement('option');
        option.value = place.id;
        const icon = place.type === 'hotel' ? '🏨' : place.type === 'food' ? '🍽️' : '📍';
        option.textContent = `${icon} ${place.name}`;
        placeSelector.appendChild(option);
    });
    
    // Restore selection if it still exists
    if (placesData.find(p => p.id === currentValue)) {
        placeSelector.value = currentValue;
    }
}

// Populate dropdown with better formatting
function populateDropdown() {
    updateDropdown(); // Use the new dynamic function
}

// Show all places on map initially
function showAllPlaces() {
    placesData.forEach(place => {
        const customIcon = place.type === 'custom' ? createCustomLocationIcon() : createCustomIcon(place.type, place.safety);
        
        const marker = L.marker([place.lat, place.lng], { icon: customIcon })
            .bindPopup(`
                <div style="text-align: center; max-width: 200px;">
                    <img src="${place.photo}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
                    <h3 style="margin: 0 0 5px 0; color: #2c3e50;">${place.name}</h3>
                    <p style="margin: 0; color: #7f8c8d; font-size: 12px;">${place.description}</p>
                    <div style="margin-top: 8px; font-size: 11px;">
                        <span style="background: #667eea; color: white; padding: 2px 6px; border-radius: 10px; margin-right: 4px;">🛡️ ${place.safety}</span>
                        <span style="background: #764ba2; color: white; padding: 2px 6px; border-radius: 10px;">⭐ Popular</span>
                    </div>
                    <button onclick="addPlaceFromPopup('${place.id}')" style="margin-top: 8px; background: #667eea; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Add to Route</button>
                </div>
            `)
            .on('click', () => showPlaceInfo(place));

        allMarkers.set(place.id, marker);
        markersCluster.addLayer(marker);
    });
}

// Add place from popup
function addPlaceFromPopup(placeId) {
    placeSelector.value = placeId;
    addPlace(placeId);
}

// Focus on category
function focusOnCategory(category) {
    const filteredPlaces = placesData.filter(place => place.category === category);
    
    // Clear existing markers
    markersCluster.clearLayers();
    
    // Add filtered markers
    filteredPlaces.forEach(place => {
        const marker = allMarkers.get(place.id);
        if (marker) {
            markersCluster.addLayer(marker);
        }
    });

    // Fit map to show filtered places
    if (filteredPlaces.length > 0) {
        const group = new L.featureGroup(filteredPlaces.map(place => allMarkers.get(place.id)));
        map.fitBounds(group.getBounds().pad(0.1));
    }

    // Update dropdown to show only filtered places
    placeSelector.innerHTML = '<option value="">Choose a place to explore</option>';
    filteredPlaces.forEach(place => {
        const option = document.createElement('option');
        option.value = place.id;
        const icon = place.type === 'hotel' ? '🏨' : place.type === 'food' ? '🍽️' : '📍';
        option.textContent = `${icon} ${place.name}`;
        placeSelector.appendChild(option);
    });

    // Smooth scroll to map
    document.querySelector('.map-section').scrollIntoView({ behavior: 'smooth' });
}

// Enhanced place info display
function showPlaceInfo(place) {
    placePhoto.src = place.photo;
    placePhoto.alt = place.name;
    placePhoto.style.display = 'block';
    placeName.textContent = place.name;
    placeSafety.textContent = `🛡️ Safety: ${place.safety}`;
    placePopularity.textContent = `⭐ ${place.popularity}`;
}

function clearPlaceInfo() {
    placePhoto.src = '';
    placePhoto.alt = '';
    placePhoto.style.display = 'none';
    placeName.textContent = 'Select a place to view details';
    placeSafety.textContent = '';
    placePopularity.textContent = '';
}

// Enhanced marker creation with custom icons
function createCustomIcon(type, safety) {
    const colors = {
        hotel: { High: '#4CAF50', Moderate: '#FF9800', Low: '#F44336' },
        food: { High: '#2196F3', Moderate: '#FF5722', Low: '#9C27B0' }
    };
    
    const color = colors[type][safety] || '#757575';
    const icon = type === 'hotel' ? '🏨' : '🍽️';
    
    return L.divIcon({
        html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);">${icon}</div>`,
        className: 'custom-marker',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
}

// Add place with enhanced functionality
function addPlace(placeId) {
    if (addedMarkers.has(placeId)) {
        alert('This place is already added to your route!');
        return;
    }

    const place = placesData.find(p => p.id === placeId);
    if (!place) return;

    const marker = allMarkers.get(placeId);
    addedMarkers.set(placeId, marker);
    markerOrder.push(placeId);

    updateRoutePolyline();
    showPlaceInfo(place);
    updateSelectionChart();
    filterMarkersBySafety();
    updateControlsState();
    updateSelectionStats();
    
    // Reset selector
    placeSelector.value = '';
}

// Remove last place with better feedback
function removeLastPlace() {
    if (markerOrder.length === 0) return;

    const lastPlaceId = markerOrder.pop();
    addedMarkers.delete(lastPlaceId);

    updateRoutePolyline();
    updateSelectionChart();
    filterMarkersBySafety();
    updateControlsState();
    updateSelectionStats();

    if (markerOrder.length > 0) {
        const newLastPlaceId = markerOrder[markerOrder.length - 1];
        const newLastPlace = placesData.find(p => p.id === newLastPlaceId);
        showPlaceInfo(newLastPlace);
    } else {
        clearPlaceInfo();
    }
}

// Enhanced route visualization
function updateRoutePolyline() {
    const latlngs = markerOrder.map(placeId => {
        const marker = addedMarkers.get(placeId);
        return marker.getLatLng();
    });
    
    routePolyline.setLatLngs(latlngs);
    
    if (latlngs.length > 0) {
        map.fitBounds(routePolyline.getBounds(), {padding: [50, 50]});
    }
}

function getSafetyCounts() {
    const counts = { High: 0, Moderate: 0, Low: 0 };
    placesData.forEach(place => {
        if (counts.hasOwnProperty(place.safety)) {
            counts[place.safety]++;
        }
    });
    return counts;
}

function filterMarkersBySafety() {
    markersCluster.clearLayers();
    
    allMarkers.forEach((marker, placeId) => {
        const place = placesData.find(p => p.id === placeId);
        if (!place) return;
        
        if (selectedSafetyLevels.has(place.safety)) {
            markersCluster.addLayer(marker);
        }
    });
}

// Enhanced Safety Chart
function setupSafetyChart() {
    const ctx = document.getElementById('safetyPieChart').getContext('2d');
    const counts = getSafetyCounts();

    if (safetyChartInstance) {
        safetyChartInstance.destroy();
    }

    safetyChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['High Safety', 'Moderate Safety', 'Low Safety'],
            datasets: [{
                data: [counts.High, counts.Moderate, counts.Low],
                backgroundColor: ['#4CAF50', '#FF9800', '#F44336'],
                borderColor: '#fff',
                borderWidth: 3,
                hoverBorderWidth: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        usePointStyle: true,
                        font: { size: 10, weight: '600' }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (ctx) => `${ctx.label}: ${ctx.parsed} places`
                    }
                }
            },
            onClick: (evt, elements) => {
                if (!elements.length) return;
                const idx = elements[0].index;
                const labels = ['High', 'Moderate', 'Low'];
                const label = labels[idx];
                
                if (selectedSafetyLevels.has(label)) {
                    selectedSafetyLevels.delete(label);
                } else {
                    selectedSafetyLevels.add(label);
                }
                filterMarkersBySafety();
                updateSafetyChartVisuals();
            }
        }
    });
}

function updateSafetyChartVisuals() {
    // Update chart to show selected/deselected state
    const labels = ['High', 'Moderate', 'Low'];
    const backgroundColors = labels.map((label, idx) => {
        const baseColors = ['#4CAF50', '#FF9800', '#F44336'];
        return selectedSafetyLevels.has(label) ? baseColors[idx] : baseColors[idx] + '40';
    });
    
    safetyChartInstance.data.datasets[0].backgroundColor = backgroundColors;
    safetyChartInstance.update();
}

// Enhanced Selection Chart
function updateSelectionChart() {
    const ctx = document.getElementById('selectionPieChart').getContext('2d');

    let hotelCount = 0;
    let foodCount = 0;
    let customCount = 0;
    
    markerOrder.forEach(placeId => {
        const place = placesData.find(p => p.id === placeId);
        if (place) {
            if (place.type === 'hotel') hotelCount++;
            else if (place.type === 'food') foodCount++;
            else if (place.type === 'custom') customCount++;
        }
    });

    if (selectionChartInstance) {
        selectionChartInstance.data.datasets[0].data = [hotelCount, foodCount, customCount];
        selectionChartInstance.update();
        return;
    }

    selectionChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['🏨 Hotels', '🍽️ Food Places', '📍 Custom'],
            datasets: [{
                data: [hotelCount, foodCount, customCount],
                backgroundColor: ['#667eea', '#764ba2', '#2196F3'],
                borderColor: '#fff',
                borderWidth: 3,
                hoverBorderWidth: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        usePointStyle: true,
                        font: { size: 10, weight: '600' }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (ctx) => `${ctx.label}: ${ctx.parsed} selected`
                    }
                }
            }
        }
    });
}

// Update selection statistics
function updateSelectionStats() {
    const total = addedMarkers.size;
    totalSelected.textContent = `${total} place${total !== 1 ? 's' : ''} selected`;
}

// Update controls state
function updateControlsState() {
    addPlaceBtn.disabled = placeSelector.value === "";
    removePlaceBtn.disabled = addedMarkers.size === 0;
}