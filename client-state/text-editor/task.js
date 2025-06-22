const editor = document.getElementById("editor");
const buttonClear = document.getElementById("clear");

editor.value = localStorage.getItem("editor");

editor.addEventListener("change", (e) => {
  localStorage.setItem("editor", editor.value);
});

buttonClear.addEventListener("click", () => {
  editor.value = "";
  localStorage.removeItem("editor");
});
