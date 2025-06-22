const signin = document.getElementById("signin");
const form = document.getElementById("signin__form");
const welcome = document.getElementById("welcome");
const welcomeId = document.getElementById("user_id");
const logoutBtn = document.getElementById("logout__btn");

isIdLocalStorage();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status >= 200 || xhr.status < 300) {
      const response = JSON.parse(xhr.response);
      handlerResponseSuccess(response);
    } else {
      alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
    }
  };
  xhr.open(
    "POST",
    "https://students.netoservices.ru/nestjs-backend/auth",
    true
  );
  xhr.send(formData);
});

function handlerResponseSuccess(response) {
  if (response.success) {
    localStorage.setItem("form", `${response.user_id}`);
    changeForm(response.user_id);
  } else {
    alert("Неверный логин/пароль");
    form.reset();
  }
}

function changeForm(userId) {
  welcomeId.textContent = userId;
  signin.classList.remove("signin_active");
  welcome.classList.add("welcome_active");
}

function isIdLocalStorage() {
  const userId = localStorage.getItem("form");
  if (userId) {
    changeForm(userId);
  }
}

logoutBtn.addEventListener("click", (e) => {
  localStorage.removeItem("form");
  welcomeId.textContent = "";
  welcome.classList.remove("welcome_active");
  signin.classList.add("signin_active");
  form.reset();
});
