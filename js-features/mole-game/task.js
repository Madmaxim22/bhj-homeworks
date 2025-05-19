const dead = document.getElementById("dead");
const lost = document.getElementById("lost");
const status = document.getElementById("status");

function getHole(index) {
  return document.getElementById(`hole${index}`);
}

for (let index = 1; index <= 9; index++) {
  const hole = getHole(index);
  hole.onclick = function () {
    if (hole.classList.contains("hole_has-mole")) {
      dead.textContent = Number(dead.textContent) + 1;
    } else {
      lost.textContent = Number(lost.textContent) + 1;
    }
  };
}

function isWin() {
  if (Number(dead.textContent) === 10) {
    alert("Победа!");
    start();
  }
  if (Number(lost.textContent) === 5) {
    alert("Поражение");
    start();
  }
}

function start() {
  dead.textContent = 0;
  lost.textContent = 0;
}

const idInterval = setInterval(isWin, 500);
