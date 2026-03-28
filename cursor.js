const cursor = document.querySelector(".cursor");
const circles = Array.from(document.querySelectorAll(".circle"));
const supportsCustomCursor =
  window.matchMedia("(min-width: 769px) and (pointer: fine)").matches;

if (cursor && circles.length > 0 && supportsCustomCursor) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  const trailPositions = circles.map(() => ({ x: mouseX, y: mouseY }));

  function setCursorPosition(x, y) {
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
  }

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    setCursorPosition(mouseX, mouseY);
  });

  function animateTrail() {
    let targetX = mouseX;
    let targetY = mouseY;

    trailPositions.forEach((position, index) => {
      position.x += (targetX - position.x) * 0.28;
      position.y += (targetY - position.y) * 0.28;

      circles[index].style.left = `${position.x}px`;
      circles[index].style.top = `${position.y}px`;

      targetX = position.x;
      targetY = position.y;
    });

    window.requestAnimationFrame(animateTrail);
  }

  setCursorPosition(mouseX, mouseY);
  animateTrail();

  document.querySelectorAll("a, button, input, .card").forEach((element) => {
    element.addEventListener("mouseenter", () => cursor.classList.add("hover"));
    element.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
  });
}
