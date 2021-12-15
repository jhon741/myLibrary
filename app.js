let library = (() => {
  let bookIdToBeEdited
    // initialize variables
  let newForm = new Form(document.querySelector('.newBookForm'))
  let editForm = new Form(document.querySelector('.editBookForm'))
  let table = new Table(document.getElementById('bookTable'))
  let appContainer = document.querySelector('.appContainer')
  let showAddBookModalBtn = appContainer.querySelector('.showAddBookModal')
  let addBookModal = appContainer.querySelector('.newBookModal')
  let saveBook = addBookModal.querySelector('input[type="submit"]')
  let editBookModal = appContainer.querySelector('.editBookModal')
  let saveEdit = editBookModal.querySelector('input[type="submit"]')

  // some starting data
  let b1 = new Book('title1', 'author1', 123, 'yes')
  let b2 = new Book('title2', 'author2', 123, 'no')
  let b3 = new Book('title3', 'author3', 123, 'yes')
  let b4 = new Book('Harry Potter','JK Rowling',125,'yes')
  let b5 = new Book('The Hobbit','Anonymous',164,'no')
  let myLibrary = [b1,b2,b3,b4,b5]
  Table.updateTable(table.tableElement, myLibrary)

  // bind events
  saveEdit.addEventListener('click', saveChanges)
  table.tableElement.addEventListener('click', doAction)
  showAddBookModalBtn.addEventListener('click', showModal)
  addBookModal.addEventListener('click', hideModal)
  editBookModal.addEventListener('click', hideModal)
  saveBook.addEventListener('click', addNewBook)

  //functions

  function saveChanges(e) {
    e.preventDefault()
    let newValues = Form.getFormValues(editForm.formElement)
    let bookToEdit = myLibrary.find(book => book.id == bookIdToBeEdited ) 
    bookToEdit.title = newValues[0]
    bookToEdit.author = newValues[1]
    bookToEdit.pages = newValues[2]
    bookToEdit.readed = newValues[3]
    editBookModal.style.display = 'none'
    Table.updateRowInfo(table.tableElement, bookIdToBeEdited, newValues)
    console.table(myLibrary)
  }

  function addNewBook(e) {
    e.preventDefault()
    let values = Form.getFormValues(newForm.formElement)
    myLibrary.push(new Book(values[0], values[1], values[2], values[3]))
    addBookModal.style.display = 'none'
    Table.addRow(table.tableElement, myLibrary[myLibrary.length -1])
    Form.cleanFormValues(newForm.formElement)
    console.table(myLibrary)
  }

  function doAction(e) {
    let rowId
    let targ = e.target
    if(targ.classList.contains('editBtn')) {
      rowId = +targ.parentNode.parentNode.getAttribute('id')
      showEditFormWithInfo(e, rowId)
    }else if(targ.classList.contains('readedField')) {
      rowId = +targ.parentNode.getAttribute('id')
      toggleReadStatus(e, rowId)
    } else if(targ.classList.contains('delBtn')) {
      rowId = +targ.parentNode.parentNode.getAttribute('id')
      deleteRow(e, rowId)
    }
  }

  function toggleReadStatus(e, rowId) {
    e.target.textContent = e.target.textContent == 'yes' ? 'no' : 'yes';
    e.target.classList.toggle('tRead')
    myLibrary.forEach(book => {
      if(book.id == rowId) {
        book.readed = e.target.textContent
      }
    })
    console.table(myLibrary)
  } 

  function deleteRow(e, rowId) {
    if(confirm('are you sure?')) {
      let index
      index = [...table.tableElement.children].findIndex(el => {
        return +el.getAttribute('id') == rowId
      })
      Table.deleteRow(table.tableElement, index)
      index = myLibrary.findIndex(el => {
        return el.id == rowId
      })
      myLibrary.splice(index, 1 )
      console.table(myLibrary)
    }
  } 

  function showEditFormWithInfo(e, rowId) {
    bookIdToBeEdited = rowId
    editBookModal.style.display = 'block'
    let values = myLibrary.find(el => el.id == rowId)
    Form.fillFormValues(editForm.formElement, values)
    console.log(`the id of the row is ${rowId}`);
  }

  function hideModal(e) {
    if(e.target.classList.contains('newBookModal')) {
      e.target.style.display = 'none'
      Form.cleanFormValues(newForm.formElement)
    } else if(e.target.classList.contains('editBookModal')) {
      e.target.style.display = 'none'
      Form.cleanFormValues(editForm.formElement)
    }
  }

  function showModal(e) {
    addBookModal.style.display = 'block'; 
  }

})()