import { MeanValueCalculations } from '../../L2M/src/calculations/meanValueCalculations.js'

export class BudgetInsight {
  constructor (MonthlyExpenseManager) {
    this.MonthlyExpenseManager = MonthlyExpenseManager
    // Performs statistical calculations related to mean values. Imported from Submodule L2M.
    this.meanValueCalculator = new MeanValueCalculations()
  }

  getTotalYearlyExpenseForCategory (category) {
    const allMonthlyExpenses = this.MonthlyExpenseManager.getAllMonthlyExpenseRecords()
    return this.#calculateTotalExpenseForCategory(allMonthlyExpenses, category)
  }

  #calculateTotalExpenseForCategory (expenses, category) {
    let totalExpenses = 0
    // Sum  expenses for given category, defaults to 0 if category is not present.
    for (const monthlyExpense of expenses) {
      totalExpenses += monthlyExpense.expenses[category] || 0
    }
    return totalExpenses
  }

  getAverageMonthlyExpenseForCategory (category) {
    const allMonthlyExpenses = this.#getAllMonthlyExpenses()
    const expenses = this.#getCategoryExpenses(allMonthlyExpenses, category)
    return this.meanValueCalculator.calculateMeanValue(expenses)
  }

  #getAllMonthlyExpenses () {
    return this.MonthlyExpenseManager.getAllMonthlyExpenseRecords()
  }

  #getCategoryExpenses (expenses, category) {
    const categoryExpenses = []
    // Get expenses for given category from each month, defaults to 0 if category is not present.
    for (const monthlyExpense of expenses) {
      categoryExpenses.push(monthlyExpense.expenses[category] || 0)
    }
    return categoryExpenses
  }
}
