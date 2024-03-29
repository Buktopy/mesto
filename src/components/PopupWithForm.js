import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupSelector.querySelector(".popup__form");
    this._inputs = this._form.querySelectorAll(".popup__input");

    this._submitButton = this._popupSelector.querySelector(".popup__button");
    this._textSubmitButton = this._submitButton.textContent;
    this._textSubmitButtonActive = "Сохранение...";
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  close() {
    this._form.reset();
    super.close();
  }

  startLoading() {
    this._submitButton.disabled = true;
    this._submitButton.textContent = this._textSubmitButtonActive;
  }

  stopLoading() {
    this._submitButton.disabled = false;
    this._submitButton.textContent = this._textSubmitButton;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.startLoading();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
