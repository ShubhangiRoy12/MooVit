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

let scheduleData = [
  { id: 'TRP-001', vehicle: 'VEH-001', driver: 'John', route: 'Indore → Bhopal', departure: '08:00', eta: '11:00', status: 'Completed' },
  { id: 'TRP-002', vehicle: 'VEH-004', driver: 'Priya', route: 'Indore → Ujjain', departure: '09:00', eta: '10:30', status: 'Pending' },
  { id: 'TRP-003', vehicle: 'VEH-007', driver: 'Rahul', route: 'Indore → Dewas', departure: '10:00', eta: '11:15', status: 'Cancelled' }
];

const tbody = document.querySelector("tbody");

function renderTable() {
  tbody.innerHTML = '';
  scheduleData.forEach((trip, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${trip.id}</td>
      <td>${trip.vehicle}</td>
      <td>${trip.driver}</td>
      <td>${trip.route}</td>
      <td>${trip.departure}</td>
      <td>${trip.eta}</td>
      <td><span class="badge bg-${getStatusClass(trip.status)}">${trip.status}</span></td>
      <td>
        <button class="btn btn-sm btn-success me-1" onclick="markComplete(${index})">✅</button>
        <button class="btn btn-sm btn-danger" onclick="deleteSchedule(${index})">🗑️</button>
      </td>
    `;
    tbody.appendChild(row);
  });
  updateStats();
}

function getStatusClass(status) {
  switch (status) {
    case 'Completed': return 'success';
    case 'Pending': return 'warning text-dark';
    case 'Cancelled': return 'danger';
    default: return 'secondary';
  }
}

function updateStats() {
  document.getElementById("totalTrips").textContent = scheduleData.length;
  document.getElementById("completedTrips").textContent = scheduleData.filter(t => t.status === 'Completed').length;
  document.getElementById("pendingTrips").textContent = scheduleData.filter(t => t.status === 'Pending').length;
  document.getElementById("cancelledTrips").textContent = scheduleData.filter(t => t.status === 'Cancelled').length;
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
