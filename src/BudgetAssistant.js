import { MonthlyExpenseRecord } from './MonthlyExpenseRecord.js'
import { MonthlyExpenseManager } from './MonthlyExpenseManager.js'

export class BudgetAssistant {
  constructor() {
    this.currentMonth = null
    this.monthlyExpenseManager = new MonthlyExpenseManager()
    this.validMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  }

  displayWelcomeMessage() {
    this.#displayMessageToUser()
  }

  #displayMessageToUser() {
    console.log('Welcome to the Budget Assistant!')
  }
}