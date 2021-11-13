// initialize neccessary variables 
function Book(title, author, pages, readed, id) {
  this.title = title
  this.author = author
  this.pages = pages
  this.readed = readed
  this.id = id
}
let setId = startId()
let bookToEditId
// let myLibrary = []
let myLibrary = [
  {
    title:'title1',
    author: 'author1',
    pages: 123,
    readed: 'yes',
    id: setId(),
  },
  {
    title:'title2',
    author: 'author2',
    pages: 321,
    readed: 'no',
    id: setId(),
  },
  {
    title:'title3',
    author: 'author3',
    pages: 456,
    readed: 'yes',
    id: setId(),
  }
]

// get the neccesary elements
let addBtn = document.querySelector('.addBtn')
let newBookModal = document.querySelector('.newBookModal')
let editBookModal = document.querySelector('.editBookModal')
let saveNewBookBtn = newBookModal.querySelector('input[type="submit"]')
let saveChangesBtn = editBookModal.querySelector('input[type="submit"]')
let table = document.querySelector('tbody')

// initial state
updateTable(table, myLibrary)
// bind an event to new add new book button
addBtn.addEventListener('click', displayAddBookForm)
// bind event to hide modals
newBookModal.addEventListener('click', hideModal)
editBookModal.addEventListener('click', hideModal)
// bind event to save book
saveNewBookBtn.addEventListener('click', saveBook)
// bind event to delete item
table.addEventListener('click', doAction)
// to toggle value
table.addEventListener('click', toggleReadValue)
// bind event to save changes
saveChangesBtn.addEventListener('click', saveChanges)

// declare the functions

// to display add new item form
function displayAddBookForm(e) {
  newBookModal.style.display = 'block'
}

// to hide the modals
function hideModal(e) {
  if(e == newBookModal || e == editBookModal) {
    e.style.display = 'none'
  }else {
    let modal = e.target
    if(modal.classList.contains('modal')) {
      modal.style.display = 'none'
    }
  }
}

// to add a book to the library list
function saveBook(e) {
  e.preventDefault()
  // get all the book data
  let newBookData = [...newBookModal.querySelectorAll('.bookData')].map(item => item.value)
  // create a book element with the new data and save it in myLibrary array
  myLibrary.push(new Book(newBookData[0], newBookData[1], newBookData[2], newBookData[3], setId()))
  // set the form values to empty values
  newBookModal.querySelectorAll('.bookData').forEach(data => {
    console.log(data.classList.contains('bookData'));
    if(data.classList.contains('readed')) {
      data.value = 'no'
    } else {
      data.value = ''
    }
  })
  // hide the modal
  hideModal(newBookModal)
  updateTable(table, myLibrary)
}

// to crate a new row for the table
function createRow(bookInfo) {
  let row = document.createElement('tr')
  row.setAttribute('id', bookInfo.id)
  let title = document.createElement('td')
  title.textContent = bookInfo.title
  let author = document.createElement('td')
  author.textContent = bookInfo.author
  let pages = document.createElement('td')
  pages.textContent = bookInfo.pages
  let readed = document.createElement('td')
  readed.classList.add('readedField')
  if(bookInfo.readed == 'yes') {
    readed.classList.add('tRead')
  }
  readed.textContent = bookInfo.readed
  let actions = document.createElement('td')
  let delBtn = document.createElement('button')
  delBtn.textContent = 'delete'
  delBtn.classList.add('delBtn')
  let editBtn = document.createElement('button')
  editBtn.textContent = 'edit'
  editBtn.classList.add('editBtn')
  actions.appendChild(delBtn)
  actions.appendChild(editBtn)

  row.appendChild(title)
  row.appendChild(author)
  row.appendChild(pages)
  row.appendChild(readed)
  row.appendChild(actions)
  
  return row
}
// to clean table
function cleanTable(table) {
  table.querySelectorAll('tr').forEach(row => {
    if(!row.classList.contains('tableHeader')) {
      table.removeChild(row)
    }
  })
}
// to update table
function updateTable(table, library) {
  cleanTable(table)
  library.forEach(book => {
    let row = createRow(book)
    table.appendChild(row)
  })
}

// to do an action o the table's rows
function doAction(e) {
  let action = e.target.classList.contains('delBtn') ? 'delete' :
  e.target.classList.contains('editBtn') ? 'edit' : 'neither of the buttons was clicked'
  if(action=='delete') {
    let itemId = e.target.parentNode.parentNode.getAttribute('id')
    table.removeChild(e.target.parentNode.parentNode)
    let itemIndex = myLibrary.findIndex(item => item.id == itemId)
    myLibrary.splice(itemIndex, 1)

  } else if(action=='edit') {
    let itemId = +e.target.parentNode.parentNode.getAttribute('id')
    console.log(itemId);
    let itemToEdit = myLibrary.find(item => item.id == itemId)
    console.log(itemToEdit);
    // fill the form with the specific info
    let formEntries = editBookModal.querySelectorAll('.bookData')
    console.log(formEntries);
    formEntries.forEach(entry => {
      switch (entry.name){
        case 'editBookTitle':
          entry.value = itemToEdit.title
          break
        case 'editBookAuthor':
          entry.value = itemToEdit.author
          break
        case 'editBookPages':
          entry.value = itemToEdit.pages
          break
        case 'editWasRead':
          entry.value = itemToEdit.readed
          break
      }
    })
    editBookModal.style.display = 'block'
    bookToEditId = itemId
  }
}

// to save changes
function saveChanges(e) {
  e.preventDefault()
  let newInfo = [...editBookModal.querySelectorAll('.bookData')].map(item => item.value )
  // add the new info into a new Book object but with the same ID
  let newBook = new Book(newInfo[0], newInfo[1], newInfo[2], newInfo[3], bookToEditId)

  // remove item from book list
  let itemIndex = myLibrary.findIndex(item => item.id == bookToEditId)
  myLibrary.splice(itemIndex, 1, newBook)
  updateTable(table, myLibrary)
  hideModal(editBookModal)
}

// closure to create id
function startId() {
  let id = -1
  function updateId() {
    id++
    return id
  }
  return updateId
}

function toggleReadValue(e) {
  if (e.target.classList.contains('readedField')) {
    e.target.classList.toggle('tRead')
    let rowId = e.target.parentNode.getAttribute('id')
    if(e.target.classList.contains('tRead')) {
      e.target.textContent = 'yes'
      myLibrary.find(item => item.id == rowId).readed = 'yes'
    } else {
      e.target.textContent = 'no'
      myLibrary.find(item => item.id == rowId).readed = 'no'
    }
  }
}