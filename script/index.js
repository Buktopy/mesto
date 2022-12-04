const profileButton = document.querySelector('.profile__button');
const popup = document.querySelector('.popup');
const inputName = document.querySelector('.popup__input-text_type_name');
const inputAbout = document.querySelector('.popup__input-text_type_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const popupClose = document.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');

/*Открытие всплывающего окна с данными из профиля*/
function popupOpen(event) {
    popup.classList.add('popup_opened');
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
}

/*Закрытие всплывающего окна без сохранения изменений*/
function popupClosed(event) {
    popup.classList.remove('popup_opened');
}


/*Cохранение введенных данных при нажатии кнопки "Cохранить"*/
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    popupClosed();
}

/*10 Открытие всплывающего окна с данными из профиля*/
profileButton.addEventListener('click', popupOpen);

/*23 Закрытие всплывающего окна без сохранения изменений*/
popupClose.addEventListener('click', popupClosed);

/*28 Cохранение введенных данных при нажатии кнопки "Cохранить"*/
formElement.addEventListener('submit', handleFormSubmit); 