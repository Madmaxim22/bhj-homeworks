const clickerCounter = document.getElementById("clicker__counter");
const clickerSpeed = document.getElementById("clicker__speed");
const img = document.getElementById("cookie");

function clicker() {
  if (Number(clickerCounter.textContent) % 2 === 0) {
    img.width = 250;
  } else {
    img.width = 200;
  }
  clickerCounter.textContent = Number(clickerCounter.textContent) + 1;
}

img.onclick = clicker;

let lastClickTime = Date.now();

img.addEventListener("click", () => {
  const currentTime = Date.now();
  let diff = (currentTime - lastClickTime) / 1000;
  lastClickTime = currentTime;
  clickerSpeed.textContent = (1 / diff).toFixed(2);
});
