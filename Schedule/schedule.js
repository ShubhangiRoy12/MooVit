// After routes and vehicles initialization...
const schedCtx = document.getElementById('scheduleChart');
if (schedCtx) {
  new Chart(schedCtx, {
    type: 'line',
    data: {
      labels: ['6 days ago','5','4','3','2','Yesterday','Today'],
      datasets: [{
        label: 'Completed Trips',
        data: [20, 22, 19, 23, 21, 18, 25],
        borderColor: '#ffc107',
        backgroundColor: 'rgba(255,193,7,0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      scales: { y: { beginAtZero: true } }
    }
  });
}
