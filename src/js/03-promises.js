import Notiflix from 'notiflix';

document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault();
    const { delay, step, amount } = e.currentTarget.elements;
    const delayValue = parseInt(delay.value);
    const stepValue = parseInt(step.value);
    const amountValue = parseInt(amount.value);
  
    const promises = [];
    let indexToProduct = 0;
  
    for (let index = 0; index < amountValue; index++) {
      const delay = index * stepValue + delayValue;
      let indexToProduct = index + 1;
      createPromise(indexToProduct, delay).then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    }
  
    e.currentTarget.reset();
  });
  
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
