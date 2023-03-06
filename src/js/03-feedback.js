import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

document.addEventListener('DOMContentLoaded', hahdleFillValue);
form.addEventListener('submit', handleSubmitForm);
form.addEventListener('input', throttle(handleSaveMessage, 500));

const FORM_MESSAGE_KEY = 'feedback-form-state';
const formData = {};

function handleSaveMessage(e) {
  formData[e.target.name] = e.target.value;
  saveMessageToLocalStorage(formData);
}

function saveMessageToLocalStorage(msg) {
  localStorage.setItem(FORM_MESSAGE_KEY, JSON.stringify(msg));
}

function getMessageToLocalStorage() {
  try {
    return JSON.parse(localStorage.getItem(FORM_MESSAGE_KEY));
  } catch (error) {
    console.log(error.message);
  }
}

function handleSubmitForm(e) {
  e.preventDefault();

  localStorage.removeItem(FORM_MESSAGE_KEY);
  form.reset();
}

function hahdleFillValue() {
  const storage = getMessageToLocalStorage();

  if (storage) {
    form.elements.email.value = storage.email;
    form.elements.message.value = storage.message;
  }
}

// old
// const form = document.querySelector('.feedback-form');
// const emailEl = form.querySelector('[name="email"]');
// const messageEl = form.querySelector('[name="message"]');

// const hahdleFillValue = () => {
//   const storage = getVelueFromLocalStorage(FORM_MESSAGE_KEY);

//   if (storage?.email) {
//     emailEl.value = storage.email;
//   }

//   if (storage?.message) {
//     messageEl.value = storage.message;
//   }
// };

// document.addEventListener('DOMContentLoaded', hahdleFillValue);

// const handleSubmitForm = e => {
//   e.preventDefault();

//   const storage = getVelueFromLocalStorage(FORM_MESSAGE_KEY);
//   localStorage.removeItem(FORM_MESSAGE_KEY);
//   form.reset();
// };

// const handleInputEmail = e => {
//   saveValueToLocalStorage({ email: e.target.value });
// };

// const handleInputMessage = e => {
//   saveValueToLocalStorage({ message: e.target.value });
// };

// form.addEventListener('submit', handleSubmitForm);
// emailEl.addEventListener('input', throttle(handleInputEmail, 500));
// messageEl.addEventListener('input', throttle(handleInputMessage, 500));

// function saveValueToLocalStorage(value) {
//   let storage = getVelueFromLocalStorage(FORM_MESSAGE_KEY);

//   try {
//     localStorage.setItem(
//       FORM_MESSAGE_KEY,
//       JSON.stringify({ ...storage, ...value })
//     );
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// function getVelueFromLocalStorage(key) {
//   try {
//     return JSON.parse(localStorage.getItem(key));
//   } catch (error) {
//     console.log(error.message);
//   }
// }
