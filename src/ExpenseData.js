import fs from 'fs'

 export class ExpenseData {
  constructor(nameOfFile = 'data.json') {
    this.nameOfFile = nameOfFile
  }

  saveData (data) {
    fs.writeFileSync(this.nameOfFile, JSON.stringify(data, null, 2))
  }

  loadData () {
    if (fs.existsSync(this.nameOfFile)) {
      const data = fs.readFileSync(this.nameOfFile, 'utf8')
      return JSON.parse(data)
    }
    return {}
  }
 }