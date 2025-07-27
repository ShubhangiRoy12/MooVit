document.addEventListener('DOMContentLoaded', () => {
  const cards = [
    { id: 'chartShipments', data: [5,6,7,6,8] },
    { id: 'chartVehicles', data: [3,4,3,5,4] },
    { id: 'chartRoutes', data: [6,8,7,9,8] },
    { id: 'chartSchedule', data: [4,5,6,5,7] }
  ];
  cards.forEach(c => {
    const ctx = document.getElementById(c.id);
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: { labels: ['Mon','Tue','Wed','Thu','Fri'], datasets:[{
          data: c.data,
          borderColor: '#007BFF',
          tension: 0.3,
          fill: false
        }]},
        options:{
          responsive:false,
          scales:{x:{display:false}, y:{display:false}},
          elements:{point:{radius:0}}
        }
      });
    }
  });
});

