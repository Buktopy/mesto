import Popup from "./Popup.js";

export default class PopupWithDeleteConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._submitButton = this._popupSelector.querySelector(".popup__button");
    this._textSubmitButton = this._submitButton.textContent;
    this._textSubmitButtonActive = "Удаляем...";
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
    this._submitButton.addEventListener("click", () => {
      this.startLoading();
      this._submitHandler();
    });
  }

  setSubmitHandler(handler) {
    this._submitHandler = handler;
  }
}
