import { MeanValueCalculations } from '../L2M/src/calculations/meanValueCalculations.js'

export class BudgetInsight {
  constructor (MonthlyExpenseManager) {
    this.MonthlyExpenseManager = MonthlyExpenseManager
    this.meanValueCalculator = new MeanValueCalculations()
  }

  getTotalYearlyExpenseForCategory (category) {
    const allMonthlyExpenses = this.MonthlyExpenseManager.getAllMonthlyExpenseRecords()
    let totalExpenses = 0

    for (const monthlyExpense of allMonthlyExpenses) {
      totalExpenses += monthlyExpense.expenses[category] || 0
    }
    return totalExpenses
  }

  getAverageMonthlyExpenseForCategory (category) {
    const allMonthlyExpenses = this.MonthlyExpenseManager.getAllMonthlyExpenseRecords()
    const expenses = []

    for (const monthlyExpense of allMonthlyExpenses) {
      expenses.push(monthlyExpense.expenses[category] || 0)
    }
    return this.meanValueCalculator.calculateMeanValue(expenses)
  }
}
