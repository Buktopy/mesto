// Массив с дефолтными карточками
export const initialCards = [
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

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
};

// Формы
export const profileEditForm = document.querySelector('.popup__form_edit-profile'); // Форма редактирования профиля
export const addCardForm = document.querySelector('.popup__form_add-card'); // Форма добавления карточки в коллекцию

// Попап
export const popupEditProfile = document.querySelector('.popup_edit-profile'); // Попап редактирования профиля
export const popupAddElement = document.querySelector('.popup_add-element'); // Попап добавления карточки в коллекцию
export const popupImage = document.querySelector('.popup_open-image');  // Попап картинки

//Инпуты в попапе добавления карточки
export const popupAddTitleInput = document.querySelector('.popup__input_type_title');
export const popupAddImageSrcInput = document.querySelector('.popup__input_type_image-src');

// Инпуты редактирования профиля
export const inputName = document.querySelector('.popup__input_type_name');
export const inputAbout = document.querySelector('.popup__input_type_about');
// Информация имя/о себе в профиле
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');

// Переменные с кнопками- добавить карточку, редактирование профиля
export const addButton = document.querySelector('.profile__add-button');
export const profileEditButton = document.querySelector('.profile__edit-button');