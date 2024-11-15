import fs from 'fs'

export class ExpenseData {
  constructor (nameOfFile = 'data.json') {
    this.nameOfFile = nameOfFile
  }

  saveExpenseData (data) {
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
}
