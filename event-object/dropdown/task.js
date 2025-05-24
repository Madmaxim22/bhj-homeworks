const dropdownValue = document.querySelector(".dropdown__value");
const dropdownList = document.querySelector(".dropdown__list");
// const dropdownLinks = document.querySelectorAll(".dropdown__link");

dropdownValue.addEventListener("click", function () {
  dropdownList.classList.toggle("dropdown__list_active");
});

// dropdownLinks.forEach((link) => {
//   link.addEventListener("click", function (event) {
//     console.log(link.textContent);
//     dropdownValue.textContent = link.textContent;
//     dropdownList.classList.remove("dropdown__list_active");
//     event.preventDefault();
//   });
// });

dropdownList.addEventListener("click", function (event) {
  if (event.target && event.target.nodeName == "A") {
    dropdownValue.textContent = event.target.textContent;
    dropdownList.classList.remove("dropdown__list_active");
    event.preventDefault();
  }
});
