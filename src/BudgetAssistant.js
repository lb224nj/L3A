import readlineSync from 'readline-sync'
import { MonthlyExpenseManager } from './MonthlyExpenseManager.js'

export class BudgetAssistant {
  constructor() {
    this.currentMonth = null
    this.monthlyExpenseManager = new MonthlyExpenseManager()
    this.validMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  }

  displayWelcomeMessage() {
    this.#createWelcomeMessage()
  }

  #createWelcomeMessage() {
    console.log('Welcome to the Budget Assistant!')
  }

  displaySelectMonthMessage() {
    this.#createSelectMonthMessage()
  }

  #createSelectMonthMessage() {
    console.log('Please select a month:')
  }

  
  displayMonthOptions() {
    this.#createMonthOptions()
  }

  #createMonthOptions() {
    for (let i = 0; i < this.validMonths.length; i++) {
      console.log((i + 1) + '. ' + this.validMonths[i])
    }
  }

  selectMonth() {
    const indexOfMonth = this.#getUserMonthChoice()
    this.#handleMonthSelection(indexOfMonth)
  }

  #getUserMonthChoice() {
      const userChoice = readlineSync.question('Enter the number of specific month you want to select: ')
      return Number(userChoice) - 1
  }

  #handleMonthSelection(indexOfMonth) {
    if (this.#isValidMonthIndex(indexOfMonth)) {
      const selectedMonth = this.validMonths[indexOfMonth]
      this.#displaySelectedMonthMessage(selectedMonth)
    } else {
      this.#displayInvalidMonthMessage()
    }
  }

  #isValidMonthIndex(indexOfMonth) {
    return indexOfMonth >= 0 && indexOfMonth < this.validMonths.length
  }

  #displaySelectedMonthMessage(month) {
    console.log('You have selected ' + month)
  }

  #displayInvalidMonthMessage() {
    console.log('Invalid month selection. Please try again.')
  }

}