export class FormValidator {
    constructor(validationConfig, formElement) {
        this._validationConfig = validationConfig;
        this._formElement = formElement;

        this._formSelector = validationConfig.formSelector;
        this._inputSelector = validationConfig.inputSelector;
        this._submitButtonSelector = validationConfig.submitButtonSelector;
        this._inactiveButtonClass = validationConfig.inactiveButtonClass;
        this._inputErrorClass = validationConfig.inputErrorClass;
        this._errorClass = validationConfig.errorClass;

        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    };

    _showInputError(inputElement) {                                             // Метод, выводящий ошибку поля ввода
        const formError = this._formElement.querySelector(`.${inputElement.id}-error`);

        formError.classList.add(this._errorClass);
        formError.textContent = inputElement.validationMessage;
        inputElement.classList.add(this._inputErrorClass);
    };

    _hideInputError(inputElement) {                                             // Метод, скрывающий ошибку поля ввода
        const formError = this._formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.remove(this._inputErrorClass);
        formError.classList.remove(this._errorClass);
        formError.textContent = '';
    };

    _isValid(inputElement) {                                                   // Показывает ошибку, если инпут невалидный, скрывает, если валидный
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _hasInvalidInput() {                                                       //Проверка на наличие поля с неверными введенными данными
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _toggleButtonState() {
        if (this._hasInvalidInput()) {                                         // Блокировка кнопки сабмита при невалидном инпуте 
            this._buttonElement.classList.remove(this._submitButtonSelector);
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.add(this._submitButtonSelector);     // Разблокировка при валидном
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.disabled = false;
        };
    };

    // Проверка всех инпутов на валидность
    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {      // Обработчик
                this._isValid(inputElement);                    // проверяющий на валидность все поля ввода
                this._toggleButtonState();                      // и блокирующий сабмит кнопку при невалидном инпуте
            });
        });
    };

    resetForm() {
        this._inputList.forEach((inputElement) => {             // Метод, позволяющий при повторном открытии попапа убирать(добавлять)
            this._toggleButtonState();                          // дизейбл кнопки и ошибки, которые были вызваны прошлым редактированием попапа и закрытием его без изменений
            this._hideInputError(inputElement);                 // (Вызывается при открытии попапа редактирования профиля и добавления карточки)
        });
    };

    enableValidation() {                                        // Публичный метод для вызова валидации формы
        this._setEventListeners();
    };
}