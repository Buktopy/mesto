import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupSelector.querySelector(".popup__form");
        this._inputs = this._form.querySelectorAll(".popup__input");
        this._saveButton = this._form.querySelector(".popup__button");
    }

    _getInputValues() {
        this._inputValues = {};

        this._inputs.forEach(input => {
            this._inputValues[input.name] = input.value;
        });

        return this._inputValues;
    };

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }
}