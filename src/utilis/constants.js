export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

// Формы
export const profileEditForm = document.querySelector(
  ".popup__form_edit-profile"
); // Форма редактирования профиля
export const cardAddForm = document.querySelector(".popup__form_add-card"); // Форма добавления карточки в коллекцию
export const avatarForm = document.querySelector(".popup__form_edit-avatar"); // Форма смены аватара

// Инпуты редактирования профиля
export const inputName = document.querySelector(".popup__input_type_name");
export const inputAbout = document.querySelector(".popup__input_type_about");

// Переменные с кнопками- добавить карточку, редактирование профиля
export const buttonAddCard = document.querySelector(".profile__add-button");
export const buttonEditProfile = document.querySelector(
  ".profile__edit-button"
);
export const buttonChangeAvatar = document.querySelector(
  ".profile__avatar-edit"
);
