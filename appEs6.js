class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  static showBooks() {
    let bookStorage = new Storage('books');
    let books = bookStorage.getItems();

    books.forEach(book => {
      new UI().addToBookList(book);
    });

  }

  addToBookList(book) {
    let list = document.getElementById('book-list');
    let row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
  }

  clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = ''; 
  }

  deleteBook(target) {
    if(target.className === 'delete') {
      const bookItem = target.parentElement.parentElement;
      bookItem.remove();
    }
  }

  showAlert(msg , className) {
    const div = document.createElement('div');

    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(msg));

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div, form);
    setTimeout(() => {
      alert = document.querySelector('.alert');
      alert.remove()
    }, 3000);
  }
}

class Storage {
  constructor(collectionName) {
    this.collectionName = collectionName;
  }

  getItems() {
    let items;

    if(localStorage.getItem(this.collectionName) === null) {
      items = [];
    }else {
      items = JSON.parse(localStorage.getItem(this.collectionName));
    }

    return items;
  }

  addItem(item) {
    let items;

    items = this.getItems();
    
    items.push(item);
    localStorage.setItem(this.collectionName, JSON.stringify(items));
  }

  removeItem(item) {
    let items = this.getItems()

    let newItems = items.filter( storedItem => {
      return item.isbn != storedItem.isbn;
    })

    localStorage.setItem(this.collectionName, JSON.stringify(newItems));
  }
}

document.querySelector('#book-form').addEventListener('submit', (e) => {
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let isbn = document.querySelector('#isbn').value;
  
  let book = new Book(title, author, isbn);
  let ui = new UI();

  if (title === '' || author === '' || isbn === '')
  {
    ui.showAlert('Please fill up all fields', 'error')
  } else {
    ui.addToBookList(book);
    bookStorage = new Storage('books');
    bookStorage.addItem(book);
    ui.clearFields();
    ui.showAlert('Form is submitted successfully', 'success')
  }
  
  e.preventDefault();
});

//event delegation
document.querySelector('#book-list').addEventListener('click', (e) => {
  const ui = new UI();
  const bookStorage = new Storage('books');
  const isbn = e.target.parentElement.previousElementSibling.textContent;

  ui.deleteBook(e.target);
  ui.showAlert('Item Deleted successfully', 'success');
  bookStorage.removeItem({'isbn':isbn})
  e.preventDefault();
});

//DOM LOADED
document.addEventListener('DOMContentLoaded', () => {
  UI.showBooks();
})