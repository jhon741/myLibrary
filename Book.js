class Book{
  static idGenerator = (function*() {
   let id = 1
   while(true) {
     yield id
     id++
   }
   })()

  constructor(title, author, pages, readed) {
    this.title = title
    this.author = author
    this.pages = pages
    this.readed = readed  
    this.id = Book.idGenerator.next().value
  }

  static getTableRow(bookInfo) {
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
}