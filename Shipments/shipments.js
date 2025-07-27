// Example: render a simple chart on one of the pages
document.addEventListener('DOMContentLoaded', ()=> {
  const ctx = document.getElementById('kpiChart');
  if(ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        datasets: [{
          label: 'On‑time %',
          data: [90,92,89,94,93,95,92],
          borderColor: '#007BFF',
          fill: false
        }]
      }
    });
  }
});
