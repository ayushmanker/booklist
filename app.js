//Book Contructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor
function UI() {}

//Add book to list
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");
  //Create tr element
  const row = document.createElement("tr");
  //Insert cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X<a></td>
  `;

  list.appendChild(row);
};

//showAlert
UI.prototype.showAlert = function (message, className) {
  //create div
  const div = document.createElement("div");
  //Add classses
  div.className = `alert ${className}`;
  //Add text
  div.appendChild(document.createTextNode(message));
  //Get parent
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");
  //Insert alert
  container.insertBefore(div, form);

  //Timeout after 3 sec
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

//Delete Book
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
  //we have done two times parentElement bcs first we switch to td from link and than from td we switch to tr i.e. table row (that we want to delete )
};

//Clear Fields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

//Event Listeners
document.getElementById("book-form").addEventListener("submit", function (e) {
  //Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  //Instantiate book
  let book = new Book(title, author, isbn);
  //Instantiate UI
  const ui = new UI();

  //Validate
  if (title === "" || author === "" || isbn === "") {
    //error Alert
    ui.showAlert("Please fill in the fields", "error");
  } else {
    //Add book to list
    ui.addBookToList(book);

    //Show success
    ui.showAlert("Book Added !", "success");

    //Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

//Event Listener for delete
document.getElementById("book-list").addEventListener("click", function (e) {
  //Instantiate UI
  const ui = new UI();

  //Delete book
  ui.deleteBook(e.target);

  //Show message
  ui.showAlert("Book Removed !", "success");

  e.preventDefault();
});

//sometimes when we click on the submit button and if the work is not done as according to us, and there is no error in the console too,So to see the error in the console we click on the right-up corner ("gear icon") and in the list that appears check the 'preserve log' option to see the error.
