const api = "https://reactnd-books-api.udacity.com";

window.token = localStorage.token;

if (!window.token) {
  window.token = localStorage.token = Math.random().toString(36).substr(-8);
}

const headers = {
  Accept: 'application/json',
  Authorization: window.token
}

function getBook(bookId) {
  return new Promise(function (resolve, reject) {
    fetch(api + '/books/' + bookId.toString(), { headers })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(reject)
  })

}

function getMyBooks() {
  return new Promise(function (resolve, reject) {
    fetch(api + '/books', { headers })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(reject)
  })
}

function updateBook(book, shelf) {
  return new Promise((resolve, reject) => {
    fetch(api + '/books/' + book.id.toString(), {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ shelf })
    }).then(response => response.json())
      .then(data => resolve(data))
      .catch(reject);
      return console.log('teste')
  });
}



function searchBooks(query) {
  return new Promise((resolve, reject) => {
    fetch(`${api}/search`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    }).then(response => response.json())
      .then(data => resolve(data))
      .catch(reject)
  })
}
