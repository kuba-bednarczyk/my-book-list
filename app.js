// get most used elements
const bookForm = document.querySelector('#book-form');
const bookList = document.querySelector('#book-list');

// Book Class: Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    // get books from storage
    const books = Storage.getBooks();
    books.forEach(book => UI.addBookToList(book));
  }

  static addBookToList({title, author, isbn}) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${title}</td>
      <td>${author}</td>
      <td class="isbn">${isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    bookList.appendChild(row);
  };

  static deleteBook(elem) {
    elem.classList.contains('delete') ? elem.parentElement.parentElement.remove() : null; 
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  };

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    container.insertBefore(div, bookForm);
    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000)
  };
}

// Store Class: Handles Storage
class Storage {
  static getBooks() {
    let books;

    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  };

  static addBook(book) {
    const books = Storage.getBooks();
    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  };

  static removeBook(isbn) {
    const books = Storage.getBooks();
    books.forEach((book, index) => {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  };
}

// Events: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Events: Add a Book
bookForm.addEventListener('submit', (e) => {
  // prevent submit
  e.preventDefault();
  // get form values
  const titleVal = document.querySelector('#title').value;
  const authorVal = document.querySelector('#author').value;
  const isbnVal = document.querySelector('#isbn').value;

  // Validate
  if (titleVal === '' || authorVal === '' || isbnVal === ''){
    const message = 'Please fill all fields'
    UI.showAlert(message, 'danger');
  } else {
    // Instatiate book;
    const book = new Book(titleVal, authorVal, isbnVal);

    // Add Book to UI and localStorage
    UI.addBookToList(book);
    Storage.addBook(book);

    // show success message
    UI.showAlert('Book added!', 'success');

    // clear fields
    UI.clearFields();
  };
})

// Event: Remove a Book
bookList.addEventListener('click', e => {
  // remove book from UI and Storage
  UI.deleteBook(e.target);
  Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);

// show success message
  UI.showAlert('Book removed', 'success');
});