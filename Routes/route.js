// Enhanced Routes Management System
document.addEventListener('DOMContentLoaded', () => {
  // Initialize variables
  const modal = new bootstrap.Modal(document.getElementById('modal'));
  const tbody = document.querySelector('#routesTable tbody');
  const empty = document.getElementById('emptyState');
  
  let stats = { 
    active: 0, 
    delayed: 0, 
    completed: 0, 
    inTransit: 0,
    totalDist: 0,
    totalTime: 0,
    totalFuelCost: 0
  };
  
  let routes = [];
  let editIndex = -1;
  
  // Fuel price per km (can be adjusted)
  const FUEL_PRICE_PER_KM = 8.5; // ₹8.5 per km average
  
  // Initialize the application
  init();
  
  function init() {
    updateLiveTime();
    setInterval(updateLiveTime, 1000);
    setupEventListeners();
    setupCharts();
    loadSampleData();
    update();
  }
  
  function updateLiveTime() {
    const now = new Date();
    document.getElementById('liveTime').textContent = now.toLocaleTimeString();
  }
  
  function setupEventListeners() {
    // Add button
    document.getElementById('addBtn').onclick = showAddModal;
    
    // Distance controls
    document.getElementById('incDist').onclick = () => {
      const input = document.getElementById('distance');
      input.stepUp();
      updateRoutePreview();
    };
    
    document.getElementById('decDist').onclick = () => {
      const input = document.getElementById('distance');
      input.stepDown();
      updateRoutePreview();
    };
    
    // Form submission
    document.querySelector('#modal form').onsubmit = handleFormSubmit;
    
    // Calculator
    document.getElementById('calculateBtn').onclick = calculateRouteTime;
    document.getElementById('calcSpeed').onchange = handleSpeedChange;
    
    // Export button
    document.getElementById('exportBtn').onclick = exportData;
    
    // Refresh button
    document.getElementById('refreshBtn').onclick = () => {
      update();
      showAlert('Data refreshed successfully!', 'success');
    };
    
    // Form inputs for preview
    ['routeId', 'origin', 'destination', 'distance', 'avgSpeed', 'vehicleType', 'priority']
      .forEach(id => {
        document.getElementById(id).oninput = updateRoutePreview;
      });
  }
  
  function showAddModal() {
    editIndex = -1;
    document.querySelector('.modal-title').innerHTML = '<i class="bi bi-plus-circle"></i> Add New Route';
    document.querySelector('form').reset();
    document.getElementById('distance').value = 1;
    document.getElementById('avgSpeed').value = 60;
    document.getElementById('customSpeed').classList.add('d-none');
    
    // Set default start time to current time
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    document.getElementById('startTime').value = now.toISOString().slice(0, 16);
    
    updateRoutePreview();
    modal.show();
  }
  
  function showEditModal(index) {
    editIndex = index;
    const route = routes[index];
    
    document.querySelector('.modal-title').innerHTML = '<i class="bi bi-pencil"></i> Edit Route';
    document.getElementById('routeId').value = route.id;
    document.getElementById('origin').value = route.origin;
    document.getElementById('destination').value = route.destination;
    document.getElementById('status').value = route.status;
    document.getElementById('distance').value = route.distance;
    document.getElementById('avgSpeed').value = route.avgSpeed;
    document.getElementById('vehicleType').value = route.vehicleType;
    document.getElementById('startTime').value = route.startTime;
    document.getElementById('priority').value = route.priority;
    
    updateRoutePreview();
    modal.show();
  }
  
  function updateRoutePreview() {
    const distance = parseInt(document.getElementById('distance').value) || 0;
    const avgSpeed = parseInt(document.getElementById('avgSpeed').value) || 60;
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    
    if (distance > 0 && origin && destination) {
      const estimatedTime = Math.round((distance / avgSpeed) * 60); // in minutes
      const fuelCost = Math.round(distance * FUEL_PRICE_PER_KM);
      
      document.getElementById('routePreview').innerHTML = `
        <div class="row g-2">
          <div class="col-md-4">
            <small class="text-muted">Estimated Time:</small>
            <div class="fw-bold text-primary">${estimatedTime} minutes</div>
          </div>
          <div class="col-md-4">
            <small class="text-muted">Fuel Cost:</small>
            <div class="fw-bold text-success">₹${fuelCost}</div>
          </div>
          <div class="col-md-4">
            <small class="text-muted">Route:</small>
            <div class="fw-bold text-info">${origin} → ${destination}</div>
          </div>
        </div>
      `;
    } else {
      document.getElementById('routePreview').innerHTML = 
        '<p class="text-muted mb-0">Fill in the details to see route preview</p>';
    }
  }
  
  function handleSpeedChange() {
    const speedSelect = document.getElementById('calcSpeed');
    const customInput = document.getElementById('customSpeed');
    
    if (speedSelect.value === 'custom') {
      customInput.classList.remove('d-none');
      customInput.focus();
    } else {
      customInput.classList.add('d-none');
    }
  }
  
  function calculateRouteTime() {
    const distance = parseFloat(document.getElementById('calcDistance').value);
    const speedSelect = document.getElementById('calcSpeed');
    const customSpeed = parseFloat(document.getElementById('customSpeed').value);
    const trafficFactor = parseFloat(document.getElementById('trafficFactor').value);
    const stops = parseInt(document.getElementById('calcStops').value) || 0;
    
    if (!distance || distance <= 0) {
      showAlert('Please enter a valid distance', 'warning');
      return;
    }
    
    let speed = speedSelect.value === 'custom' ? customSpeed : parseFloat(speedSelect.value);
    
    if (!speed || speed <= 0) {
      showAlert('Please enter a valid speed', 'warning');
      return;
    }
    
    // Calculate base time
    let baseTime = (distance / speed) * 60; // in minutes
    
    // Apply traffic factor
    baseTime *= trafficFactor;
    
    // Add stop time (5 minutes per stop)
    const stopTime = stops * 5;
    const totalTime = baseTime + stopTime;
    
    // Calculate fuel cost
    const fuelCost = distance * FUEL_PRICE_PER_KM;
    
    // Display results
    document.getElementById('calculatorResult').innerHTML = `
      <div class="row g-3">
        <div class="col-md-3">
          <div class="text-center p-3 bg-white rounded">
            <i class="bi bi-clock-fill text-primary fs-4"></i>
            <h5 class="mt-2 mb-1 text-black">${Math.round(totalTime)} min</h5>
            <small class="text-muted">Total Time</small>
          </div>
        </div>
        <div class="col-md-3">
          <div class="text-center p-3 bg-white rounded">
            <i class="bi bi-speedometer2 text-info fs-4"></i>
            <h5 class="mt-2 mb-1 text-black">${speed} km/h</h5>
            <small class="text-muted">Avg Speed</small>
          </div>
        </div>
        <div class="col-md-3">
          <div class="text-center p-3 bg-white rounded">
            <i class="bi bi-fuel-pump-fill text-success fs-4"></i>
            <h5 class="mt-2 mb-1 text-black">₹${Math.round(fuelCost)}</h5>
            <small class="text-muted">Fuel Cost</small>
          </div>
        </div>
        <div class="col-md-3">
          <div class="text-center p-3 bg-white rounded">
            <i class="bi bi-stop-fill text-warning fs-4"></i>
            <h5 class="mt-2 mb-1 text-black">${stops}</h5>
            <small class="text-muted">Stops</small>
          </div>
        </div>
      </div>
      <div class="mt-3 p-3 bg-primary bg-opacity-10 rounded">
        <h6 class="text-primary mb-2"><i class="bi bi-info-circle"></i> Breakdown:</h6>
        <ul class="mb-0 small">
          <li>Base travel time: ${Math.round(baseTime - stopTime)} minutes</li>
          <li>Traffic delay: ${Math.round((baseTime - (distance/speed)*60))} minutes</li>
          <li>Stop time: ${stopTime} minutes</li>
          <li>Fuel consumption: ~${(distance/15).toFixed(1)} liters</li>
        </ul>
      </div>
    `;
  }
  
  function handleFormSubmit(e) {
    e.preventDefault();
    
    const routeData = {
      id: document.getElementById('routeId').value.trim(),
      origin: document.getElementById('origin').value.trim(),
      destination: document.getElementById('destination').value.trim(),
      status: document.getElementById('status').value,
      distance: parseInt(document.getElementById('distance').value),
      avgSpeed: parseInt(document.getElementById('avgSpeed').value),
      vehicleType: document.getElementById('vehicleType').value,
      startTime: document.getElementById('startTime').value,
      priority: document.getElementById('priority').value,
      createdAt: new Date().toISOString()
    };
    
    // Calculate estimated time and fuel cost
    routeData.estimatedTime = Math.round((routeData.distance / routeData.avgSpeed) * 60);
    routeData.fuelCost = Math.round(routeData.distance * FUEL_PRICE_PER_KM);
    
    if (editIndex >= 0) {
      routes[editIndex] = routeData;
      showAlert('Route updated successfully!', 'success');
    } else {
      routes.push(routeData);
      showAlert('Route added successfully!', 'success');
    }
    
    modal.hide();
    renderRoutes();
    update();
  }
  
  function renderRoutes() {
    tbody.innerHTML = '';
    
    if (routes.length === 0) {
      empty.style.display = 'block';
      return;
    }
    
    empty.style.display = 'none';
    
    routes.forEach((route, index) => {
      const row = document.createElement('tr');
      const statusColor = getStatusColor(route.status);
      const priorityColor = getPriorityColor(route.priority);
      const startTime = new Date(route.startTime).toLocaleString();
      
      row.innerHTML = `
        <td>
          <span class="badge bg-secondary">${route.id}</span>
        </td>
        <td>
          <i class="bi bi-geo-alt-fill text-success"></i> ${route.origin}
        </td>
        <td>
          <i class="bi bi-pin-map-fill text-danger"></i> ${route.destination}
        </td>
        <td>
          <span class="badge bg-${statusColor} statusBadge">${route.status}</span>
        </td>
        <td>
          <i class="bi bi-rulers"></i> ${route.distance} km
        </td>
        <td>
          <i class="bi bi-clock"></i> ${route.estimatedTime} min
        </td>
        <td>
          <i class="bi bi-currency-rupee"></i> ${route.fuelCost}
        </td>
        <td>
          <small>${startTime}</small>
        </td>
        <td class="actions">
          <div class="btn-group btn-group-sm">
            ${route.status !== 'Completed' ? 
              `<button class="btn btn-success" onclick="completeRoute(${index})">
                <i class="bi bi-check-circle"></i>
              </button>` : ''
            }
            <button class="btn btn-primary" onclick="editRoute(${index})">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-danger" onclick="deleteRoute(${index})">
              <i class="bi bi-trash"></i>
            </button>
          </div>
          <div class="mt-1">
            <span class="badge bg-light text-dark priority-${route.priority.toLowerCase()}">
              <i class="bi bi-flag-fill"></i> ${route.priority}
            </span>
          </div>
        </td>
      `;
      
      tbody.appendChild(row);
    });
  }
  
  function getStatusColor(status) {
    const colors = {
      'On schedule': 'info',
      'Delayed': 'warning', 
      'Completed': 'success',
      'In Transit': 'primary'
    };
    return colors[status] || 'secondary';
  }
  
  function getPriorityColor(priority) {
    const colors = {
      'Low': 'success',
      'Medium': 'warning',
      'High': 'danger',
      'Critical': 'danger'
    };
    return colors[priority] || 'secondary';
  }
  
  function update() {
    // Reset stats
    stats = { 
      active: 0, 
      delayed: 0, 
      completed: 0, 
      inTransit: 0,
      totalDist: 0,
      totalTime: 0,
      totalFuelCost: 0
    };
    
    // Calculate stats
    routes.forEach(route => {
      stats.totalDist += route.distance;
      stats.totalTime += route.estimatedTime;
      stats.totalFuelCost += route.fuelCost;
      
      switch (route.status) {
        case 'Delayed':
          stats.delayed++;
          break;
        case 'Completed':
          stats.completed++;
          break;
        case 'In Transit':
          stats.inTransit++;
          break;
        default:
          stats.active++;
      }
    });
    
    // Update display
    document.getElementById('statActive').textContent = stats.active;
    document.getElementById('statDelayed').textContent = stats.delayed;
    document.getElementById('statComp').textContent = stats.completed;
    document.getElementById('statAvg').textContent = routes.length ? 
      Math.round(stats.totalDist / routes.length) : 0;
    document.getElementById('statETA').textContent = routes.length ? 
      Math.round(stats.totalTime / routes.length) : 0;
    document.getElementById('statFuel').textContent = stats.totalFuelCost;
    
    // Update charts
    updateCharts();
  }
  
  function setupCharts() {
    // Trend Chart
    window.trendChart = new Chart(document.getElementById('trendChart'), {
      type: 'line',
      data: {
        labels: getLast7Days(),
        datasets: [{
          label: 'Distance (km)',
          data: [0, 0, 0, 0, 0, 0, 0],
          borderColor: '#0d6efd',
          backgroundColor: 'rgba(13, 110, 253, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
    
    // Status Chart
    window.statusChart = new Chart(document.getElementById('statusChart'), {
      type: 'doughnut',
      data: {
        labels: ['Active', 'Delayed', 'Completed', 'In Transit'],
        datasets: [{
          data: [0, 0, 0, 0],
          backgroundColor: ['#0d6efd', '#ffc107', '#198754', '#6f42c1']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
    
    // Time Chart
    window.timeChart = new Chart(document.getElementById('timeChart'), {
      type: 'bar',
      data: {
        labels: ['0-30 min', '30-60 min', '60-120 min', '120+ min'],
        datasets: [{
          label: 'Routes Count',
          data: [0, 0, 0, 0],
          backgroundColor: ['#198754', '#ffc107', '#fd7e14', '#dc3545']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
  
  function updateCharts() {
    // Update status chart
    window.statusChart.data.datasets[0].data = [
      stats.active,
      stats.delayed, 
      stats.completed,
      stats.inTransit
    ];
    window.statusChart.update();
    
    // Update time distribution chart
    const timeDistribution = [0, 0, 0, 0];
    routes.forEach(route => {
      const time = route.estimatedTime;
      if (time <= 30) timeDistribution[0]++;
      else if (time <= 60) timeDistribution[1]++;
      else if (time <= 120) timeDistribution[2]++;
      else timeDistribution[3]++;
    });
    
    window.timeChart.data.datasets[0].data = timeDistribution;
    window.timeChart.update();
    
    // Update trend chart with sample data
    const trendData = generateTrendData();
    window.trendChart.data.datasets[0].data = trendData;
    window.trendChart.update();
  }
  
  function getLast7Days() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
    }
    return days;
  }
  
  function generateTrendData() {
    // Generate sample trend data based on current routes
    const baseValue = Math.max(stats.totalDist / 7, 50);
    return Array.from({length: 7}, () => 
      Math.round(baseValue + (Math.random() - 0.5) * baseValue * 0.4)
    );
  }
  
  function loadSampleData() {
    const sampleRoutes = [
      {
        id: 'RT001',
        origin: 'Mumbai Central',
        destination: 'Pune Station',
        status: 'On schedule',
        distance: 148,
        avgSpeed: 80,
        vehicleType: 'Bus',
        priority: 'High',
        startTime: new Date().toISOString(),
        createdAt: new Date().toISOString()
      },
      {
        id: 'RT002', 
        origin: 'Delhi',
        destination: 'Agra',
        status: 'In Transit',
        distance: 233,
        avgSpeed: 70,
        vehicleType: 'Car',
        priority: 'Medium',
        startTime: new Date(Date.now() - 3600000).toISOString(),
        createdAt: new Date().toISOString()
      },
      {
        id: 'RT003',
        origin: 'Bangalore',
        destination: 'Chennai',
        status: 'Completed',
        distance: 346,
        avgSpeed: 65,
        vehicleType: 'Truck',
        priority: 'Low',
        startTime: new Date(Date.now() - 7200000).toISOString(),
        createdAt: new Date().toISOString()
      }
    ];
    
    sampleRoutes.forEach(route => {
      route.estimatedTime = Math.round((route.distance / route.avgSpeed) * 60);
      route.fuelCost = Math.round(route.distance * FUEL_PRICE_PER_KM);
    });
    
    routes = sampleRoutes;
    renderRoutes();
  }
  
  function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.remove();
      }
    }, 3000);
  }
  
  function exportData() {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Route ID,Origin,Destination,Status,Distance (km),Est. Time (min),Fuel Cost,Vehicle Type,Priority,Start Time\n"
      + routes.map(route => 
          `${route.id},${route.origin},${route.destination},${route.status},${route.distance},${route.estimatedTime},${route.fuelCost},${route.vehicleType},${route.priority},${route.startTime}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `routes_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showAlert('Routes data exported successfully!', 'success');
  }
  
  // Global functions for button actions
  window.completeRoute = function(index) {
    routes[index].status = 'Completed';
    renderRoutes();
    update();
    showAlert('Route marked as completed!', 'success');
  };
  
  window.editRoute = function(index) {
    showEditModal(index);
  };
  
  window.deleteRoute = function(index) {
    if (confirm('Are you sure you want to delete this route?')) {
      routes.splice(index, 1);
      renderRoutes();
      update();
      showAlert('Route deleted successfully!', 'info');
    }
  };
});