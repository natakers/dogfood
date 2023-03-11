const onResponce = (res) => {
	return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
	constructor({ baseUrl, token }) {
		this._token = null;
		// or -> this._headers = headers;
		this._baseUrl = baseUrl;
    console.log(token);
	}


  
  singUpUser(data) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        // authorization: this._token,/
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(onResponce);
  }

  singInUser(data) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        // authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(onResponce);
  }

  // POST https://api.react-learning.ru/signup // регистрация { ...data, group: 'group-id'}
  // POST https://api.react-learning.ru/signin // авторизация

	getProductList() {
		return fetch(`${this._baseUrl}/products`, {
			headers: {
				authorization: this._token,
			},
		}).then(onResponce);
	}

  getProductById(idProduct) {
    return fetch(`${this._baseUrl}/products/${idProduct}`, {
        headers: {
          authorization: this._token,
          "Content-Type": "application/json",
        }
    }).then(onResponce)
}

	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: {
				authorization: this._token,
			},
		}).then(onResponce);
	}
  search(searchQuery) {

    return fetch(`${this._baseUrl}/products/search?query=${searchQuery}`,{
        headers: {
            authorization: this._token
        }
    }).then( response => response.ok ? response.json() : Promise.reject(response.status))
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(onResponce);
  }
  
  changeLikeProductStatus(productID, like) {
    // Обычная реализация: 2 разных метода для удаления и постановки лайка.
    return fetch(`${this._baseUrl}/products/likes/${productID}`, {
      method: like ? "PUT" : "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(onResponce);
  }

  setReview(id, text) {
    return fetch(`${this._baseUrl}/products/review/${id}`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(text),
    }).then(onResponce);
  }

  getProductReviews(id) {
		return fetch(`${this._baseUrl}/products/review/${id}`, {
			headers: {
				authorization: this._token,
			},
		}).then(onResponce);
	}

}


const config = {
    baseUrl:'https://api.react-learning.ru',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UxMmRmNDU5Yjk4YjAzOGY3N2IyMjgiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc1NzAxNzgwLCJleHAiOjE3MDcyMzc3ODB9.zyudBlyMJGJX7MyT2kglcsfV5h-RFGpaT7KCgoV76Sw'
}


const api = new Api(config)

export default api;