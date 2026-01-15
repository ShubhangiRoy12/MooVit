// Shipments Management System
class ShipmentManager {
  constructor() {
    this.modal = null;
    this.tbody = null;
    this.emptyState = null;
    this.stats = { pending: 0, delayed: 0, cancelled: 0, completed: 0 };
    this.trendChart = null;
    this.statusChart = null;
    this.shipments = [];
    
    this.init();
  }
  
  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupElements());
    } else {
      this.setupElements();
    }
  }
  
  setupElements() {
    // Initialize modal
    this.modal = new bootstrap.Modal(document.getElementById('modal'));
    this.tbody = document.querySelector('#shipmentsTable tbody');
    this.emptyState = document.getElementById('emptyState');
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Initialize charts
    this.initializeCharts();
    
    // Load initial data (demo data)
    this.loadDemoData();
    
    // Setup mobile navigation
    this.setupMobileNav();
  }
  
  setupEventListeners() {
    // Add button click
    document.getElementById('addBtn').addEventListener('click', () => this.showAddModal());
    
    // Modal form submission
    document.querySelector('#modal form').addEventListener('submit', (e) => this.handleFormSubmit(e));
    
    // Quantity controls
    document.getElementById('incQty').addEventListener('click', () => this.adjustQuantity(1));
    document.getElementById('decQty').addEventListener('click', () => this.adjustQuantity(-1));
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }
    
    // Modal reset on close
    document.getElementById('modal').addEventListener('hidden.bs.modal', () => this.resetForm());
  }
  
  setupMobileNav() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burger && navLinks) {
      burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
      });
    }
  }
  
  showAddModal() {
    document.querySelector('.modal-title').innerHTML = '<i class="fas fa-plus-circle text-primary"></i> Add New Shipment';
    this.resetForm();
    this.modal.show();
  }
  
  resetForm() {
    const form = document.querySelector('#modal form');
    form.reset();
    document.getElementById('shipQty').value = 1;
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('shipEta').setAttribute('min', today);
  }
  
  adjustQuantity(change) {
    const qtyInput = document.getElementById('shipQty');
    const currentValue = parseInt(qtyInput.value) || 1;
    const newValue = Math.max(1, currentValue + change);
    qtyInput.value = newValue;
  }
  
  handleFormSubmit(e) {
    e.preventDefault();
    
    const shipmentData = {
      id: document.getElementById('shipId').value.trim(),
      status: document.getElementById('shipStatus').value,
      depot: document.getElementById('shipDepot').value.trim(),
      eta: document.getElementById('shipEta').value,
      quantity: parseInt(document.getElementById('shipQty').value),
      createdAt: new Date().toISOString()
    };
    
    // Validate required fields
    if (!shipmentData.id || !shipmentData.status || !shipmentData.depot || !shipmentData.eta) {
      this.showAlert('Please fill in all required fields', 'danger');
      return;
    }
    
    // Check for duplicate ID
    if (this.shipments.some(ship => ship.id === shipmentData.id)) {
      this.showAlert('Shipment ID already exists', 'danger');
      return;
    }
    
    this.addShipment(shipmentData);
    this.modal.hide();
    this.showAlert('Shipment added successfully', 'success');
  }
  
  addShipment(shipmentData) {
    this.shipments.push(shipmentData);
    this.renderShipment(shipmentData);
    this.updateStats();
    this.updateCharts();
  }
  
  renderShipment(shipment) {
    const badgeClass = this.getStatusBadgeClass(shipment.status);
    const row = document.createElement('tr');
    row.setAttribute('data-shipment-id', shipment.id);
    
    row.innerHTML = `
      <td><strong>${shipment.id}</strong></td>
      <td><span class="badge text-bg-${badgeClass} statusBadge">${shipment.status}</span></td>
      <td><i class="fas fa-warehouse text-muted me-1"></i>${shipment.depot}</td>
      <td><i class="fas fa-calendar text-muted me-1"></i>${this.formatDate(shipment.eta)}</td>
      <td><i class="fas fa-cubes text-muted me-1"></i>${shipment.quantity}</td>
      <td class="actions">
        <button class="btn btn-sm btn-success completeBtn" title="Mark as Complete">
          <i class="fas fa-check"></i>
        </button>
        <button class="btn btn-sm btn-warning editBtn" title="Edit Shipment">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-danger delBtn" title="Delete Shipment">
          <i class="fas fa-trash"></i>
        </button>
      </td>`;
    
    this.tbody.appendChild(row);
    
    // Add event listeners to action buttons
    row.querySelector('.completeBtn').addEventListener('click', () => this.completeShipment(shipment.id));
    row.querySelector('.editBtn').addEventListener('click', () => this.editShipment(shipment.id));
    row.querySelector('.delBtn').addEventListener('click', () => this.deleteShipment(shipment.id));
  }
  
  getStatusBadgeClass(status) {
    const statusClasses = {
      'Pending': 'info',
      'Delayed': 'warning',
      'Cancelled': 'secondary',
      'Completed': 'success'
    };
    return statusClasses[status] || 'primary';
  }
  
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  
  completeShipment(shipmentId) {
    const shipment = this.shipments.find(s => s.id === shipmentId);
    if (shipment && shipment.status !== 'Completed') {
      shipment.status = 'Completed';
      
      const row = document.querySelector(`tr[data-shipment-id="${shipmentId}"]`);
      const badge = row.querySelector('.statusBadge');
      badge.textContent = 'Completed';
      badge.className = 'badge text-bg-success statusBadge';
      
      this.updateStats();
      this.updateCharts();
      this.showAlert('Shipment marked as completed', 'success');
    }
  }
  
  editShipment(shipmentId) {
    const shipment = this.shipments.find(s => s.id === shipmentId);
    if (shipment) {
      // Populate form with existing data
      document.getElementById('shipId').value = shipment.id;
      document.getElementById('shipStatus').value = shipment.status;
      document.getElementById('shipDepot').value = shipment.depot;
      document.getElementById('shipEta').value = shipment.eta;
      document.getElementById('shipQty').value = shipment.quantity;
      
      // Change modal title and store edit mode
      document.querySelector('.modal-title').innerHTML = '<i class="fas fa-edit text-warning"></i> Edit Shipment';
      document.getElementById('shipId').setAttribute('readonly', true);
      
      this.modal.show();
    }
  }
  
  deleteShipment(shipmentId) {
    if (confirm('Are you sure you want to delete this shipment?')) {
      this.shipments = this.shipments.filter(s => s.id !== shipmentId);
      
      const row = document.querySelector(`tr[data-shipment-id="${shipmentId}"]`);
      row.remove();
      
      this.updateStats();
      this.updateCharts();
      this.showAlert('Shipment deleted successfully', 'info');
    }
  }
  
  handleSearch(searchTerm) {
    const rows = this.tbody.querySelectorAll('tr');
    const term = searchTerm.toLowerCase();
    
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(term) ? '' : 'none';
    });
  }
  
  updateStats() {
    this.stats = { pending: 0, delayed: 0, cancelled: 0, completed: 0 };
    
    this.shipments.forEach(shipment => {
      const status = shipment.status.toLowerCase();
      if (this.stats.hasOwnProperty(status)) {
        this.stats[status]++;
      }
    });
    
    // Update stat cards
    document.getElementById('statTotal').textContent = this.shipments.length;
    document.getElementById('statPending').textContent = this.stats.pending;
    document.getElementById('statDelayed').textContent = this.stats.delayed;
    document.getElementById('statCancelled').textContent = this.stats.cancelled;
    
    // Show/hide empty state
    this.emptyState.style.display = this.shipments.length ? 'none' : 'block';
  }
  
  initializeCharts() {
    // Trend Chart
    const trendCtx = document.getElementById('trendChart');
    if (trendCtx) {
      this.trendChart = new Chart(trendCtx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Shipments by ETA',
            data: [],
            borderColor: '#0d6efd',
            backgroundColor: 'rgba(13, 110, 253, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#0d6efd',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              borderColor: '#0d6efd',
              borderWidth: 1
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          },
          interaction: {
            intersect: false,
            mode: 'index'
          }
        }
      });
    }
    
    // Status Chart
    const statusCtx = document.getElementById('statusChart');
    if (statusCtx) {
      this.statusChart = new Chart(statusCtx, {
        type: 'doughnut',
        data: {
          labels: ['Pending', 'Delayed', 'Cancelled', 'Completed'],
          datasets: [{
            data: [0, 0, 0, 0],
            backgroundColor: [
              '#0dcaf0',
              '#ffc107',
              '#6c757d',
              '#198754'
            ],
            borderWidth: 0,
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
                  weight: 'bold'
                }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.parsed || 0;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                  return `${label}: ${value} (${percentage}%)`;
                }
              }
            }
          },
          cutout: '60%'
        }
      });
    }
  }
  
  updateCharts() {
    if (this.trendChart) {
      // Generate last 7 days
      const today = new Date();
      const days = [];
      const counts = [];
      
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        days.push(label);
        
        // Count shipments with ETA on this date
        const count = this.shipments.filter(shipment => shipment.eta === dateString).length;
        counts.push(count);
      }
      
      this.trendChart.data.labels = days;
      this.trendChart.data.datasets[0].data = counts;
      this.trendChart.update();
    }
    
    if (this.statusChart) {
      this.statusChart.data.datasets[0].data = [
        this.stats.pending,
        this.stats.delayed,
        this.stats.cancelled,
        this.stats.completed
      ];
      this.statusChart.update();
    }
  }
  
  showAlert(message, type = 'info') {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alert.style.cssText = 'top: 90px; right: 20px; z-index: 9999; max-width: 300px;';
    alert.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alert);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      if (alert.parentNode) {
        alert.remove();
      }
    }, 3000);
  }
  
  loadDemoData() {
    // Load some demo data for testing
    const demoShipments = [
      {
        id: 'SH001',
        status: 'Pending',
        depot: 'Chennai Central',
        eta: '2025-09-12',
        quantity: 25,
        createdAt: new Date().toISOString()
      },
      {
        id: 'SH002',
        status: 'Delayed',
        depot: 'Mumbai Port',
        eta: '2025-09-15',
        quantity: 15,
        createdAt: new Date().toISOString()
      },
      {
        id: 'SH003',
        status: 'Completed',
        depot: 'Delhi Hub',
        eta: '2025-09-10',
        quantity: 30,
        createdAt: new Date().toISOString()
      }
    ];
    
    // Add demo shipments
    demoShipments.forEach(shipment => {
      this.shipments.push(shipment);
      this.renderShipment(shipment);
    });
    
    this.updateStats();
    this.updateCharts();
  }
}

// Initialize the application
const shipmentManager = new ShipmentManager();

// Additional utility functions
document.addEventListener('DOMContentLoaded', function() {
  // Animate stats cards on load
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'all 0.5s ease';
      
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100);
    }, index * 100);
  });
  
  // Add smooth scrolling for any anchor links
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
});