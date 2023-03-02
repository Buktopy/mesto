export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl
        this._headers = headers
    }

    _checkServerResponse(res) {
        return res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`);
    }

    getCard() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        }).then(res => this._checkServerResponse(res));
    }

    setCard({ name, link }) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })
        }).then(res => this._checkServerResponse(res));
    }

    deleteCard(_id) {
        return fetch(`${this._baseUrl}/cards/${_id}`, {
            method: 'DELETE',
            headers: this._headers
        }).then(res => this._checkServerResponse(res));
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        }).then(res => this._checkServerResponse(res));
    }

    setUserInfo(forms) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(forms)
        }).then(res => this._checkServerResponse(res));
    }

    changeAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        }).then(res => this._checkServerResponse(res));
    }

    setLike(_id) {
        return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        }).then(res => this._checkServerResponse(res));
    }

    deleteLike(_id) {
        return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(res => this._checkServerResponse(res));
    }
}


export const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
    headers: {
        authorization: '8375e570-e477-4dc4-a6bc-41730914795e',
        'Content-Type': 'application/json'
    }
});