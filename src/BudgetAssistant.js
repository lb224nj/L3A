import { MonthlyExpenseRecord } from './MonthlyExpenseRecord.js'

export class BudgetAssistant {
  constructor() {
    this.monthlyExpenses = {}
    this.currentMonth = null 
  }

  startApp() {
    this.#displayMessageToUser()
  }

  #displayMessageToUser() {
    console.log('Welcome to the Budget Assistant!')
  }
}