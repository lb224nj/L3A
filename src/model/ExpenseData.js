import fs from 'fs'

export class ExpenseData {
  constructor (nameOfFile = 'data.json') {
    this.#validateFileName(nameOfFile)
    this.nameOfFile = nameOfFile
  }

  saveExpenseData (data) {
    this.#validateData(data)
    const convetedToJson = this.#convertToJson(data)
    this.#writeToFile(convetedToJson)
  }

  #convertToJson (data) {
    return JSON.stringify(data, null, 2)
  }

  #writeToFile (data) {
    // Overwrites the file if already exists.
    fs.writeFileSync(this.nameOfFile, data)
  }

  loadExpenseData () {
    if (this.#fileExists()) {
      const data = this.#readFromFile()
      return this.#convertFromJson(data)
    }
    // Return empty object if file does not exist.
    return {}
  }

  #fileExists () {
    return fs.existsSync(this.nameOfFile)
  }

  #readFromFile () {
    return fs.readFileSync(this.nameOfFile, 'utf8')
  }

  #convertFromJson (data) {
    return JSON.parse(data)
  }

  #validateFileName (nameOfFile) {
    if (!nameOfFile || typeof nameOfFile !== 'string') {
      throw new Error('File name should be a non-empty string.')
    }
  }

  #validateData (data) {
    if (data === null || typeof data !== 'object') {
      throw new Error('Data should be a non-null object.')
    }
  }
}
