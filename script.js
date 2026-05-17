/* =========================================
   script.js — TransportCo
========================================= */

/* --- Custom Cursor --- */
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

document.querySelectorAll('a, button, input, .card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

/* --- Header Scroll Effect --- */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

/* --- Theme Toggle --- */
const themeIcon  = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');
let dark = false;

document.getElementById('themeBtn').addEventListener('click', () => {
  dark = !dark;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  themeIcon.textContent  = dark ? '☀️' : '🌙';
  themeLabel.textContent = dark ? 'Light Mode' : 'Dark Mode';
});

/* --- Mobile Menu --- */
const mobMenu   = document.getElementById('mobMenu');
const mobToggle = document.getElementById('mobToggle');
const overlay   = document.getElementById('overlay');

function closeMob() {
  mobMenu.classList.remove('open');
  overlay.classList.remove('active');
}

mobToggle.addEventListener('click', () => {
  const open = mobMenu.classList.toggle('open');
  overlay.classList.toggle('active', open);
});

/* --- Modal System --- */
let activeModal = null;

function openModal(id) {
  if (activeModal) closeModal(activeModal);
  const m = document.getElementById(id);
  m.classList.add('active');
  overlay.classList.add('active');
  activeModal = id;
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
  overlay.classList.remove('active');
  activeModal = null;
}

function switchModal(from, to) {
  closeModal(from);
  setTimeout(() => openModal(to), 200);
}

/* Close modal on overlay click */
overlay.addEventListener('click', () => {
  if (activeModal) closeModal(activeModal);
  closeMob();
});

/* Close modal on Escape key */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && activeModal) closeModal(activeModal);
});

/* --- Card Mouse-Follow Glow --- */
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
});

/* --- Form Handlers (Demo) --- */
function handleLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const pass  = document.getElementById('loginPass').value;
  const err   = document.getElementById('loginErr');

  if (!email || !pass) {
    err.textContent = 'Please fill in all fields.';
    return;
  }
  err.textContent = '';
  alert('Login successful! (Demo)');
  closeModal('loginModal');
}

function handleSignup() {
  const name  = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const pass  = document.getElementById('signupPass').value;
  const agree = document.getElementById('signupAgree').checked;
  const err   = document.getElementById('signupErr');

  if (!name || !email || !pass) {
    err.textContent = 'Please fill in all fields.';
    return;
  }
  if (pass.length < 8) {
    err.textContent = 'Password must be at least 8 characters.';
    return;
  }
  if (!agree) {
    err.textContent = 'Please accept the Terms of Service.';
    return;
  }
  err.textContent = '';
  alert('Account created! (Demo)');
  closeModal('signupModal');
}

function handleAdmin() {
  const user = document.getElementById('adminUser').value.trim();
  const pass = document.getElementById('adminPass').value;
  const err  = document.getElementById('adminErr');

  if (!user || !pass) {
    err.textContent = 'Please enter credentials.';
    return;
  }
  err.textContent = '';
  alert('Admin access granted! (Demo)');
  closeModal('adminModal');
}
