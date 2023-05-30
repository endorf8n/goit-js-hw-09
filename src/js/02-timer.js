import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import convertMs from './convertMs';

let intervalId = null;

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('[data-start]'),
};

refs.button.disabled = true;

flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notify.failure('Please choose a date in the future');
    } else {
      refs.button.disabled = false;
    }
  },
});

function onStartClick() {
  intervalId = setInterval(() => {
    const selectedDate = new Date(refs.input.value);

    const diff = selectedDate - Date.now();

    if (diff <= 0) {
      stop();
      return;
    }
    let { days, hours, minutes, seconds } = convertMs(diff);

    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
  }, 1000);
}

function stop() {
  clearInterval(intervalId);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

refs.button.addEventListener('click', onStartClick);
