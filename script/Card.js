import openPopup from "./index.js"
export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {                            //Подключение к HTML-разметке 
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    _setEventListeners() {                      //Установка обработчиков событий на интерактивные элементы
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._clickLikeButton();
        });

        this._element.querySelector('.element__trash-button').addEventListener('click', () => {
            this._clickTrashButton();
        });

        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._clickPopupImage();
        });
    }

    // Методы для обработчиков событий
    _clickLikeButton() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active'); // Кнопка лайка(Ставит/убирает)
    }

    _clickTrashButton() {                                                                       // Удаление карточки
        this._element.remove();         
    }

    _clickPopupImage() {                                                                        // Открывает изображение карточки в полном разрешении в попапе
        const popupOpenImage = document.querySelector('.popup_open-image');             
        openPopup(popupOpenImage);

        document.querySelector('.popup__image').src = this._link;
        document.querySelector('.popup__title').textContent = this._name;
        document.querySelector('.popup__image').alt = this._name;
    }

    // Публичный метод, создающий новую карточку
    generateCard() {
        this._element = this._getTemplate();            //Копируем разметку
        this._setEventListeners();                      //Устанавливаем обработчики

        this._element.querySelector('.element__image').src = this._link;          // Добавление данных в карточку
        this._element.querySelector('.element__image').alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;

        return this._element;
    }
};