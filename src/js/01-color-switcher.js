const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');
let timerId = null;

function onBtnStartClick() {
  timerId = setInterval(getBgColor, 1000);
  btnStartEl.setAttribute('disabled', '');
  btnStopEl.removeAttribute('disabled');
}

function onBtnStopClick() {
  clearInterval(timerId);
  btnStartEl.removeAttribute('disabled');
  btnStopEl.setAttribute('disabled', '');
}

function getBgColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

btnStartEl.addEventListener('click', onBtnStartClick);
btnStopEl.addEventListener('click', onBtnStopClick);
