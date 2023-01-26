import { Card } from "./Card.js";
import { validationConfig, FormValidator } from "./FormValidator.js";
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

/*Добавление всех карточек из массива в блок elements*/
const elementsContainer = document.querySelector('.elements');

const addCard = (newCard) => {
    elementsContainer.prepend(newCard);
};

initialCards.forEach((item) => {
    const card = new Card(item, '#card');
    const newCard = card.generateCard();

    addCard(newCard);
});

// Функция добавления новой карточки в массив
const popupAddCardForm = document.querySelector('.popup__form_add-button');
const popupAddTitleInput = document.querySelector('.popup__input_type_title');
const popupAddImageSrcInput = document.querySelector('.popup__input_type_image-src');

function submitAddCard(evt) {
    evt.preventDefault();

    const cardText = popupAddTitleInput.value;
    const cardImage = popupAddImageSrcInput.value;

    const card = new Card({ name: cardText, image: cardImage }, '#card');
    const newCard = card.generateCard();

    addCard(newCard);

    closePopup(popupAddElement);

    popupAddCardForm.reset();
};

popupAddCardForm.addEventListener('submit', submitAddCard);

// Переменные со всплывающими окнами- Добавление карточки, редактирование профиля и открытие картинки
const popupAddElement = document.querySelector('.popup_add-element');
const popupEditProfile = document.querySelector('.popup_edit-profile');
// Переменные с кнопками- добавить карточку, редактирование профиля
const addButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
// Переменные с полями ввода и информацией в профиле
const inputName = document.querySelector('.popup__input_type_name');
const inputAbout = document.querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

/*Общее открытие popup*/
export default function openPopup(item) {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
};

// Открытие окна редактирования профиля
profileEditButton.addEventListener('click', function () {
    openPopup(popupEditProfile);
    inputName.value = profileName.textContent;      // 
    inputAbout.value = profileAbout.textContent;    // Изначальная информация в попапе = данные на странице

    profileFormValidation.resetForm();              // Метод, позволяющий при повторном открытии попапа убирать
});                                                 // дизейбл кнопки и ошибки, которые были вызваны прошлым редактированием попапа и закрытием его без изменений

// Открытие окна добавления карточки
addButton.addEventListener('click', function () {
    openPopup(popupAddElement);
    popupAddTitleInput.value = '';                  //
    popupAddImageSrcInput.value = '';               // Изначальная информация в попапе = пустые поля

    AddCardFormValidation.resetForm();              // Метод, позволяющий при повторном открытии попапа убирать
});                                                 // дизейбл кнопки и ошибки, которые были вызваны прошлым редактированием попапа и закрытием его без изменений

//Общая функция закрытия попапа
function closePopup(item) {
    item.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
};

//Закрытие попапа на оверлей или крестик
const closePopupWindow = document.querySelectorAll('.popup');

closePopupWindow.forEach(btn => {
    btn.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
            const popup = document.querySelector('.popup_opened');
            closePopup(popup);
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
const profileEditForm = document.querySelector('.popup__form_edit-profile');

function editFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    closePopup(popupEditProfile);
}

profileEditForm.addEventListener('submit', editFormSubmit);

const profileFormValidation = new FormValidator(validationConfig, popupEditProfile);
profileFormValidation.enableValidation();   // Вызов формы с валидацией. Попап для редактирования профиля 

const AddCardFormValidation = new FormValidator(validationConfig, popupAddElement);
AddCardFormValidation.enableValidation();   // Вызов формы с валидацией. Попап для добавления новой карточки в коллекцию