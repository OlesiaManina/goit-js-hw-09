import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const inputRef = document.querySelector('#datetime-picker');
const btnRef = document.querySelector('button[data-start]');
const daysRef = document.querySelector('span[data-days]');
const hoursRef = document.querySelector('span[data-hours]');
const minutesRef = document.querySelector('span[data-minutes]');
const secondsRef = document.querySelector('span[data-seconds]');

btnRef.disabled = true;
const currentTime = Date.now();


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {

        btnRef.addEventListener('click', () => {

            counterInterval(selectedDates[0]);
        });
        
      ckeckValidDate(selectedDates[0]);
    },
  };

flatpickr(inputRef, options);

function counterInterval(time) {
  setInterval(() => {
    const currentTime = Date.now();
    const delta = time - currentTime;
    const deltaInTime = convertMs(delta);

    upgradeTextContent(deltaInTime);

    }, 1000)
}

function ckeckValidDate(time) {
  if (time < currentTime) {
    Notiflix.Notify.warning('Please choose a date in the future');
    
  } else {
    btnRef.disabled = false;

  }
}

function upgradeTextContent({days, hours, minutes, seconds}) {
    daysRef.textContent = days;
    hoursRef.textContent = hours;
    minutesRef.textContent = minutes;
    secondsRef.textContent = seconds;
}


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = pad(Math.floor(ms / day));
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
 
  function pad(value) {
    return value.toString().padStart(2, '0');
  }