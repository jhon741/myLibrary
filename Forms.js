class Form {
  constructor(formElement) {
    this.formElement = formElement
  }

  static getFormValues(formElement) {
    let entries = [...formElement.querySelectorAll('.bookData')]
    return entries.map(el => el.value)
  }
  
  static fillFormValues(formElement, values) {
    let entries = [...formElement.querySelectorAll('.bookData')]
    entries[0].value = values.title
    entries[1].value = values.author
    entries[2].value = values.pages
    entries[3].value = values.readed
  }

  static cleanFormValues(formElement) {
    let entries = [...formElement.querySelectorAll('.bookData')]
    entries[0].value = ''
    entries[1].value = ''
    entries[2].value = ''
    entries[3].value = 'no'
    
  }
}

