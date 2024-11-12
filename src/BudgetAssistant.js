import readlineSync from 'readline-sync'
import { MonthlyExpenseManager } from './MonthlyExpenseManager.js'
import { MonthlyExpenseRecord } from './MonthlyExpenseRecord.js'

export class BudgetAssistant {
  constructor () {
    this.currentMonth = null
    this.monthlyExpenseManager = new MonthlyExpenseManager()
    this.validMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    this.expenseCategories = new MonthlyExpenseRecord()
  }

  displayWelcomeMessage () {
    this.#createWelcomeMessage()
  }

  #createWelcomeMessage () {
    console.log('Welcome to the Budget Assistant!')
  }

  displaySelectMonthMessage () {
    this.#createSelectMonthMessage()
  }

  #createSelectMonthMessage () {
    console.log('Please select a month:')
  }

  displayMonthOptions () {
    this.#createMonthOptions()
  }

  #createMonthOptions () {
    for (let i = 0; i < this.validMonths.length; i++) {
      console.log((i + 1) + '. ' + this.validMonths[i])
    }
  }

  selectMonth () {
    const indexOfMonth = this.#getUserMonthChoice()
    this.#handleMonthSelection(indexOfMonth)
  }

  #getUserMonthChoice () {
    const userChoice = readlineSync.question('Enter the number of specific month you want to select: ')
    return Number(userChoice) - 1
  }

  #handleMonthSelection (indexOfMonth) {
    if (this.#isValidMonthIndex(indexOfMonth)) {
      const selectedMonth = this.validMonths[indexOfMonth]
      this.#displaySelectedMonthMessage(selectedMonth)
      this.currentMonth = selectedMonth
    } else {
      this.#displayInvalidMonthMessage()
    }
  }

  #isValidMonthIndex (indexOfMonth) {
    return indexOfMonth >= 0 && indexOfMonth < this.validMonths.length
  }

  #displaySelectedMonthMessage (month) {
    console.log(`You have selected  ${month}`)
  }

  #displayInvalidMonthMessage () {
    console.log('Invalid month selection. Please try again.')
  }

  displayExpenseCategoriesOptions () {
    this.#createExpenseCategorieOptions()
  }

  #createExpenseCategorieOptions () {
    const categories = this.#getExpenseCategories()
    console.log('Select an expense category:')
    categories.forEach((category, index) => {
      console.log(`${index + 1}. ${category}`)
    })
  }

  #getExpenseCategories () {
    return Object.keys(this.expenseCategories.expenses)
  }

  promptAddExpense (selectedCategory) {
    if (!this.#isMonthSelected()) return

    if (selectedCategory) {
      const expenseAmount = this.#getExpenseAmount()
      this.#handleExpenseAmount(selectedCategory, expenseAmount)
    }
  }

  #getExpenseAmount () {
    const expenseAmount = parseFloat(readlineSync.question('Enter the expense amount: '))
    if (isNaN(expenseAmount)) {
      console.log('Invalid expense amount. Try again.')
      return this.#getExpenseAmount()
    }
    return expenseAmount
  }

  #handleExpenseAmount (category, amount) {
    this.monthlyExpenseManager.addExpenseToMonth(this.currentMonth, { category, amount })
    console.log(`Added $${amount} to ${category} for ${this.currentMonth}`)
  }

  displayBalanceForMonth () {
    if (this.#isMonthSelected()) {
      const totalExpenses = this.monthlyExpenseManager.getTotalExpensesForMonth(this.currentMonth)
      this.#createBalanceMessage(totalExpenses)
    }
  }

  #createBalanceMessage (totalExpenses) {
    console.log(`Total expenses for ${this.currentMonth}: $${totalExpenses}`)
  }

  handleCategorieSelection () {
    if (!this.#isMonthSelected()) return

    const categoryIndex = this.#getUserCategoryChoice()
    const categorySelected = this.#selectCategoryByIndex(categoryIndex)
    this.#displayCategorySelectionMessage(categorySelected)
    return categorySelected
  }

  #isMonthSelected () {
    if (!this.currentMonth) {
      console.log('Select a month first.')
      return false
    }
    return true
  }

  #getUserCategoryChoice () {
    const userChoice = readlineSync.question('Enter the number of the specific category you want to select: ')
    return Number(userChoice) - 1
  }

  #selectCategoryByIndex (categoryIndex) {
    return this.#isValidCategoryIndex(categoryIndex) ? this.#getExpenseCategories()[categoryIndex] : null
  }

  #isValidCategoryIndex (categoryIndex) {
    const categories = this.#getExpenseCategories()
    return categoryIndex >= 0 && categoryIndex < categories.length
  }

  #displayCategorySelectionMessage (categorySelected) {
    if (categorySelected) {
      this.#createSelectedCategoryMessage(categorySelected)
    } else {
      this.#createInvalidCategoryMessage()
    }
  }

  #createSelectedCategoryMessage (categorySelected) {
    console.log('You have selected ' + categorySelected)
  }

  #createInvalidCategoryMessage () {
    console.log('Invalid category selection. Please try again.')
  }

  askUserToContinue () {
    const response = readlineSync.question('Would you like to add more expenses or switch months? (y/n): ')
    return response
  }
}
