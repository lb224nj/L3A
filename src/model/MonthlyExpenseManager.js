import { MonthlyExpenseRecord } from './MonthlyExpenseRecord.js'
import { ExpenseData } from './ExpenseData.js'

export class MonthlyExpenseManager {
  constructor () {
    // Initialize with expense data stored in data.json and prepare monthly expense records.
    this.expenseData = new ExpenseData('data.json')
    this.monthlyExpenses = this.#prepareMonthlyExpenses()
  }

  #prepareMonthlyExpenses () {
    // Return an empty object if no data is loaded.
    const loadedData = this.expenseData.loadExpenseData() || {}
    return this.#transformDataToRecords(loadedData)
  }

  #transformDataToRecords (loadedData) {
    // Convert loaded data to MonthlyExpenseRecord instances for every month.
    const records = {}
    for (const month in loadedData) {
      records[month] = Object.assign(new MonthlyExpenseRecord(), loadedData[month])
    }
    return records
  }

  addExpenseToMonth (month, expense) {
    this.#validateMonth(month)
    this.#validateExpense(expense)

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
    this.#validateMonth(month)

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
    this.#validateMonth(month)

    const monthlyExpenseRecord = this.#getMonthlyExpenseRecord(month)
    if (monthlyExpenseRecord) {
      return monthlyExpenseRecord.getTotalExpenses()
    } else {
      return 0
    }
  }

  #validateMonth (month) {
    if (!month || typeof month !== 'string') {
      throw new Error('Month should be a non-empty string.')
    }
  }

  #validateExpense (expense) {
    if (
    !expense || typeof expense !== 'object' ||
    typeof expense.category !== 'string' ||
    typeof expense.amount !== 'number'
    ) {
      throw new Error('Expense should be an object with a a valid category and amount.')
  }
}
}
