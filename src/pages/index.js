import Api from '../components/Api';
import './index.css';
import {
    addCardForm, popupAddElement, popupEditProfile, addButton, profileEditButton, inputName, inputAbout,
    profileEditForm, validationConfig, popupImage, popupAvatar, changeAvatarButton, popupDeleteCard
} from "../script/constants.js";
import Card from "../components/Card.js";
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDeleteConfirmation from '../components/PopupWithDeleteConfirmation';
import UserInfo from '../components/UserInfo.js';
import FormValidator from "../components/FormValidator.js";

const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
    headers: {
        authorization: '8375e570-e477-4dc4-a6bc-41730914795e',
        'Content-Type': 'application/json'
    }
});

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
    name: ('.profile__name'),
    about: ('.profile__about'),
    avatar: ('.profile__avatar')
});

// Создание секции с карточками
const cardList = new Section({
    items: [],
    renderer: (data) => {
        const card = new Card(
            data,
            userInfo.getUserId(),
            '#card', {
            handleClickCard: (name, link) => {
                openImage.open(name, link);
            },

            handleDeleteCard: (id) => {
                deleteCardPopup.setSubmitHandler(() => {
                    api
                    .deleteCard(id)
                    .then(() => {
                        card.deleteCard();
                    })
                    .catch((err) => console.log(`Ошибка: ${err}`))
                    .finally(() => {
                        deleteCardPopup.stopLoading();
                    })
                })
                deleteCardPopup.open();
            },

            handleLikeCard: (id) => {
                if (card.isLiked()) {
                    api.deleteLike(id)
                        .then(res => {
                            card.setLikes(res.likes);
                        })
                        .catch(err => console.log(`Ошибка: ${err}`));
                } else {
                    api.setLike(card._id)
                        .then(res => {
                            card.setLikes(res.likes);
                        })
                        .catch(err => console.log(`Ошибка: ${err}`));
                }
            }
        });
        return card.generateCard();
    }
},
    '.elements'
);

// Попап РЕДАКТИРОВАНИЕ ПРОФИЛЯ
const editProfilePopup = new PopupWithForm(popupEditProfile, (input) => {
    api.setUserInfo(input)
        .then((res) => {
            userInfo.setUserInfo(res);
        })
        .catch(err => console.log(`Ошибка: ${err}`))
        .finally(() => {
            editProfilePopup.stopLoading();
        })
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
    api.setCard(data)
        .then((res) => {
            cardList.addItem(res)
            addCardPopup.close();
        })
        .catch(err => console.log(`Ошибка: ${err}`))
        .finally(() => {
            addCardPopup.stopLoading();
        })
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