const elements = document.querySelectorAll(".has-tooltip");

elements.forEach((element) => {
  let div = createElement(element);
  element.insertAdjacentElement("afterend", div);
});

function createElement(element) {
  let div = document.createElement("div");
  div.dataset.position = "bottom";
  div.className = "tooltip";
  div.innerText = element.title;
  return div;
}

document.addEventListener("scroll", () => {
  const tooltipActive = document.querySelector(".tooltip_active");
  if (tooltipActive) {
    tooltipActive.classList.remove("tooltip_active");
  }
});

elements.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(element.nextSibling);
    let hasToolTip = element.nextSibling;
    changeActive(hasToolTip);
    changePosition(element, hasToolTip);
  });
});

function changeActive(hasToolTip) {
  if (!hasToolTip.classList.contains("tooltip_active")) {
    const tooltipActive = document.querySelector(".tooltip_active");
    if (tooltipActive) {
      tooltipActive.classList.remove("tooltip_active");
    }
  }
  hasToolTip.classList.toggle("tooltip_active");
}

function changePosition(element, hasToolTip) {
  let elementRect = element.getBoundingClientRect();
  let x, y;
  switch (hasToolTip.dataset.position) {
    case "top":
      x = elementRect.left;
      y = elementRect.top - hasToolTip.offsetHeight - 5;
      break;
    case "left":
      x = elementRect.left - hasToolTip.offsetWidth + 5;
      y = elementRect.top;
      if (x - hasToolTip.offsetHeight < 0) {
        hasToolTip.dataset.position = "right";
        changePosition(element, hasToolTip);
        return;
      }
      break;
    case "right":
      x = elementRect.left + elementRect.width + 5;
      y = elementRect.top;
      if (x + hasToolTip.offsetWidth > window.innerWidth) {
        hasToolTip.dataset.position = "left";
        changePosition(element, hasToolTip);
        return;
      }
      break;
    case "bottom":
      x = elementRect.left;
      y = elementRect.top + elementRect.height + 5;
      break;
  }
  hasToolTip.style.left = x + "px";
  hasToolTip.style.top = y + "px";
}
