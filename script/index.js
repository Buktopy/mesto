/*Массив с карточками, отображаемый на странице*/
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

/*Правила создания карточек из массива*/
const createCard = (cardText, cardImage) => {
    const elementTemplate = document.querySelector('#card').content;
    const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
    elementImage = elementCard.querySelector('.element__image');
    elementText = elementCard.querySelector('.element__text');
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
    const popupImageSrc = document.querySelector('.popup__image');
    const popupTitle = document.querySelector('.popup__title');

    elementCard.querySelector('.element__image').addEventListener('click', function () {
        openPopup(popupOpenImage);

        popupImageSrc.src = cardImage;
        popupImageSrc.alt = cardText;
        popupTitle.textContent = cardText;
    });

    return elementCard;
}

// Функция добавления новой карточки в массив
const popupAddCardSubmit = document.querySelector('.popup__form_add-button');
const popupAddTitleInput = document.querySelector('.popup__input-text_type_title');
const popupAddImageSrcInput = document.querySelector('.popup__input-text_type_image-src');

function submitAddCard(evt) {
    evt.preventDefault();

    const cardText = popupAddTitleInput.value;
    const cardImage = popupAddImageSrcInput.value;

    addCard(createCard(cardText, cardImage));

    closePopup(popupAddElement);

    popupAddTitleInput.value = "";
    popupAddImageSrcInput.value = "";
};

popupAddCardSubmit.addEventListener('submit', submitAddCard);

/*Добавление всех карточек из массива в блок elements*/
const elementsContainer = document.querySelector('.elements');

const addCard = (cardNew) => {
    elementsContainer.prepend(cardNew);
};

initialCards.forEach((item) => {
    addCard(createCard(item.name, item.link));
});

// Переменные со всплывающими окнами- Добавление карточки, редактирование профиля и открытие картинки соответственно
const popupAddElement = document.querySelector('.popup_add-element');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupOpenImage = document.querySelector('.popup_open-image');
// Переменные с кнопками- добавить карточку, редактирование профиля соответственно
const addButton = document.querySelector('.profile__add-button');
const profileButton = document.querySelector('.profile__button');
// Переменные с полями ввода и информацией в профиле, соответственно 
const inputName = document.querySelector('.popup__input-text_type_name');
const inputAbout = document.querySelector('.popup__input-text_type_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

/*Общее открытие popup*/
function openPopup(item) {
    item.classList.add('popup_opened');
};

// Открытие окна редактирования профиля
profileButton.addEventListener('click', function () {
    openPopup(popupEditProfile);
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
});

// Открытие окна добавления карточки
addButton.addEventListener('click', function () {
    openPopup(popupAddElement);
});

/*Закрытие всплывающего окна без сохранения изменений(для всех всплывающих окон)*/
const popupClose = document.querySelectorAll('.popup__close');

function closePopup(item) {
    item.classList.remove('popup_opened');
};

popupClose.forEach(btn => btn.addEventListener('click', () => {
    const popup = btn.closest('.popup');
    closePopup(popup);
}));

/*Cохранение введенных данных при нажатии кнопки "Cохранить"*/
const formElement = document.querySelector('.popup__form');

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    closePopup(popupEditProfile);
}

formElement.addEventListener('submit', handleFormSubmit); 
