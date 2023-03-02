import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailEl = form.querySelector('[name="email"]');
const messageEl = form.querySelector('[name="message"]');

const hahdleFillValue = () => {
  const storage = getVelueFromLocalStorage('feedback-form-state');

  if (storage?.email) {
    emailEl.value = storage.email;
  }

  if (storage?.message) {
    messageEl.value = storage.message;
  }
};

document.addEventListener('DOMContentLoaded', hahdleFillValue);

const handleSubmitForm = e => {
  e.preventDefault();

  const storage = getVelueFromLocalStorage('feedback-form-state');
  console.log(storage);
  localStorage.removeItem('feedback-form-state');
  form.reset();
};

const handleInputEmail = e => {
  saveValueToLocalStorage({ email: e.target.value });
};

const handleInputMessage = e => {
  saveValueToLocalStorage({ message: e.target.value });
};

form.addEventListener('submit', handleSubmitForm);
emailEl.addEventListener('input', throttle(handleInputEmail, 500));
messageEl.addEventListener('input', throttle(handleInputMessage, 500));

function saveValueToLocalStorage(value) {
  let storage = getVelueFromLocalStorage('feedback-form-state');

  try {
    localStorage.setItem(
      'feedback-form-state',
      JSON.stringify({ ...storage, ...value })
    );
  } catch (error) {
    console.log(error.message);
  }
}

function getVelueFromLocalStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.log(error.message);
  }
}
