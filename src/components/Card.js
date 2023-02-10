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
        this._likeButton.addEventListener('click', () => {
            this._clickLikeButton();
        });

        this._element.querySelector('.element__trash-button').addEventListener('click', () => {
            this._clickTrashButton();
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    // Методы для обработчиков событий
    _clickLikeButton() {
        this._likeButton.classList.toggle('element__like_active'); // Кнопка лайка(Ставит/убирает)
    }

    _clickTrashButton() {                                                                       // Удаление карточки
        this._element.remove();         
    }

    // Публичный метод, создающий новую карточку
    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.element__image');
        this._likeButton = this._element.querySelector('.element__like');
        this._setEventListeners();                      //Устанавливаем обработчики

        this._cardImage.src = this._link;          // Добавление данных в карточку
        this._cardImage.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;

        return this._element;
    }
};