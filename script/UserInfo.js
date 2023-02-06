class UserInfo {
    constructor({ name, about}) {
        this._name = this._document.querySelector(name);
        this._about = this._documnet.querySelector(about);
    }
    
    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent
        };
    };

    setUserInfo(name, about) {
        this._name = name;
        this._about = about;
    };
}