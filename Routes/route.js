document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('routeChart');
  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        datasets: [{
          label: 'Distance (km)',
          data: [130, 145, 160, 155, 140, 150, 145],
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

  const mapEl = document.getElementById('map');
  if (mapEl) {
    const map = L.map('map').setView([22.7179, 75.8333], 8); // centered around Indore area
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18, attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    // Example markers
    L.marker([22.7179,75.8333]).addTo(map).bindPopup('Indore');
    L.marker([23.2599,77.4126]).addTo(map).bindPopup('Bhopal');
  }
});
