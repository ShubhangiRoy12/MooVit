const cursor = document.querySelector(".cursor");
const circles = document.querySelectorAll(".circle");

let mouseX = 0;
let mouseY = 0;

const positions = Array.from(circles).map(() => ({ x: 0, y: 0 }));

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  // Main cursor
  cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

  let x = mouseX;
  let y = mouseY;

  positions.forEach((pos, i) => {
    pos.x += (x - pos.x) * 0.18;
    pos.y += (y - pos.y) * 0.18;

    circles[i].style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;

    x = pos.x;
    y = pos.y;
  });

  requestAnimationFrame(animate);
}

animate();