function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startBtnEl = document.querySelector("[data-start]");
const stopBtnEl = document.querySelector("[data-stop]");
const bodyEl = document.querySelector("body");
stopBtnEl.disabled = true;
let startIntervalId = 0;

function changeDisableStatus( btnToDisable, btnToEnable ) {
    btnToDisable.disabled = true;
    btnToEnable.disabled = false;
}

function onStartBtn() {

    changeDisableStatus(startBtnEl, stopBtnEl);
  bodyEl.style.backgroundColor = getRandomHexColor();
  startIntervalId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopBtn() {
  clearInterval(startIntervalId);
  changeDisableStatus(stopBtnEl, startBtnEl);
}

startBtnEl.addEventListener("click", onStartBtn);
stopBtnEl.addEventListener("click", onStopBtn);
