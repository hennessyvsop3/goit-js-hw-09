import Notiflix from "notiflix";

const firstDelayInputEl = document.querySelector("[name='delay']");
const stepInputEl = document.querySelector("[name='step']");
const amountInputEl = document.querySelector("[name='amount']");
const submitBtnEl = document.querySelector("button");

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      // Fulfill
      setTimeout(() => {
        resolve({ position, delay });
      }, delay);
    } else {
      // Reject
      setTimeout(() => {
        reject({ position, delay });
      }, delay);
    }
  });
}

function onClick(evt) {
  evt.preventDefault();
  evt.stopPropagation();
  const delay = firstDelayInputEl.value;
  const step = stepInputEl.value;
  const amount = amountInputEl.value;

  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, Number(delay) + Number(step * i))
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

submitBtnEl.addEventListener("click", onClick);

// Notiflix.Notify.success("Sol lucet omnibus");

// Notiflix.Notify.failure("Qui timide rogat docet negare");
