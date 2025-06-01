const elements = document.querySelectorAll(".reveal");

let Visible = function (target) {
  // Все позиции элемента
  let targetPosition = {
      top: window.pageYOffset + target.getBoundingClientRect().top,
      bottom: window.pageYOffset + target.getBoundingClientRect().bottom,
    },
    // Получаем позиции окна
    windowPosition = {
      top: window.pageYOffset,
      bottom: window.pageYOffset + document.documentElement.clientHeight,
    };

  if (
    targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
    targetPosition.top < windowPosition.bottom
  ) {
    target.classList.add("reveal_active");
  } else {
    target.classList.remove("reveal_active");
  }
};

// Запускаем функцию при прокрутке страницы
window.addEventListener("scroll", function () {
  elements.forEach((element) => Visible(element));
});

// А также запустим функцию сразу. А то вдруг, элемент изначально видно
elements.forEach((element) => Visible(element));
