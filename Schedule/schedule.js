const ctx = document.getElementById('scheduleChart').getContext('2d');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Completed Trips',
      data: [12, 15, 17, 14, 19, 20, 18],
      fill: false,
      borderColor: '#0d6efd',
      tension: 0.2,
      pointBackgroundColor: '#0d6efd',
      pointRadius: 4
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  }
});

// Sample data with cancellation reasons
const CANCELLATION_REASONS = [
  'Vehicle Breakdown',
  'Weather Conditions',
  'Driver Unavailable',
  'Route Blocked',
  'Mechanical Issues',
  'Other'
];

let scheduleData = [
  { 
    id: 'TRP-001', 
    vehicle: 'VEH-001', 
    driver: 'John', 
    route: 'Indore → Bhopal', 
    departure: '08:00', 
    eta: '11:00', 
    status: 'Completed',
    completionTime: '10:45',
    delayReason: null
  },
  { 
    id: 'TRP-002', 
    vehicle: 'VEH-004', 
    driver: 'Priya', 
    route: 'Indore → Ujjain', 
    departure: '09:00', 
    eta: '10:30', 
    status: 'Pending',
    completionTime: null,
    delayReason: null
  },
  { 
    id: 'TRP-003', 
    vehicle: 'VEH-007', 
    driver: 'Rahul', 
    route: 'Indore → Dewas', 
    departure: '10:00', 
    eta: '11:15', 
    status: 'Cancelled',
    cancellationReason: 'Vehicle Breakdown',
    cancelledAt: '09:30',
    cancelledBy: 'System'
  }
];

const tbody = document.querySelector("tbody");

function getStatusBadge(trip) {
  const statusClass = getStatusClass(trip.status);
  let badge = `<span class="badge bg-${statusClass} position-relative">
    ${trip.status}`;
    
  // Add tooltip for cancelled trips
  if (trip.status === 'Cancelled' && trip.cancellationReason) {
    badge += `
    <div class="tooltip-custom">
      <i class="fas fa-info-circle ms-1"></i>
      <div class="tooltip-content">
        <strong>Reason:</strong> ${trip.cancellationReason}<br>
        <small class="text-muted">Cancelled at: ${trip.cancelledAt || 'N/A'}</small>
      </div>
    </div>`;
  }
  // Add tooltip for completed trips
  else if (trip.status === 'Completed' && trip.completionTime) {
    const isEarly = trip.completionTime < trip.eta;
    const timeDiff = isEarly ? 'ahead' : 'late';
    badge += `
    <div class="tooltip-custom">
      <i class="fas ${isEarly ? 'fa-arrow-down text-success' : 'fa-arrow-up text-warning'} ms-1"></i>
      <div class="tooltip-content">
        <strong>Completed at:</strong> ${trip.completionTime}<br>
        <small class="text-${isEarly ? 'success' : 'warning'}">
          ${Math.abs(getTimeDifference(trip.completionTime, trip.eta))} min ${timeDiff} of schedule
        </small>
      </div>
    </div>`;
  }
  
  badge += '</span>';
  return badge;
}

function getTimeDifference(time1, time2) {
  const [h1, m1] = time1.split(':').map(Number);
  const [h2, m2] = time2.split(':').map(Number);
  return (h1 * 60 + m1) - (h2 * 60 + m2);
}

function renderTable() {
  tbody.innerHTML = '';
  scheduleData.forEach((trip, index) => {
    const row = document.createElement('tr');
    row.className = `trip-row ${trip.status.toLowerCase()}`;
    row.innerHTML = `
      <td class="trip-id">${trip.id}</td>
      <td class="vehicle">
        <i class="fas fa-truck me-2"></i>${trip.vehicle}
      </td>
      <td class="driver">
        <i class="fas fa-user me-2"></i>${trip.driver}
      </td>
      <td class="route">
        <i class="fas fa-route me-2"></i>${trip.route}
      </td>
      <td class="departure">
        <i class="far fa-clock me-2"></i>${trip.departure}
      </td>
      <td class="eta">
        <i class="fas fa-flag-checkered me-2"></i>${trip.eta}
      </td>
      <td class="status">
        ${getStatusBadge(trip)}
      </td>
      <td class="actions">
        <div class="btn-group btn-group-sm">
          ${trip.status !== 'Completed' ? `
            <button class="btn btn-success" onclick="markComplete(${index})" title="Mark as Complete">
              <i class="fas fa-check"></i>
            </button>` : ''
          }
          <button class="btn btn-danger" onclick="deleteSchedule(${index})" title="Delete Trip">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
  updateStats();
  initializeTooltips();
}

function getStatusClass(status) {
  switch (status) {
    case 'Completed': return 'success';
    case 'Pending': return 'warning text-dark';
    case 'Cancelled': return 'danger';
    default: return 'secondary';
  }
}

// Initialize tooltips
function initializeTooltips() {
  // This function initializes any tooltips in the page
  // The actual tooltips are implemented using CSS for better performance
  // No additional JavaScript is needed for the basic tooltips
  
  // For more complex tooltips, you can initialize them here
  // Example using Bootstrap tooltips (if you include Bootstrap JS):
  // var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  // var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  //   return new bootstrap.Tooltip(tooltipTriggerEl);
  // });
}

function calculateRate(count, total) {
  return total > 0 ? Math.round((count / total) * 100) : 0;
}

function updateProgressBar(elementId, value) {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.width = `${value}%`;
    element.setAttribute('aria-valuenow', value);
  }
}

function updateStats() {
  const total = scheduleData.length;
  const completed = scheduleData.filter(t => t.status === 'Completed').length;
  const cancelled = scheduleData.filter(t => t.status === 'Cancelled');
  const pending = scheduleData.filter(t => t.status === 'Pending');
  
  // Update basic stats
  document.getElementById("totalTrips").textContent = total;
  document.getElementById("completedTrips").textContent = completed;
  document.getElementById("pendingTrips").textContent = pending.length;
  document.getElementById("cancelledTrips").textContent = cancelled.length;
  
  // Calculate and update rates
  const completionRate = calculateRate(completed, total);
  const cancellationRate = calculateRate(cancelled.length, total);
  
  // Update completion rate
  document.getElementById("completionRate").textContent = `${completionRate}%`;
  updateProgressBar('completionRateBar', completionRate);
  
  // Update cancellation rate
  document.getElementById("cancellationRate").textContent = `${cancellationRate}%`;
  updateProgressBar('cancellationRateBar', cancellationRate);
  
  // Update completion rate tooltip
  const tooltipCompleted = document.getElementById('tooltipCompleted');
  const tooltipTotal = document.getElementById('tooltipTotal');
  const tooltipRate = document.getElementById('tooltipRate');
  
  if (tooltipCompleted) tooltipCompleted.textContent = completed;
  if (tooltipTotal) tooltipTotal.textContent = total;
  if (tooltipRate) tooltipRate.textContent = `${completionRate}%`;
  
  // Update cancellation rate tooltip
  const tooltipCancelled = document.getElementById('tooltipCancelled');
  const tooltipTotal2 = document.getElementById('tooltipTotal2');
  const tooltipCancelRate = document.getElementById('tooltipCancelRate');
  
  if (tooltipCancelled) tooltipCancelled.textContent = cancelled.length;
  if (tooltipTotal2) tooltipTotal2.textContent = total;
  if (tooltipCancelRate) tooltipCancelRate.textContent = `${cancellationRate}%`;
  
  // Update last updated timestamps for all tooltips
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  document.querySelectorAll('.last-updated').forEach(el => {
    if (el) el.textContent = timeString;
  });
}

function updateTooltips() {
  // This function is kept for compatibility but no longer needed
  // as we're using the new HTML-based tooltips
  return;
}

function markComplete(index) {
  scheduleData[index].status = 'Completed';
  renderTable();
}

function deleteSchedule(index) {
  if (confirm(`Are you sure to delete trip ${scheduleData[index].id}?`)) {
    scheduleData.splice(index, 1);
    renderTable();
  }
}

function addSchedule(event) {
  event.preventDefault();
  const id = document.getElementById("newId").value.trim();
  const vehicle = document.getElementById("newVehicle").value.trim();
  const driver = document.getElementById("newDriver").value.trim();
  const route = document.getElementById("newRoute").value.trim();
  const dep = document.getElementById("newDep").value;
  const eta = document.getElementById("newEta").value;

  if (!id || !vehicle || !driver || !route || !dep || !eta) return alert("Please fill all fields");

  scheduleData.push({ id, vehicle, driver, route, departure: dep, eta, status: "Pending" });

  document.getElementById("addTripForm").reset();
  renderTable();
}

renderTable();
