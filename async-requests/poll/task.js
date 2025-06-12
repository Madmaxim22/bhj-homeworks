const pollAnswers = document.getElementById("poll__answers");
let titleId = 0;

let xhr = new XMLHttpRequest();

xhr.open("GET", "https://students.netoservices.ru/nestjs-backend/poll", true);
xhr.send();

xhr.onload = function () {
  if (xhr.status >= 200 && xhr.status < 300) {
    console.log(JSON.parse(xhr.responseText));
    let poll = JSON.parse(xhr.responseText);
    titleId = poll.id;
    changePollTitle(poll.data.title);
    createPollAnswer(poll.data.answers);
  }
};

function changePollTitle(question) {
  const pollTitle = document.getElementById("poll__title");
  pollTitle.textContent = question;
}

function createPollAnswer(answers) {
  for (const key in answers) {
    if (Object.prototype.hasOwnProperty.call(answers, key)) {
      const element = answers[key];
      pollAnswers.insertAdjacentHTML(
        "beforeend",
        `<button class="poll__answer" id=${key}>${element}</button>`
      );
    }
  }
}

function deletePollAnswer() {
  while (pollAnswers.firstChild) {
    pollAnswers.removeChild(pollAnswers.firstChild);
  }
}

pollAnswers.addEventListener("click", (event) => {
  if (event.target.classList.contains("poll__answer")) {
    alert("Спасибо, ваш голос засчитан!");

    xhr.open(
      "POST",
      "https://students.netoservices.ru/nestjs-backend/poll",
      true
    );
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    let params = "vote=" + titleId + "&answer=" + event.target.id;
    xhr.send(params);
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        let stat = JSON.parse(xhr.responseText).stat;
        console.log(stat);
        deletePollAnswer(stat);
        createStat(stat);
      }
    };
  }
});

function createStat(stat) {
  let vote = 0;
  for (const key in stat) {
    if (Object.prototype.hasOwnProperty.call(stat, key)) {
      vote += stat[key].votes;
    }
  }
  for (const key in stat) {
    if (Object.prototype.hasOwnProperty.call(stat, key)) {
      const element = stat[key];
      const res = ((element.votes / vote) * 100).toFixed(2);
      pollAnswers.insertAdjacentHTML(
        "beforeend",
        `<p class="poll__stat" >${element.answer}: <b>${res}%</b></button>`
      );
    }
  }
}
