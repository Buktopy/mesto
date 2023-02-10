import './index.css';
import {
    initialCards, addCardForm, popupAddTitleInput, popupAddImageSrcInput, popupAddElement, popupEditProfile, addButton, profileEditButton, inputName, inputAbout,
    profileName, profileAbout, profileEditForm, validationConfig, popupImage
} from "../script/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// Информация о пользователе
const userInfo = new UserInfo({
    name: profileName,
    about: profileAbout
})

// Создание секции с карточками
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '#card', handleCardClick);
        const newCard = card.generateCard();
        cardList.addItem(newCard);
    },
},
    '.elements'
);
cardList.renderItems();

// Попап КАРТИНКА КАРТОЧКИ
const openImage = new PopupWithImage(popupImage);
function handleCardClick(name, link) {
    openImage.open(name, link);
}

// Попап РЕДАКТИРОВАНИЕ ПРОФИЛЯ
const editProfilePopup = new PopupWithForm(popupEditProfile, (input) => {
    userInfo.setUserInfo({ name: input.name, about: input.about });
});

profileEditButton.addEventListener('click', () => {     // Логика открытия редактирования профиля
    editProfilePopup.open();
    const { name, about } = userInfo.getUserInfo();
    inputName.value = name;
    inputAbout.value = about;
    profileFormValidation.resetForm();
});

// Попап ДОБАВЛЕНИЕ КАРТОЧКИ

const addCardPopup = new PopupWithForm(popupAddElement, () => {
    const card = new Card({ name: popupAddTitleInput.value, link: popupAddImageSrcInput.value }, '#card', handleCardClick);
    cardList.addItem(card.generateCard());
    addCardPopup.close();
});

addButton.addEventListener('click', () => {     //Логика открытия окна добавления карточки 
    addCardFormValidation.resetForm();
    addCardPopup.open();
});

// Слушатели событий попапов
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
openImage.setEventListeners();

// Создание валидации в форме
const profileFormValidation = new FormValidator(validationConfig, profileEditForm); // Валидация формы редактирования профиля
profileFormValidation.enableValidation();   // Вызов формы с валидацией. Попап для редактирования профиля 

const addCardFormValidation = new FormValidator(validationConfig, addCardForm); // Валидация Формы добавления карточки в коллекцию
addCardFormValidation.enableValidation();   // Вызов формы с валидацией. Попап для добавления новой карточки в коллекцию