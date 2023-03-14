
const startBtnRef = document.querySelector('button[data-start]');
const stopBtnRef = document.querySelector('button[data-stop]');
const bodyRef = document.querySelector('body');
let timerId = null;
const DELAY = 1000;
stopBtnRef.disabled = true

startBtnRef.addEventListener('click', onStar)
stopBtnRef.addEventListener('click', onStop)


function onStar() {
    startBtnRef.disabled = true;
    stopBtnRef.disabled = false;

    timerId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();    
    }, DELAY);
}

function onStop() {
    startBtnRef.disabled = false;
    clearInterval(timerId);
}


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }


