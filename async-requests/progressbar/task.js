const BYTES_IN_MB = 1048576;

const progress = document.getElementById("progress");
const sizeText = document.getElementById("upload__size");
const statusText = document.getElementById("upload__status");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  let file = formData.get("file");
  if (file) {
    resetProgress();
    upload(file);
  }
});

function upload(file) {
  const xhr = new XMLHttpRequest();
  xhr.upload.addEventListener("progress", progressHandler, false);
  xhr.addEventListener("load", loadHandler, false);
  xhr.addEventListener("error", errorHandler);
  xhr.open(
    "POST",
    "https://students.netoservices.ru/nestjs-backend/upload",
    true
  );
  xhr.send(file);
}

function progressHandler(event) {
  updateProgress(event.loaded, event.total);
}

function updateProgress(loaded, total) {
  const loadedMb = (loaded / BYTES_IN_MB).toFixed(1);
  const totalSizeMb = (total / BYTES_IN_MB).toFixed(1);
  const percentLoaded = Math.round((loaded / total) * 100);

  progress.value = percentLoaded;
  sizeText.textContent = `${loadedMb} из ${totalSizeMb} МБ`;
  statusText.textContent = `Загружено ${percentLoaded}% | `;
}

function loadHandler(event) {
  if (event.target.status >= 200 && event.target.status < 300) {
    console.log(JSON.parse(event.target.responseText).message);
    progress.value = 0;
  } else {
    errorHandler();
  }
}

function errorHandler() {
  resetProgress("Ошибка загрузки");
}

function resetProgress(status = "") {
  statusText.textContent = status;
  sizeText.textContent = "";
  progress.value = 0.0;
}
