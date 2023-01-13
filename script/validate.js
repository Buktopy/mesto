const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

// Показ/скрытие ошибки в полях ввода
const showInputError = (formElement, inputElement, config) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);

  formError.classList.add(config.errorClass);
  formError.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(config.inputErrorClass);
  formError.classList.remove(config.errorClass);
  formError.textContent = '';
};

// Проверка полей на валидность
const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

// Проверка формы на  невалидный инпут и блокировка кнопки сабмита при наличии этого инпута
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {                               // Блокировка кнопки сабмита
    buttonElement.classList.remove(config.submitButtonSelector);
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.add(config.submitButtonSelector);     // Разблокировка 
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  };
};

// Проверка всех инпутов на валидность
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {            //Обработчик
      isValid(formElement, inputElement, config)              //проверяющий на валидность все поля ввода
      toggleButtonState(inputList, buttonElement, config);    //и блокирующий сабмит кнопку при невалидном инпуте
    });
  });
};

//Валидация всех форм
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};