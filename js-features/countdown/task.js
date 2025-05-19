const timerTag = document.getElementById("timer");
let time = timerTag.textContent;
const URL_DOWNLOAD_TXT = "https://rutube.ru/androidtv/latest/";

const timerId = setInterval(() => {
  if (time >= 0) {
    timerTag.textContent = time--;
  } else {
    clearInterval(timerId);
    alert("Вы победили в конкурсе!");
    directDownload(URL_DOWNLOAD_TXT);
  }
}, 1000);

function directDownload(url) {
  window.location.replace(url);
}

const timer1Tag = document.getElementById("timer1");
const arrTime = timer1Tag.textContent.split(":");
const seconds =
  Number(arrTime[0]) * 3600 + Number(arrTime[1]) * 60 + Number(arrTime[2]);
console.log(seconds);
const endTime = Date.now() + seconds * 1000;

function formatTime(timeInSeconds) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}

function updateTime() {
  const currentTime = Math.max(endTime - Date.now(), 0) / 1000;
  const formatedTime = formatTime(currentTime);
  timer1Tag.innerText = formatedTime;

  if (currentTime === 0) {
    clearInterval(timerInteraval);
    alert("Вы победили в конкурсе!");
  }
}

const timerInteraval = setInterval(updateTime, 1000);
