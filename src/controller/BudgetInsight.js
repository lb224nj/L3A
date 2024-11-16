import { MeanValueCalculations } from '../../L2M/src/calculations/meanValueCalculations.js'

export class BudgetInsight {
  constructor (MonthlyExpenseManager) {
    this.MonthlyExpenseManager = MonthlyExpenseManager
    // Performs statistical calculations related to mean values. Imported from Submodule L2M.
    this.meanValueCalculator = new MeanValueCalculations()
  }

  getTotalYearlyExpenseForCategory (category) {
    this.#validateCategory(category)
    const allMonthlyExpenses = this.MonthlyExpenseManager.getAllMonthlyExpenseRecords()
    return this.#calculateTotalExpenseForCategory(allMonthlyExpenses, category)
  }

  #calculateTotalExpenseForCategory (expenses, category) {
    this.#validateExpenses(expenses)

    let totalExpenses = 0
    // Sum  expenses for given category, defaults to 0 if category is not present.
    for (const monthlyExpense of expenses) {
      totalExpenses += monthlyExpense.expenses[category] || 0
    }
    return totalExpenses
  }

  getAverageMonthlyExpenseForCategory (category) {
    this.#validateCategory(category)
    const allMonthlyExpenses = this.#getAllMonthlyExpenses()
    const expenses = this.#getCategoryExpenses(allMonthlyExpenses, category)
    return this.meanValueCalculator.calculateMeanValue(expenses)
  }

  #getAllMonthlyExpenses () {
    const expenses = this.MonthlyExpenseManager.getAllMonthlyExpenseRecords()
    this.#validateExpenses(expenses)
    return expenses
  }

  #getCategoryExpenses (expenses, category) {
    const categoryExpenses = []
    // Get expenses for given category from each month, defaults to 0 if category is not present.
    for (const monthlyExpense of expenses) {
      categoryExpenses.push(monthlyExpense.expenses[category] || 0)
    }
    return categoryExpenses
  }

  #validateCategory (category) {
    if (!category || typeof category !== 'string') {
      throw new Error('Category is required and should be a non-empty string.')
    }
  }

  #validateExpenses (expenses) {
    if (!Array.isArray(expenses) || expenses.length === 0) {
      throw new Error('Expenses should be an array that is not empty.')
    }
  }
}
