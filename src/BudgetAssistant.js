import { MonthlyExpenseRecord } from './MonthlyExpenseRecord.js'

export class BudgetAssistant {
  constructor() {
    this.currentMonth = null 
  }

  displayWelcomeMessage() {
    this.#displayMessageToUser()
  }

  #displayMessageToUser() {
    console.log('Welcome to the Budget Assistant!')
  }
}