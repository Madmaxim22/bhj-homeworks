const loader = document.getElementById("loader");
const items = document.getElementById("items");

getValutesLocalStorage();

let xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  "https://students.netoservices.ru/nestjs-backend/slow-get-courses",
  true
);

xhr.onload = function () {
  if (xhr.status >= 200 && xhr.status < 300) {
    let valutes = JSON.parse(xhr.response).response.Valute;
    let valutesObj = [];
    removeItem();
    for (const key in valutes) {
      if (Object.prototype.hasOwnProperty.call(valutes, key)) {
        createItem(
          valutes[key].CharCode,
          valutes[key].Value,
          valutes[key].Name
        );
        let valuteObj = {
          charCode: valutes[key].CharCode,
          value: valutes[key].Value,
          name: valutes[key].Name,
        };
        valutesObj.push(valuteObj);
      }
      loader.classList.remove("loader_active");
      saveLocalStorage(valutesObj);
    }
  } else {
    console.error("Ошибка загрузки:", xhr.statusText);
  }
};

xhr.send();

function createItem(code, value, currency) {
  items.insertAdjacentHTML(
    "beforeend",
    `
    <div class="item">
            <div class="item__code">
                    ${code}
                </div>
                <div class="item__value">
                    ${value}
                </div>
                <div class="item__currency">
                    ${currency}.
            </div>
    </div>
    `
  );
}

function removeItem() {
  while (items.firstChild) {
    items.removeChild(items.firstChild);
  }
}

function saveLocalStorage(valutesObj) {
  localStorage.setItem("valute", JSON.stringify(valutesObj));
}

function getValutesLocalStorage() {
  const valutesObj = JSON.parse(localStorage.getItem("valute"));
  if (valutesObj) {
    valutesObj.forEach((element) => {
      createItem(element.charCode, element.value, element.name);
    });
    loader.classList.remove("loader_active");
  }
}
