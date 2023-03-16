class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkServerResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`${res.status} ${res.statusText}`);
  }

  _makeRequest(url, method, body = null) {
    return fetch(`${this._baseUrl}/${url}`, {
      method,
      headers: this._headers,
      body: body ? JSON.stringify(body) : null,
    }).then((res) => this._checkServerResponse(res));
  }

  getCard() {
    return this._makeRequest("cards", "GET");
  }

  setCard({ name, link }) {
    return this._makeRequest("cards", "POST", { name, link });
  }

  deleteCard(_id) {
    return this._makeRequest(`cards/${_id}`, "DELETE");
  }

  getUserInfo() {
    return this._makeRequest("users/me", "GET");
  }

  setUserInfo(forms) {
    return this._makeRequest("users/me", "PATCH", forms);
  }

  changeAvatar(data) {
    return this._makeRequest("users/me/avatar", "PATCH", data);
  }

  setLike(_id) {
    return this._makeRequest(`cards/${_id}/likes`, "PUT");
  }

  deleteLike(_id) {
    return this._makeRequest(`cards/${_id}/likes`, "DELETE");
  }
}
