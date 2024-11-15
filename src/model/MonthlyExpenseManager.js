import { MonthlyExpenseRecord } from './MonthlyExpenseRecord.js'
import { ExpenseData } from './ExpenseData.js'

export class MonthlyExpenseManager {
  constructor () {
    this.expenseData = new ExpenseData('data.json')
    this.monthlyExpenses = this.#prepareMonthlyExpenses()
  }

  #prepareMonthlyExpenses () {
    const loadedData = this.expenseData.loadExpenseData() || {}
    return this.#transformDataToRecords(loadedData)
  }

  #transformDataToRecords (loadedData) {
    const records = {}
    for (const month in loadedData) {
      records [month] = Object.assign(new MonthlyExpenseRecord(), loadedData[month])
    }
    return records
  }

  addExpenseToMonth (month, expense) {
    const monthlyExpenseRecord = this.ensureMonthlyExpenseRecord(month)
    this.#addExpenseToRecord(monthlyExpenseRecord, expense)
    this.#saveMonthlyExpenses()
  }

  #addExpenseToRecord (record, expense) {
    record.addExpense(expense.category, expense.amount)
  }

  #saveMonthlyExpenses () {
    this.expenseData.saveExpenseData(this.monthlyExpenses)
  }

  ensureMonthlyExpenseRecord (month) {
    if (!this.#hasMonthlyExpenseRecord(month)) {
      return this.#createAndStoreMonthlyExpenseRecord(month)
    } else {
      return this.#getMonthlyExpenseRecord(month)
    }
  }

  #hasMonthlyExpenseRecord (month) {
    return Object.prototype.hasOwnProperty.call(this.monthlyExpenses, month)
  }

  #getMonthlyExpenseRecord (month) {
    return this.monthlyExpenses[month] || null
  }

  #createAndStoreMonthlyExpenseRecord (month) {
    const newMonthlyExpenseRecord = new MonthlyExpenseRecord(month)
    this.#storeMonthlyExpenseRecord(month, newMonthlyExpenseRecord)
    return newMonthlyExpenseRecord
  }

  #storeMonthlyExpenseRecord (month, record) {
    this.monthlyExpenses[month] = record
  }

  getAllMonthlyExpenseRecords () {
    return this.#retrieveAllExpenseRecords()
  }

  #retrieveAllExpenseRecords () {
    return Object.values(this.monthlyExpenses)
  }

  getTotalExpensesForMonth (month) {
    const monthlyExpenseRecord = this.#getMonthlyExpenseRecord(month)
    if (monthlyExpenseRecord) {
      return monthlyExpenseRecord.getTotalExpenses()
    } else {
      return 0
    }
  }
}
