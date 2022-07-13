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
    const storedBooks = [
      {
        title: 'Book One',
        author: 'John Doe',
        isbn: '343234',
      },
      {
        title: 'Book Two',
        author: 'Jane Doe',
        isbn: '123345'
      }
    ];

    const books = storedBooks;

    books.forEach(book => UI.addBookToList(book));
  }

  static addBookToList({title, author, isbn}) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${title}</td>
      <td>${author}</td>
      <td>${isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  };

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

// Store Class: Handles Storage

// Events: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

// Events: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // prevent submit
  e.preventDefault();
  // get form values
  const titleVal = document.querySelector('#title').value;
  const authorVal = document.querySelector('#author').value;
  const isbnVal = document.querySelector('#isbn').value;

  // Instatiate book;
  const book = new Book(titleVal, authorVal, isbnVal);

  // Add Book to UI
  UI.addBookToList(book);

  // clear fields
  UI.clearFields();
})

// Event: Remove a Book