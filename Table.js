class Table {
  constructor(tableElement) {
    this.tableElement = tableElement
  }

  static cleanTable(table) {
    let children = table.children
    while(children.length > 2) {
      table.removeChild(children[2])
    }
  }

  static updateRowInfo(table,rowId, newInfo) {
    let children = table.children
    let rowToEdit = [...children].find(row => {
      return +row.getAttribute('id') == rowId
      })
    let rowValues = rowToEdit.children
    if(rowValues[3].textContent != newInfo[3]) {
      rowValues[3].classList.toggle('tRead')
    }
    rowValues[0].textContent = newInfo[0]
    rowValues[1].textContent = newInfo[1]
    rowValues[2].textContent = newInfo[2]
    rowValues[3].textContent = newInfo[3]
    }

  static deleteRow(table, index) {
    let children = table.children
    table.removeChild(children[index])
  }

  static addRow(table, book) {
    table.appendChild(Book.getTableRow(book))
  }

  static updateTable(table, books) {
    books.forEach(book => {
      table.appendChild(Book.getTableRow(book))
    });
  }
}
