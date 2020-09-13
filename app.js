// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor

function UI() {}

// add book to list
UI.prototype.addBooktolist = function (book) {
  const list = document.getElementById("book-list");
  // Create tr element
  const row = document.createElement("tr");
  // insert cols
  row.innerHTML = `
  <td>${book.title} </td>
  <td>${book.author} </td>
  <td>${book.isbn} </td>
  <td><a href="#" class='delete'>X <a> </td>`;

  list.appendChild(row);
};
// Show alert
UI.prototype.showAlert = function (message, className) {
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
};

// Delete Book
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

// Clear fields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

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
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // ui add book to list
    ui.addBooktolist(book);

    // alert
    ui.showAlert("Book Added!", "success");

    // clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event listener for delete ''delegation
document.getElementById("book-list").addEventListener("click", function (e) {
  // instantiate UI
  const ui = new UI();

  // Dekete book
  ui.deleteBook(e.target);

  // Show message
  ui.showAlert("Book Removed!", "success");
  e.preventDefault();
});
