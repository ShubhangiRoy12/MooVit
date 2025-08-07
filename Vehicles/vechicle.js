document.addEventListener('DOMContentLoaded', () => {
  // routes page chart
  const routeCtx = document.getElementById('routeChart');
  if (routeCtx) {
    new Chart(routeCtx, {
      type: 'line',
      data: {
        labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        datasets: [{
          label: 'Distance (km)',
          data: [130,145,160,155,140,150,145],
          borderColor: '#28a745',
          backgroundColor: 'rgba(40,167,69,0.1)',
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  // vehicles page chart
  const vehCtx = document.getElementById('vehicleChart');
  if (vehCtx) {
    new Chart(vehCtx, {
      type: 'bar',
      data: {
        labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        datasets: [{
          label: 'Trips / Day',
          data: [14,16,12,18,20,17,15],
          backgroundColor: '#007BFF'
        }]
      },
      options: {
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  // shared Leaflet map initialization
  const mapRoutes = document.getElementById('map');
  if (mapRoutes) {
    const map = L.map('map').setView([22.7179, 75.8333], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18, attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    L.marker([22.7179,75.8333]).addTo(map).bindPopup('Indore');
    L.marker([23.2599,77.4126]).addTo(map).bindPopup('Bhopal');
  }

  const mapVeh = document.getElementById('map-vehicles');
  if (mapVeh) {
    const map = L.map('map-vehicles').setView([22.7179, 75.8333], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18, attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    // vehicle markers
    L.marker([22.7179,75.8333]).addTo(map).bindPopup('VEH-001: Indore');
    L.marker([23.2599,77.4126]).addTo(map).bindPopup('VEH-002: Bhopal');
    L.marker([22.5702,75.1133]).addTo(map).bindPopup('VEH-003: Ujjain');
  }
});
