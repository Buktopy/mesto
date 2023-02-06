export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
    }

    _closePopupEsc(evt) {
        if (evt.key === 'Escape') {
            this.close();
        };
    };

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._closePopupEsc);
    };

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._closePopupEsc);
    };

    setEventListeners() {
        this._popupSelector.querySelector('.popup__close').addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
                this.close();
            };
        });
    };
}