class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBooktolist(book) {
    const list = document.getElementById("book-list");
    // Create tr element
    const row = document.createElement("tr");
    // insert cols
    row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class='delete'>X<a></td>`;

    list.appendChild(row);
  }

  showAlert(message, className) {
    // create div
    const div = document.createElement("div");
    // add class
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // get parent
    const container = document.querySelector(".container");
    // get Form
    const form = document.querySelector("#book-form");

    // inset allert
    container.insertBefore(div, form);

    // Timeout after 3 sec
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

// Local Storage Class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function (book) {
      const ui = new UI();
      // Add book to UI
      ui.addBooktolist(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// DOM load Event
document.addEventListener("DOMContentLoaded", Store.displayBooks);

// Event listeners for add book
document.getElementById("book-form").addEventListener("submit", function (e) {
  // get form Values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  // instantiate UI
  const ui = new UI();

  // Validade
  if (title === "" || author === "" || isbn === "") {
    // Error alert
    ui.showAlert("Por favor preencha todos os campos", "error");
  } else {
    // ui add book to list
    ui.addBooktolist(book);

    // Add to LS
    Store.addBook(book);

    // Show succes
    ui.showAlert("Livro adicionado!", "success");

    // clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event listener for delete
document.getElementById("book-list").addEventListener("click", function (e) {
  // instantiate UI
  const ui = new UI();

  // Delete book
  ui.deleteBook(e.target);

  //   Removee from localStorage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show message
  ui.showAlert("Livro Removido!", "success");

  e.preventDefault();
});
