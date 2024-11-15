import { MeanValueCalculations } from '../../L2M/src/calculations/meanValueCalculations.js'

export class BudgetInsight {
  constructor (MonthlyExpenseManager) {
    this.MonthlyExpenseManager = MonthlyExpenseManager
    this.meanValueCalculator = new MeanValueCalculations()
  }

  getTotalYearlyExpenseForCategory (category) {
    const allMonthlyExpenses = this.MonthlyExpenseManager.getAllMonthlyExpenseRecords()
    return this.#calculateTotalExpenseForCategory(allMonthlyExpenses, category)
  }

  #calculateTotalExpenseForCategory (expenses, category) {
    let totalExpenses = 0
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
    for (const monthlyExpense of expenses) {
      categoryExpenses.push(monthlyExpense.expenses[category] || 0)
    }
    return categoryExpenses
  }
}
