import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  inputEl: document.querySelector("#datetime-picker"),
  startBtnEl: document.querySelector("[data-start]"),
  daysEl: document.querySelector("[data-days]"),
  hoursEl: document.querySelector("[data-hours]"),
  minutesEl: document.querySelector("[data-minutes]"),
  secsEl: document.querySelector("[data-seconds]"),
};
const { inputEl, startBtnEl, daysEl, hoursEl, minutesEl, secsEl } = refs;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

let userDate = null;
const onStartTimer = () => {
  if (!userDate) {
return;
  }
  const startBtnIntervalId = setInterval(() => {
    const datesDifference = userDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(datesDifference);
    daysEl.textContent = days.toString().padStart(2,'0');
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secsEl.textContent = seconds.toString().padStart(2, '0');
    startBtnEl.disabled = true;
    if (datesDifference < 1000) {
      clearInterval(startBtnIntervalId);
      startBtnEl.disabled = false;
      daysEl.textContent = 0;
      hoursEl.textContent = 0;
      minutesEl.textContent = 0;
      secsEl.textContent = 0;
    }
  }, 1000);
};
startBtnEl.addEventListener("click", onStartTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (Date.now() >= selectedDates[0]) {
      return onUncorrectDate();
    }
    startBtnEl.disabled = false;
    userDate = selectedDates[0];
  },
};

flatpickr(inputEl, options);

startBtnEl.disabled = true;

function onUncorrectDate() {
  window.alert("Please choose a date in the future");
}
