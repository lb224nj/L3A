import { MonthlyExpenseRecord } from './MonthlyExpenseRecordd.js'

export class MonthlyExpenseManager {
  constructor() {
    this.monthlyExpenses = {}
  }

  getOrAddMonthlyExpenseRecord (month) {
    if (this.#hasMonthlyExpenseRecord(month)) {
      return this.#getMonthlyExpenseRecord(month)
    } else {
      return this.#addMonthlyExpenseRecord(month)
    }
  }

  #hasMonthlyExpenseRecord (month) {
    return this.monthlyExpenses.hasOwnProperty(month)
  }

  #getMonthlyExpenseRecord (month) {
    return this.monthlyExpenses[month] || null
  }

  #addMonthlyExpenseRecord (month) {
    const newRecord = new MonthlyExpenseRecord(month)
    this.#storeMonthlyExpenseRecord(month, newRecord)
    return newRecord
  }

  #storeMonthlyExpenseRecord (month, record) {
    this.monthlyExpenses[month] = record
  }
}