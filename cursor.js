const cursor = document.querySelector(".cursor");
const circles = document.querySelectorAll(".circle");

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

const positions = Array.from(circles).map(() => ({ x: 0, y: 0 }));

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  // Smooth cursor follow
  const dx = mouseX - cursorX;
  const dy = mouseY - cursorY;
  
  cursorX += dx * 0.25;
  cursorY += dy * 0.25;

  if (cursor) {
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
  }

  // Tail circles follow
  let x = cursorX;
  let y = cursorY;

  positions.forEach((pos, i) => {
    pos.x += (x - pos.x) * 0.35;
    pos.y += (y - pos.y) * 0.35;

    if (circles[i]) {
      circles[i].style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
    }

    x = pos.x;
    y = pos.y;
  });

  requestAnimationFrame(animate);
}

animate();
