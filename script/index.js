let profileButton = document.querySelector('.profile__button');
let popup = document.querySelector('.popup');
let inputName = document.querySelector('.popup__name');
let inputAbout = document.querySelector('.popup__about');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let popupClose = document.querySelector('.popup__close');
let submitButton = document.querySelector('.popup__save-button');
let formElement = document.querySelector('.popup__form');

profileButton.addEventListener('click', popupOpen);
function popupOpen(event) {
    popup.classList.toggle('popup_opened');
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
}

popupClose.addEventListener('click', popupClosed);
function popupClosed(event) {
    popup.classList.toggle('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    popupClosed();
}
formElement.addEventListener('submit', handleFormSubmit); 