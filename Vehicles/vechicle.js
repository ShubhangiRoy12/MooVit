// Vehicle Management System JavaScript

class VehicleManager {
    constructor() {
        this.vehicles = [];
        this.charts = {};
        this.init();
    }

    init() {
        this.initializeEventListeners();
        this.initializeCharts();
        this.loadSampleData();
        this.updateDisplay();
        this.startRealTimeUpdates();
    }

    // Event Listeners
    initializeEventListeners() {
        // Add vehicle button
        document.getElementById('addVehicleBtn').addEventListener('click', () => {
            this.openAddVehicleModal();
        });

        // Vehicle form submission
        document.getElementById('vehicleForm').addEventListener('submit', (e) => {
            this.handleVehicleFormSubmit(e);
        });

        // Update location form submission
        document.getElementById('updateLocationForm').addEventListener('submit', (e) => {
            this.handleUpdateLocationSubmit(e);
        });

        // Progress range input
        document.getElementById('journeyProgress').addEventListener('input', (e) => {
            document.getElementById('progressValue').textContent = e.target.value + '%';
        });

        document.getElementById('updateProgress').addEventListener('input', (e) => {
            document.getElementById('updateProgressValue').textContent = e.target.value + '%';
        });
    }

    // Chart Initialization
    initializeCharts() {
        // Status Distribution Chart (Doughnut)
        const statusCtx = document.getElementById('statusChart').getContext('2d');
        this.charts.status = new Chart(statusCtx, {
            type: 'doughnut',
            data: {
                labels: ['In Transit', 'Loading', 'Maintenance', 'Available'],
                datasets: [{
                    data: [0, 0, 0, 0],
                    backgroundColor: [
                        'rgba(255, 107, 107, 0.8)',
                        'rgba(78, 205, 196, 0.8)',
                        'rgba(255, 217, 61, 0.8)',
                        'rgba(108, 92, 231, 0.8)'
                    ],
                    borderColor: [
                        '#ff6b6b',
                        '#4ecdc4',
                        '#ffd93d',
                        '#6c5ce7'
                    ],
                    borderWidth: 2,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: {
                                size: 12,
                                family: "'Segoe UI', sans-serif"
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });

        // Performance Chart (Line)
        const performanceCtx = document.getElementById('performanceChart').getContext('2d');
        this.charts.performance = new Chart(performanceCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Trips Completed',
                    data: [15, 19, 12, 17, 23, 18, 14],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#667eea',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }, {
                    label: 'Distance Covered (km)',
                    data: [450, 520, 380, 480, 650, 550, 420],
                    borderColor: '#4ecdc4',
                    backgroundColor: 'rgba(78, 205, 196, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#4ecdc4',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    yAxisID: 'y1'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Trips'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Distance (km)'
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    }
                }
            }
        });

        // ETA Analysis Chart (Bar)
        const etaCtx = document.getElementById('etaChart').getContext('2d');
        this.charts.eta = new Chart(etaCtx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Estimated Hours to Arrival',
                    data: [],
                    backgroundColor: 'rgba(255, 154, 86, 0.8)',
                    borderColor: '#ff9a56',
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }, {
                    label: 'Distance Remaining (km)',
                    data: [],
                    backgroundColor: 'rgba(78, 205, 196, 0.8)',
                    borderColor: '#4ecdc4',
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                    yAxisID: 'y1'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Hours'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Distance (km)'
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }

    // Vehicle Management Methods
    addVehicle(vehicleData) {
        const vehicle = {
            id: vehicleData.id,
            model: vehicleData.model,
            status: vehicleData.status,
            currentLocation: vehicleData.currentLocation,
            nextStop: vehicleData.nextStop || '---',
            distance: parseFloat(vehicleData.distance) || 0,
            speed: parseFloat(vehicleData.speed) || 60,
            progress: parseFloat(vehicleData.progress) || 0,
            departureTime: new Date(),
            lastUpdated: new Date()
        };

        this.vehicles.push(vehicle);
        this.updateDisplay();
        this.showNotification('Vehicle added successfully!', 'success');
    }

    updateVehicleLocation(vehicleId, newLocation, progress) {
        const vehicle = this.vehicles.find(v => v.id === vehicleId);
        if (vehicle) {
            vehicle.currentLocation = newLocation;
            vehicle.progress = parseFloat(progress);
            vehicle.lastUpdated = new Date();
            this.updateDisplay();
            this.showNotification('Vehicle location updated!', 'success');
        }
    }

    deleteVehicle(vehicleId) {
        const index = this.vehicles.findIndex(v => v.id === vehicleId);
        if (index !== -1) {
            this.vehicles.splice(index, 1);
            this.updateDisplay();
            this.showNotification('Vehicle removed from fleet!', 'warning');
        }
    }

    // ETA Calculation
    calculateETA(vehicle) {
        if (!vehicle.distance || vehicle.status !== 'In Transit') {
            return { hours: 0, minutes: 0, arrivalTime: null };
        }

        const remainingDistance = vehicle.distance * (1 - vehicle.progress / 100);
        const hoursToArrival = remainingDistance / vehicle.speed;
        const hours = Math.floor(hoursToArrival);
        const minutes = Math.round((hoursToArrival - hours) * 60);
        
        const arrivalTime = new Date();
        arrivalTime.setHours(arrivalTime.getHours() + hours, arrivalTime.getMinutes() + minutes);

        return { hours, minutes, arrivalTime, remainingDistance };
    }

    // UI Update Methods
    updateDisplay() {
        this.updateStatistics();
        this.updateVehicleTable();
        this.updateCharts();
        this.updateEmptyState();
    }

    updateStatistics() {
        const stats = {
            total: this.vehicles.length,
            transit: this.vehicles.filter(v => v.status === 'In Transit').length,
            loading: this.vehicles.filter(v => v.status === 'Loading').length,
            maintenance: this.vehicles.filter(v => v.status === 'Under Maintenance').length,
            available: this.vehicles.filter(v => v.status === 'Available').length
        };

        document.getElementById('statTotal').textContent = stats.total;
        document.getElementById('statTransit').textContent = stats.transit + stats.loading;
        document.getElementById('statMaintenance').textContent = stats.maintenance;
        document.getElementById('statAvailable').textContent = stats.available;
    }

    updateVehicleTable() {
        const tbody = document.getElementById('vehicleTableBody');
        tbody.innerHTML = '';

        this.vehicles.forEach(vehicle => {
            const eta = this.calculateETA(vehicle);
            const row = this.createVehicleRow(vehicle, eta);
            tbody.appendChild(row);
        });
    }

    createVehicleRow(vehicle, eta) {
        const row = document.createElement('tr');
        row.className = 'slide-in';
        
        const statusClass = this.getStatusClass(vehicle.status);
        const etaText = eta.hours > 0 || eta.minutes > 0 
            ? `${eta.hours}h ${eta.minutes}m` 
            : '---';
        const arrivalText = eta.arrivalTime 
            ? eta.arrivalTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            : '---';

        row.innerHTML = `
            <td><strong>${vehicle.id}</strong></td>
            <td>${vehicle.model}</td>
            <td><span class="status-badge ${statusClass}">${vehicle.status}</span></td>
            <td><i class="fas fa-map-marker-alt me-1"></i>${vehicle.currentLocation}</td>
            <td>${vehicle.nextStop}</td>
            <td>
                ${vehicle.distance > 0 ? `<span class="distance-info">${eta.remainingDistance?.toFixed(0) || vehicle.distance} km</span>` : '---'}
            </td>
            <td>
                ${etaText !== '---' ? `<div class="eta-info">${etaText}<br><small>${arrivalText}</small></div>` : '---'}
            </td>
            <td>
                <div class="progress progress-custom">
                    <div class="progress-bar progress-bar-custom" style="width: ${vehicle.progress}%"></div>
                </div>
                <small class="text-muted">${vehicle.progress}%</small>
            </td>
            <td>
                <button class="btn btn-warning-custom btn-sm-custom btn-custom me-1" onclick="vehicleManager.openUpdateLocationModal('${vehicle.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger-custom btn-sm-custom btn-custom" onclick="vehicleManager.confirmDelete('${vehicle.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;

        return row;
    }

    getStatusClass(status) {
        switch(status) {
            case 'In Transit': return 'status-transit';
            case 'Loading': return 'status-loading';
            case 'Under Maintenance': return 'status-maintenance';
            case 'Available': return 'status-available';
            default: return 'status-available';
        }
    }

    updateCharts() {
        // Update status chart
        const statusCounts = [
            this.vehicles.filter(v => v.status === 'In Transit').length,
            this.vehicles.filter(v => v.status === 'Loading').length,
            this.vehicles.filter(v => v.status === 'Under Maintenance').length,
            this.vehicles.filter(v => v.status === 'Available').length
        ];
        
        this.charts.status.data.datasets[0].data = statusCounts;
        this.charts.status.update('none');

        // Update ETA chart
        const transitVehicles = this.vehicles.filter(v => v.status === 'In Transit' && v.distance > 0);
        const labels = transitVehicles.map(v => v.id);
        const etaHours = transitVehicles.map(v => {
            const eta = this.calculateETA(v);
            return eta.hours + (eta.minutes / 60);
        });
        const distances = transitVehicles.map(v => {
            const eta = this.calculateETA(v);
            return eta.remainingDistance || 0;
        });

        this.charts.eta.data.labels = labels;
        this.charts.eta.data.datasets[0].data = etaHours;
        this.charts.eta.data.datasets[1].data = distances;
        this.charts.eta.update('none');
    }

    updateEmptyState() {
        const emptyState = document.getElementById('emptyState');
        emptyState.style.display = this.vehicles.length === 0 ? 'block' : 'none';
    }

    // Modal Methods
    openAddVehicleModal() {
        document.getElementById('modalTitle').innerHTML = '<i class="fas fa-plus-circle me-2"></i>Add New Vehicle';
        document.getElementById('vehicleForm').reset();
        document.getElementById('progressValue').textContent = '0%';
        
        const modal = new bootstrap.Modal(document.getElementById('vehicleModal'));
        modal.show();
    }

    openUpdateLocationModal(vehicleId) {
        const vehicle = this.vehicles.find(v => v.id === vehicleId);
        if (vehicle) {
            document.getElementById('updateVehicleId').value = vehicle.id;
            document.getElementById('updateCurrentLocation').value = vehicle.currentLocation;
            document.getElementById('updateProgress').value = vehicle.progress;
            document.getElementById('updateProgressValue').textContent = vehicle.progress + '%';
            
            const modal = new bootstrap.Modal(document.getElementById('updateLocationModal'));
            modal.show();
        }
    }

    // Form Handlers
    handleVehicleFormSubmit(e) {
        e.preventDefault();
        
        const formData = {
            id: document.getElementById('vehicleId').value.trim(),
            model: document.getElementById('vehicleModel').value.trim(),
            status: document.getElementById('vehicleStatus').value,
            currentLocation: document.getElementById('currentLocation').value.trim(),
            nextStop: document.getElementById('nextStop').value.trim(),
            distance: document.getElementById('distanceToNext').value,
            speed: document.getElementById('vehicleSpeed').value,
            progress: document.getElementById('journeyProgress').value
        };

        // Validation
        if (this.vehicles.some(v => v.id === formData.id)) {
            this.showNotification('Vehicle ID already exists!', 'error');
            return;
        }

        this.addVehicle(formData);
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('vehicleModal'));
        modal.hide();
    }

    handleUpdateLocationSubmit(e) {
        e.preventDefault();
        
        const vehicleId = document.getElementById('updateVehicleId').value;
        const newLocation = document.getElementById('updateCurrentLocation').value.trim();
        const progress = document.getElementById('updateProgress').value;

        this.updateVehicleLocation(vehicleId, newLocation, progress);
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('updateLocationModal'));
        modal.hide();
    }

    // Utility Methods
    confirmDelete(vehicleId) {
        if (confirm('Are you sure you want to remove this vehicle from the fleet?')) {
            this.deleteVehicle(vehicleId);
        }
    }

    showNotification(message, type = 'info') {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
        toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        toast.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 5000);
    }

    // Sample Data
    loadSampleData() {
        const sampleVehicles = [
            {
                id: 'VEH-001',
                model: 'Tata 407',
                status: 'In Transit',
                currentLocation: 'Mumbai',
                nextStop: 'Delhi',
                distance: 1400,
                speed: 65,
                progress: 35
            },
            {
                id: 'VEH-002',
                model: 'Ashok Leyland',
                status: 'Loading',
                currentLocation: 'Chennai',
                nextStop: 'Bangalore',
                distance: 350,
                speed: 60,
                progress: 0
            },
            {
                id: 'VEH-003',
                model: 'Mahindra Bolero',
                status: 'Available',
                currentLocation: 'Pune',
                nextStop: '---',
                distance: 0,
                speed: 70,
                progress: 0
            },
            {
                id: 'VEH-004',
                model: 'Force Tempo',
                status: 'Under Maintenance',
                currentLocation: 'Kolkata',
                nextStop: '---',
                distance: 0,
                speed: 55,
                progress: 0
            }
        ];

        sampleVehicles.forEach(vehicle => {
            this.addVehicle(vehicle);
        });
    }

    // Real-time Updates
    startRealTimeUpdates() {
        setInterval(() => {
            // Simulate progress updates for vehicles in transit
            this.vehicles.forEach(vehicle => {
                if (vehicle.status === 'In Transit' && vehicle.progress < 100) {
                    // Random progress increment (0.1% to 0.5% every 30 seconds)
                    const increment = Math.random() * 0.4 + 0.1;
                    vehicle.progress = Math.min(100, vehicle.progress + increment);
                    
                    if (vehicle.progress >= 100) {
                        vehicle.status = 'Available';
                        vehicle.currentLocation = vehicle.nextStop;
                        vehicle.nextStop = '---';
                        vehicle.distance = 0;
                        vehicle.progress = 0;
                        this.showNotification(`${vehicle.id} has reached destination!`, 'success');
                    }
                }
            });
            
            this.updateDisplay();
        }, 30000); // Update every 30 seconds
    }
}

// Initialize the application
let vehicleManager;

document.addEventListener('DOMContentLoaded', () => {
    vehicleManager = new VehicleManager();
    
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});