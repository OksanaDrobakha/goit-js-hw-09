const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

btnStop.disabled = true;
let timeInterval = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStart.addEventListener('click', event => {
  btnStart.disabled = true;
  btnStop.disabled = false;
  timeInterval = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
});

btnStop.addEventListener('click', event => {
  clearInterval(timeInterval);
  btnStart.disabled = false;
  btnStop.disabled = true;
});
