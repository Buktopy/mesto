import Api from '../components/Api';
import './index.css';
import {
    cardAddForm, popupAddElement, popupEditProfile, buttonAddCard, buttonEditProfile, buttonChangeAvatar, inputName, inputAbout,
    profileEditForm, validationConfig, popupImage, popupAvatar, popupDeleteCard, avatarForm
} from "../utilis/constants.js";
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
                cardImage.open(name, link);
            },

            handleDeleteCard: (id) => {
                popupDeleteConfirmation.setSubmitHandler(() => {
                    api
                    .deleteCard(id)
                    .then(() => {
                        card.deleteCard();
                    })
                    .catch((err) => console.log(`Ошибка: ${err}`))
                    .finally(() => {
                        popupDeleteConfirmation.stopLoading();
                    })
                })
                popupDeleteConfirmation.open();
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
const popupProfileForm = new PopupWithForm('.popup_edit-profile', (input) => {
    api.setUserInfo(input)
        .then((res) => {
            userInfo.setUserInfo(res);
        })
        .catch(err => console.log(`Ошибка: ${err}`))
        .finally(() => {
            popupProfileForm.stopLoading();
        })
});

buttonEditProfile.addEventListener('click', () => {
    popupProfileForm.open();
    const { name, about } = userInfo.getUserInfo();
    inputName.value = name;
    inputAbout.value = about;
    profileFormValidation.resetForm();
});

// Попап СМЕНА АВАТАРА
const popupAvatarForm = new PopupWithForm('.popup_edit-avatar', (input) => {
    api.changeAvatar(input)
        .then((res) => {
            userInfo.setUserInfo(res);
        })
        .catch(err => console.log(err))
        .finally(() => {
            popupAvatarForm.stopLoading();
        })
})

buttonChangeAvatar.addEventListener('click', () => {
    avatarFormValidation.resetForm();
    popupAvatarForm.open();
})

// Попап ДОБАВЛЕНИЕ КАРТОЧКИ и обработчик открытия
const popupAddCardForm = new PopupWithForm('.popup_add-element', (data) => {
    api.setCard(data)
        .then((res) => {
            cardList.addItem(res)
            popupAddCardForm.close();
        })
        .catch(err => console.log(`Ошибка: ${err}`))
        .finally(() => {
            popupAddCardForm.stopLoading();
        })
});

buttonAddCard.addEventListener('click', () => {
    cardAddFormValidation.resetForm();
    popupAddCardForm.open();
});

// Попап КАРТИНКА КАРТОЧКИ и УДАЛЕНИЕ КАРТОЧКИ
const cardImage = new PopupWithImage('.popup_open-image');
const popupDeleteConfirmation = new PopupWithDeleteConfirmation('.popup_delete-card');

// Слушатели событий попапов
popupAvatarForm.setEventListeners();
popupAddCardForm.setEventListeners();
popupProfileForm.setEventListeners();
popupDeleteConfirmation.setEventListeners();
cardImage.setEventListeners();

// Создание валидации в форме
const avatarFormValidation = new FormValidator(validationConfig, avatarForm); // Валидация формы смены аватарки
avatarFormValidation.enableValidation();

const profileFormValidation = new FormValidator(validationConfig, profileEditForm); // Валидация формы редактирования профиля
profileFormValidation.enableValidation();

const cardAddFormValidation = new FormValidator(validationConfig, cardAddForm); // Валидация формы добавления карточки в коллекцию
cardAddFormValidation.enableValidation();