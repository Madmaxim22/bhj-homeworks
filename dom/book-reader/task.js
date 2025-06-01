const book = document.querySelector(".book");
const bookControlFontSize = document.querySelector(".book__control_font-size");
const bookControlColor = document.querySelector(".book__control_color");
const bookControlBackground = document.querySelector(
  ".book__control_background"
);

bookControlFontSize.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("font-size")) {
    const active = document.querySelector(".font-size_active");
    active.classList.remove("font-size_active");
    event.target.classList.add("font-size_active");
    let size = event.target.dataset.size;
    book.classList.remove("book_fs-big", "book_fs-small");
    if (size === "small") {
      book.classList.add("book_fs-small");
    }
    if (size === "big") {
      book.classList.add("book_fs-big");
    }
    event.preventDefault();
  }
});

bookControlColor.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("color")) {
    const active = bookControlColor.querySelector(".color_active");
    active.classList.remove("color_active");
    event.target.classList.add("color_active");
    let color = event.target.dataset.textColor;
    book.classList.remove(
      "book_color-gray",
      "book_color-whitesmoke",
      "book_color-black"
    );
    switch (color) {
      case "black":
        book.classList.add("book_color-black");
        break;
      case "gray":
        book.classList.add("book_color-gray");
        break;
      case "whitesmoke":
        book.classList.add("book_color-whitesmoke");
        break;
    }
    event.preventDefault();
  }
});

bookControlBackground.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("color")) {
    const active = bookControlBackground.querySelector(".color_active");
    active.classList.remove("color_active");
    event.target.classList.add("color_active");
    let color = event.target.dataset.bgColor;
    book.classList.remove("book_bg-gray", "book_bg-black", "book_bg-white");
    switch (color) {
      case "black":
        book.classList.add("book_bg-black");
        break;
      case "gray":
        book.classList.add("book_bg-gray");
        break;
      case "white":
        book.classList.add("book_bg-white");
        break;
    }
    event.preventDefault();
  }
});
