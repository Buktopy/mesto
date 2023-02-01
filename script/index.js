import {
    elementsContainer, initialCards, addCardForm, popupAddTitleInput, popupAddImageSrcInput, popupAddElement, popupEditProfile, addButton, profileEditButton, inputName, inputAbout,
    profileName, profileAbout, popups, profileEditForm, validationConfig
} from "./constants.js" // Модуль со всеми переменными 
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

/*Добавление всех карточек из массива в блок elements*/
const addCard = (newCard) => {
    elementsContainer.prepend(newCard);
};

initialCards.forEach((item) => {
    const card = new Card(item, '#card');
    const newCard = card.generateCard();

    addCard(newCard);
});

// Функция добавления новой карточки в массив
function submitAddCard(evt) {
    evt.preventDefault();

    const cardText = popupAddTitleInput.value;
    const cardImage = popupAddImageSrcInput.value;

    const card = new Card({ name: cardText, link: cardImage }, '#card');
    const newCard = card.generateCard();

    addCard(newCard);

    closePopup(popupAddElement);

    addCardForm.reset();
};

addCardForm.addEventListener('submit', submitAddCard);

/*Общее открытие popup*/
export default function openPopup(item) {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
};

// Открытие окна редактирования профиля
profileEditButton.addEventListener('click', function () {
    inputName.value = profileName.textContent;      // 
    inputAbout.value = profileAbout.textContent;    // Изначальная информация в попапе = данные на странице

    profileFormValidation.resetForm();              // Метод, позволяющий при повторном открытии попапа убирать
    openPopup(popupEditProfile);                    // дизейбл кнопки и ошибки, которые были вызваны прошлым редактированием попапа и закрытием его без изменений
});                                                 

// Открытие окна добавления карточки
addButton.addEventListener('click', function () {    
    addCardForm.reset();                            // Изначальная информация в попапе = пустые поля              

    AddCardFormValidation.resetForm();              // Метод, позволяющий при повторном открытии попапа убирать
    openPopup(popupAddElement);                     // дизейбл кнопки и ошибки, которые были вызваны прошлым редактированием попапа и закрытием его без изменений
});                                                 

//Общая функция закрытия попапа
function closePopup(item) {
    item.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
};

//Закрытие попапа на оверлей или крестик
popups.forEach(btn => {
    btn.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
            closePopup(btn);
        };
    });
});

//Закрытие попапа на Esc
function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    };
};

/*Cохранение данных при нажатии кнопки "Cохранить"*/
function editFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    closePopup(popupEditProfile);
}

profileEditForm.addEventListener('submit', editFormSubmit);

// Создание валидации в форме
const profileFormValidation = new FormValidator(validationConfig, profileEditForm); // Валидация формы редактирования профиля
profileFormValidation.enableValidation();   // Вызов формы с валидацией. Попап для редактирования профиля 

const AddCardFormValidation = new FormValidator(validationConfig, addCardForm); // Валидация Формы добавления карточки в коллекцию
AddCardFormValidation.enableValidation();   // Вызов формы с валидацией. Попап для добавления новой карточки в коллекцию