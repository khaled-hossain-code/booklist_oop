function Book (title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

function UI() {}

UI.prototype.addToBookList = function(book) {
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

UI.prototype.clearFields = function() {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#isbn').value = ''; 
}

UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete') {
    const bookItem = target.parentElement.parentElement;
    bookItem.remove();
  }
}

UI.prototype.showAlert = function(msg , className) {
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
    ui.clearFields();
    ui.showAlert('Form is submitted successfully', 'success')
  }
  
  e.preventDefault();
});

//event delegation
document.querySelector('#book-list').addEventListener('click', (e) => {
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert('Item Deleted successfully', 'success')
  e.preventDefault();
});