import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popupSelector.querySelector('.popup__image');
        this._title = this._popupSelector.querySelector('.popup__title');
    }

    open(text, link) {
        this._title.textContent = text;
        this._image.src = link;
        this._image.alt = text;

        super.open();
    }
}