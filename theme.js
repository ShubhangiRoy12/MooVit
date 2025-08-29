document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const toggleBtn = document.getElementById('theme-toggle');

  // Apply saved theme on page load
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    if (toggleBtn) toggleBtn.textContent = '🌙';
  } else {
    if (toggleBtn) toggleBtn.textContent = '🌞';
  }

  // Toggle dark mode when button is clicked
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      body.classList.toggle('dark');
      if (body.classList.contains('dark')) {
        toggleBtn.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
      } else {
        toggleBtn.textContent = '🌞';
        localStorage.setItem('theme', 'light');
      }
    });
  }
});
