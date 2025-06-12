const form = document.getElementById("tasks__form");
const tasksList = document.getElementById("tasks__list");

checkStorage();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("task__input").value.trim();
  const phraseWithoutSpaces = title.trim();

  if (title != "") {
    createTask(title);
    saveLocalStorage();
  }
  form.reset();
});

tasksList.addEventListener("click", (e) => {
  if (e.target.className === "task__remove") {
    e.target.parentNode.remove();
    saveLocalStorage();
  }
});

function createTask(title) {
  tasksList.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="task">
      <div class="task__title">
      ${title}
      </div>
      <a href="#" class="task__remove">&times;</a>
      </div>
    `
  );
}

function saveLocalStorage() {
  let titles = [];
  Array.from(tasksList.children).forEach((task) => {
    let title = task.querySelector(".task__title").textContent;
    titles.push(title);
  });
  if (titles.length === 0) {
    localStorage.removeItem("tasks");
  } else {
    localStorage.setItem("tasks", JSON.stringify(titles));
  }
}

function checkStorage() {
  const titles = JSON.parse(localStorage.getItem("tasks"));
  if (titles) {
    titles.forEach((title) => {
      createTask(title);
    });
  }
}
