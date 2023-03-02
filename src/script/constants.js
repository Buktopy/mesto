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
export const popupAvatar = document.querySelector('.popup_edit-avatar'); // Попап аватара
export const popupDeleteCard = document.querySelector('.popup_delete-card'); // Попап подтверждения удаления карточки
// Инпуты редактирования профиля
export const inputName = document.querySelector('.popup__input_type_name');
export const inputAbout = document.querySelector('.popup__input_type_about');
// Информация имя/о себе в профиле
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');
export const profileAvatar = document.querySelector('.profile__avatar');

// Переменные с кнопками- добавить карточку, редактирование профиля
export const addButton = document.querySelector('.profile__add-button');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const changeAvatarButton = document.querySelector('.profile__avatar-edit');