import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const text = document.querySelector('#datetime-picker');
const timerCount = document.querySelector('.timer');
const start = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      start.disabled = true;
    } else {
      start.disabled = false;
    }
  },
};

flatpickr(text, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

start.addEventListener('click', () => {
  let timer = setInterval(() => {
    let countdown = new Date(text.value) - new Date();
    start.disabled = true;
    if (countdown >= 0) {
      let timeValue = convertMs(countdown);
      days.textContent = addLeadingZero(timeValue.days);
      hours.textContent = addLeadingZero(timeValue.hours);
      minutes.textContent = addLeadingZero(timeValue.minutes);
      seconds.textContent = addLeadingZero(timeValue.seconds);

      if (countdown <= 10000) {
        timerCount.style.color = 'red';
      } else {
        Notiflix.Notify.success('Countdown finished');
        timerCount.style.color = 'black';
        clearInterval(timer);
      }
    }
  }, 1000);
});
