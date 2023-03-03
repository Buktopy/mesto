export default class Card {
  constructor(
    card,
    userId,
    templateSelector,
    { handleClickCard, handleDeleteCard, handleLikeCard }
  ) {
    this._name = card.name;
    this._link = card.link;
    this._likes = card.likes;
    this._owner = card.owner;
    this._id = card._id;
    this._userId = userId;

    this._templateSelector = templateSelector;
    this._handleClickCard = handleClickCard;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
  }

  _getTemplate() {
    //HTML-разметка
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  // Публичный метод, создающий новую карточку
  generateCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector(".element__image");
    this._likeButton = this._card.querySelector(".element__like");
    this._likeCounter = this._card.querySelector(".element__like-counter");
    this._deleteButton = this._card.querySelector(".element__trash-button");

    this._card.querySelector(".element__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this.setLikes(this._likes);

    if (this._userId !== this._owner._id) this._deleteButton.remove();

    this._setEventListeners();

    return this._card;
  }

  isLiked() {
    return this._likes.some((user) => user._id === this._userId);
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    this._likeCounter.textContent = newLikes.length;
    if (this.isLiked()) {
      this._addLike();
    } else {
      this._removeLike();
    }
  }

  _addLike = () => {
    this._likeButton.classList.add("element__like_active");
  };

  _removeLike = () => {
    this._likeButton.classList.remove("element__like_active");
  };

  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  _setEventListeners() {
    //Установка обработчиков событий на интерактивные элементы
    this._likeButton.addEventListener("click", () => {
      this._handleLikeCard(this._id);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this._id);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleClickCard(this._name, this._link);
    });
  }
}
