import { MonthlyExpenseRecord } from './MonthlyExpenseRecord.js'
import { ExpenseData } from './ExpenseData.js'

export class MonthlyExpenseManager {
  constructor () {
    this.expenseData = new ExpenseData('data.json')
    const loadedData= this.expenseData.loadExpenseData() || {}

    this.monthlyExpenses = {}
    for (const month in loadedData) {
      this.monthlyExpenses[month] = Object.assign(new MonthlyExpenseRecord(), loadedData[month])
    }
  }

  addExpenseToMonth (month, expense) {
    const monthlyExpenseRecord = this.addMonthlyExpenseRecord(month)
    monthlyExpenseRecord.addExpense(expense.category, expense.amount)
    this.expenseData.saveExpenseData(this.monthlyExpenses)
  }

  addMonthlyExpenseRecord (month) {
    if (!this.#hasMonthlyExpenseRecord(month)) {
      return this.#createAndStoreMonthlyExpenseRecord(month)
    } else {
      return this.#getMonthlyExpenseRecord(month)
    }
  }

  #hasMonthlyExpenseRecord (month) {
    return this.monthlyExpenses.hasOwnProperty(month)
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
