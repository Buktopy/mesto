import { api } from '../components/Api';
import './index.css';
import {
    addCardForm, popupAddElement, popupEditProfile, addButton, profileEditButton, inputName, inputAbout,
    profileName, profileAbout, profileEditForm, validationConfig, popupImage, profileAvatar, popupAvatar, changeAvatarButton, popupDeleteCard
} from "../script/constants.js";
import Card from "../components/Card.js";
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDeleteConfirmation from '../components/PopupWithDeleteConfirmation';
import UserInfo from '../components/UserInfo.js';
import FormValidator from "../components/FormValidator.js";

Promise.all([
    api.getUserInfo(),
    api.getCard()
])
    .then(([profile, cards]) => {
        userInfo.setUserInfo(profile);
        cards.reverse();
        cardList.renderItems(cards);
    })
    .catch(err => console.error(err));

// Информация о пользователе
const userInfo = new UserInfo({
    name: profileName,
    about: profileAbout,
    avatar: profileAvatar
});

function createCard(item) {
    const card = new Card(item, '#card', handleCardClick);
    return card.generateCard();
 }

// Создание секции с карточками
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card= createCard(item);
        cardList.addItem(card);
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

profileEditButton.addEventListener('click', () => {
    editProfilePopup.open();
    const { name, about } = userInfo.getUserInfo();
    inputName.value = name;
    inputAbout.value = about;
    profileFormValidation.resetForm();
});

// Попап СМЕНА АВАТАРА
const avatarPopup = new PopupWithForm(popupAvatar, (input) => {
    api.changeAvatar(input)
        .then((res) => {
            userInfo.setUserInfo(res);
        })
        .catch(err => console.log(err))
        .finally(() => {
            avatarPopup.stopLoading();
        })
})

changeAvatarButton.addEventListener('click', () => {
    avatarFormValidation.resetForm();
    avatarPopup.open();
})

// Попап ДОБАВЛЕНИЕ КАРТОЧКИ и обработчик открытия
const addCardPopup = new PopupWithForm(popupAddElement, (data) => {
    cardList.addItem(createCard(data));
});

addButton.addEventListener('click', () => {
    addCardFormValidation.resetForm();
    addCardPopup.open();
});

// Попап КАРТИНКА КАРТОЧКИ и УДАЛЕНИЕ КАРТОЧКИ
const openImage = new PopupWithImage(popupImage);
const deleteCardPopup = new PopupWithDeleteConfirmation(popupDeleteCard);

// Слушатели событий попапов
avatarPopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
deleteCardPopup.setEventListeners();
openImage.setEventListeners();

// Создание валидации в форме
const avatarFormValidation = new FormValidator(validationConfig, popupAvatar); // Валидация формы смены аватарки
avatarFormValidation.enableValidation();

const profileFormValidation = new FormValidator(validationConfig, profileEditForm); // Валидация формы редактирования профиля
profileFormValidation.enableValidation();

const addCardFormValidation = new FormValidator(validationConfig, addCardForm); // Валидация формы добавления карточки в коллекцию
addCardFormValidation.enableValidation();