const rotators = document.querySelectorAll(".rotator");

function toggler(elems) {
  let delay = 1000;
  let length = elems.length - 1,
    i = 0;
  let repeater = setInterval(toggleTo, delay);

  function toggleTo() {
    elems[i++].classList.remove("rotator__case_active");
    if (i > length) i = 0;
    let color = elems[i].getAttribute("data-color");
    delay = Number(elems[i].getAttribute("data-speed"));
    elems[i].style.color = color;
    elems[i].classList.add("rotator__case_active");
    clearInterval(repeater);
    repeater = setInterval(toggleTo, delay);
  }
}

function sad(elements) {
  elements.forEach((element) => {
    toggler(element.children);
  });
}

sad(rotators);
