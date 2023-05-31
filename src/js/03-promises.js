import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formSubmitEl = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(event) {
  event.preventDefault();

  const { delay, step, amount } = event.currentTarget.elements;
  let firstDelay = delay.valueAsNumber;
  let stepDelay = step.valueAsNumber;
  let inputAmount = amount.valueAsNumber;

  for (let i = 0; i < inputAmount; i += 1) {
    let position = i + 1;
    const increasingDelay = firstDelay + stepDelay * i;

    createPromise(position, increasingDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  event.currentTarget.reset();
}

formSubmitEl.addEventListener('submit', onFormSubmit);
