const cursor = document.querySelector(".cursor");
const circles = document.querySelectorAll(".circle");

let mouseX = 0;
let mouseY = 0;

const positions = Array.from(circles).map(() => ({ x: 0, y: 0 }));

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});

function animate() {
  let x = mouseX;
  let y = mouseY;

  positions.forEach((pos, i) => {
    pos.x += (x - pos.x) * 0.3;
    pos.y += (y - pos.y) * 0.3;

    circles[i].style.left = pos.x + "px";
    circles[i].style.top = pos.y + "px";

    x = pos.x;
    y = pos.y;
  });

  requestAnimationFrame(animate);
}

animate();
