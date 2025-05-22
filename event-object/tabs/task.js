const tabs = document.querySelectorAll(".tab");
const tabsContent = document.querySelectorAll(".tab__content");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", function (event) {
    if (!tab.classList.contains("tab_active")) {
      const tabActive = document.querySelector(".tab_active");
      const tabContentActive = document.querySelector(".tab__content_active");

      tabActive.classList.remove("tab_active");
      tabContentActive.classList.remove("tab__content_active");

      tab.classList.add("tab_active");
      tabsContent[index].classList.add("tab__content_active");
    }
  });
});
