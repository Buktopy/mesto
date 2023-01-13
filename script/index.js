/*Правила создания карточек из массива*/
const elementTemplate = document.querySelector('#card').content.querySelector('.element');
const popupImagePicture = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__title');

const createCard = (cardText, cardImage) => {
    const elementCard = elementTemplate.cloneNode(true);
    const elementImage = elementCard.querySelector('.element__image');
    const elementText = elementCard.querySelector('.element__text');
    elementImage.src = cardImage;
    elementText.textContent = cardText;
    elementImage.alt = cardText;

    // Обработчик кнопки Like
    const likeButton = elementCard.querySelector('.element__vector');
    likeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__vector_active');
    });

    // Обработчик кнопки удаления карточки
    const deleteCardButton = elementCard.querySelector('.element__trash-button');
    deleteCardButton.addEventListener('click', function () {
        elementCard.remove();
    });
    // Открытие фотографии в полном разрешении

    elementImage.addEventListener('click', function () {
        openPopup(popupOpenImage);

        popupImagePicture.src = cardImage;
        popupImagePicture.alt = cardText;
        popupTitle.textContent = cardText;
    });

    return elementCard;
}

// Функция добавления новой карточки в массив
const popupAddCardForm = document.querySelector('.popup__form_add-card');
const popupAddTitleInput = document.querySelector('.popup__input_type_title');
const popupAddImageSrcInput = document.querySelector('.popup__input_type_image-src');

function submitAddCard(evt) {
    evt.preventDefault();

    const cardText = popupAddTitleInput.value;
    const cardImage = popupAddImageSrcInput.value;

    addCard(createCard(cardText, cardImage));

    closePopup(popupAddElement);

    popupAddCardForm.reset();
};

popupAddCardForm.addEventListener('submit', submitAddCard);

/*Добавление всех карточек из массива в блок elements*/
const elementsContainer = document.querySelector('.elements');

const addCard = (newCard) => {
    elementsContainer.prepend(newCard);
};

initialCards.forEach((item) => {
    addCard(createCard(item.name, item.link));
});

// Переменные со всплывающими окнами- Добавление карточки, редактирование профиля и открытие картинки
const popupAddElement = document.querySelector('.popup_add-element');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupOpenImage = document.querySelector('.popup_open-image');
// Переменные с кнопками- добавить карточку, редактирование профиля
const addButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
// Переменные с полями ввода и информацией в профиле
const inputName = document.querySelector('.popup__input_type_name');
const inputAbout = document.querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

/*Общее открытие popup*/
function openPopup(item) {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
};

// Открытие окна редактирования профиля
profileEditButton.addEventListener('click', function () {
    openPopup(popupEditProfile);
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
});

// Открытие окна добавления карточки
const addCardFormInputs = Array.from(popupAddCardForm.querySelectorAll('.popup__input'));
const addCardSubmitButton = popupAddCardForm.querySelector('.popup__button_add-card')

addButton.addEventListener('click', function () {
    openPopup(popupAddElement);
    popupAddTitleInput.value = '';
    popupAddImageSrcInput.value = '';
    hideInputError(popupAddCardForm, popupAddTitleInput, validationConfig);
    hideInputError(popupAddCardForm, popupAddImageSrcInput, validationConfig);  
});

//Общая функция закрытия попапа
function closePopup(item) {
    item.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
};

//Закрытие попапа на оверлей или крестик
const popups = document.querySelectorAll('.popup');

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
const profileEditForm = document.querySelector('.popup__form_edit-profile');

function editFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    closePopup(popupEditProfile);
}

profileEditForm.addEventListener('submit', editFormSubmit);

enableValidation(validationConfig);