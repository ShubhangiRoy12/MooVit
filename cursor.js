// ==============================
// CUSTOM CURSOR - BUG FREE
// ==============================

document.addEventListener("DOMContentLoaded", () => {

  const cursor = document.querySelector(".cursor");
  const circles = document.querySelectorAll(".circle");

  // Stop execution if elements not found
  if (!cursor || circles.length === 0) {
    console.warn("Cursor elements not found.");
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  // Store positions for smooth trail
  const positions = Array.from(circles).map(() => ({
    x: mouseX,
    y: mouseY
  }));

  // Mouse move tracking
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Main cursor position
    cursor.style.transform =
      `translate(${mouseX}px, ${mouseY}px)`;
  });

  // Smooth animation loop
  function animate() {
    let x = mouseX;
    let y = mouseY;

    positions.forEach((pos, index) => {

      // Smooth follow effect
      pos.x += (x - pos.x) * 0.3;
      pos.y += (y - pos.y) * 0.3;

      // Apply movement
      circles[index].style.transform =
        `translate(${pos.x}px, ${pos.y}px)`;

      // Next circle follows previous
      x = pos.x;
      y = pos.y;
    });

    requestAnimationFrame(animate);
  }

  animate();

});