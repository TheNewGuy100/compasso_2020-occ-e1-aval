const api = "https://reactnd-books-api.udacity.com";

window.token = localStorage.token;

if (!window.token) {
  window.token = localStorage.token = Math.random().toString(36).substr(-8);
}

const headers = {
  Accept: 'application/json',
  Authorization: window.token
}

/* FUNÇÃO QUE BUSCA TODOS OS LIVROS EM TODAS AS ESTANTES */
function getBook(bookId) {
  return new Promise(function (resolve, reject) {
    fetch(api + '/books/' + bookId.toString(), { headers })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(reject)
  })

}

/* FUNÇÃO DE PROCURAR OS LIVROS NA ESTANTE */
function getMyBooks() {
  return new Promise( function (resolve, reject) {
    
    fetch(api + '/books', { headers })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(reject)
  })
}

/* FUNÇÃO DE ATUALIZAR A ESTANTE DO LIVRO */
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
  }).then( function () {
    const m = document.getElementById(book.id)
    m.remove()
  })

}

/* FUNÇÃO DE PROCURAR OS LIVROS */
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
  
  }).then ( function (data) {
    var books = data.books
    
    books.forEach( function (books) {
      const id = books.id
      const imagem = books.imageLinks.thumbnail
      const titulo = books.title
      const autor = books.authors

    document.getElementById("books-grid-pesquisa").innerHTML += (`
      <li class="ajuste" id="${id}" >
        <div class="book papai">
          <div class="book-top">
            <div class="book-cover"
              style='width:128px;height:192px;background-image:
              url("${imagem}")'>
            </div>
              <div class="book-shelf-changer background">
                <select>
                  <option value="mover para..." disabled selected>Mover para...</option>
                  <option value="Lendo atualmente">Lendo atualmente</option>
                  <option value="Gostaria de ler">Gostaria de ler</option>
                  <option value="Lido">Lido</option>
                </select>
              </div>
            </div>
          <div class="book-title">${titulo}</div>
          <div class="book-authors">${autor}</div>
        </div>
      </li>`)
    })
  })
}


/* CODIGO QUE PERCEBE A MUDANÇA DE UM SELECT E REAGE DIRIGINDO O LIVRO PARA A NOVA ABA ESCOLHIDA */
$('body').on( "change", "select", function (event) {

  if (event.target.value == 'Lendo atualmente') {
    var id_a_mudar = event.target.parentNode.parentNode.parentNode.parentNode.id
    console.log(id_a_mudar)
    updateBook({id: id_a_mudar}, "currentlyReading")
  }

  if (event.target.value == 'Gostaria de ler') {
      var id_a_mudar = event.target.parentNode.parentNode.parentNode.parentNode.id
      console.log(id_a_mudar)
      updateBook({id: id_a_mudar}, "wantToRead").then ( function () {
      })
  }
  
  if (event.target.value == 'Lido') {
    var id_a_mudar = event.target.parentNode.parentNode.parentNode.parentNode.id
    console.log(id_a_mudar)
    updateBook({id: id_a_mudar}, "read")
  }
})

function remover(element) {
  var irei_remover = element.parentNode.parentNode.parentNode.parentNode.id
  updateBook({id: irei_remover}, "none")
}

function limpa() {
  var book_grid = document.getElementById('books-grid-pesquisa')
    book_grid.textContent = '';
}
