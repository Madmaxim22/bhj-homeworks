const form = document.getElementById("tasks__form");
const tasksList = document.getElementById("tasks__list");
let counter = 0;

checkStorage();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = document.getElementById("task__input");
  if (text.value != "") {
    createTask(text.value, counter++);
    localStorage.setItem(counter, text.value);
  }
  form.reset();
});

tasksList.addEventListener("click", (e) => {
  if (e.target.className === "task__remove") {
    e.target.parentNode.remove();
    localStorage.removeItem(e.target.parentNode.id);
  }
});

function createTask(text, id) {
  let task = document.createElement("div");
  task.className = "task";
  task.id = id;
  let taskTitle = document.createElement("div");
  taskTitle.className = "task__title";
  taskTitle.innerText = text;
  let taskRemove = document.createElement("a");
  taskRemove.className = "task__remove";
  taskRemove.href = "#";
  taskRemove.innerHTML = "&times;";
  task.append(taskTitle, taskRemove);
  tasksList.append(task);
}

function checkStorage() {
  const items = { ...localStorage };
  for (const key in items) {
    createTask(items[key], key);
    counter = counter < key ? key : counter;
  }
}
