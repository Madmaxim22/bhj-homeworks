class Game {
  timerId = null;

  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector(".word");
    this.winsElement = container.querySelector(".status__wins");
    this.lossElement = container.querySelector(".status__loss");
    this.timerElement = container.querySelector(".timer");

    this.reset();

    this.registerEvents();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  timer(word) {
    let time = word.length;
    this.timerId = setInterval(() => {
      if (time >= 0) {
        this.timerElement.textContent = time--;
      } else {
        this.fail();
      }
    }, 1000);
  }

  registerEvents() {
    var status = function (e) {
      if (
        e.key.toLowerCase() === this.currentSymbol.textContent.toLowerCase()
      ) {
        this.success();
      } else {
        this.fail();
      }
    };
    document.addEventListener("keypress", status.bind(this), false);
  }

  success() {
    if (this.currentSymbol.classList.contains("symbol_current"))
      this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add("symbol_correct");
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add("symbol_current");
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert("Победа!");
      this.reset();
    }
    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert("Вы проиграли!");
      this.reset();
    }
    this.setNewWord();
  }

  setNewWord() {
    const word = this.getWord();

    this.renderWord(word);
    if (this.timerId != null) {
      clearInterval(this.timerId);
    }
    this.timer(word);
  }

  getWord() {
    const words = [
        "bob",
        "awesome",
        "netology",
        "hello",
        "kitty",
        "rock",
        "youtube",
        "popcorn",
        "cinema",
        "love",
        "javascript",
        "что такое love",
        "когда едят popcorn",
        "почему заблокировали youtube",
        "киш это rock",
        "я люблю js",
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? "symbol_current" : ""}">${s}</span>`
      )
      .join("");
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector(".symbol_current");
  }
}

new Game(document.getElementById("game"));
