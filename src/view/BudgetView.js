import readlineSync from 'readline-sync'
import { BudgetInsight } from '../controller/BudgetInsight.js'
import { MonthlyExpenseManager } from '../model/MonthlyExpenseManager.js'
import { MonthlyExpenseRecord } from '../model/MonthlyExpenseRecord.js'

export class BudgetView {
  constructor () {
    this.currentMonth = null
    this.monthlyExpenseManager = new MonthlyExpenseManager()
    this.budgetInsight = new BudgetInsight(this.monthlyExpenseManager)
    this.validMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    this.expenseCategories = new MonthlyExpenseRecord()
  }

  displayWelcomeMessage () {
    this.#createWelcomeMessage()
  }

  #createWelcomeMessage () {
    console.log('Welcome to the Budget View!')
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
    // Displays the month options in a numbered list.
    for (let i = 0; i < this.validMonths.length; i++) {
      console.log((i + 1) + '. ' + this.validMonths[i])
    }
  }

  selectMonth () {
    const indexOfMonth = this.#getUserMonthChoice()
    this.#validateMonthIndex(indexOfMonth)
    this.#handleMonthSelection(indexOfMonth)
  }

  #getUserMonthChoice () {
    const userChoice = readlineSync.question('Enter the number of specific month you want to select: ')
    const indexOfMonth = Number(userChoice) - 1
    this.#validateMonthIndex(indexOfMonth)
    return indexOfMonth
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
    // Checks if the selected month index is within valid range (0-11).
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
    // List available expense categories for user selection.
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
    this.#validateCategoryIndex(selectedCategory)
    const expenseAmount = this.#getExpenseAmount()
    this.#validateExpenseAmount(expenseAmount)
    this.#handleExpenseAmount(selectedCategory, expenseAmount)
  }

  #getExpenseAmount () {
    const userInput = readlineSync.question('Enter the expense amount: ')
    const expenseAmount = parseFloat(userInput)
    this.#validateExpenseAmount(expenseAmount)
    return expenseAmount
  }

  #handleExpenseAmount (category, amount) {
    this.monthlyExpenseManager.addExpenseToMonth(this.currentMonth, { category, amount })
    console.log(`Added $${amount} to ${category} for ${this.currentMonth}`)
  }

  displayBalanceForMonth () {
    const totalExpenses = this.monthlyExpenseManager.getTotalExpensesForMonth(this.currentMonth)
    this.#createBalanceMessage(totalExpenses)
  }

  #createBalanceMessage (totalExpenses) {
    console.log(`Total expenses for ${this.currentMonth}: $${totalExpenses}`)
  }

  handleCategorieSelection (needsMonth = false) {
    if (needsMonth && !this.currentMonth) {
      console.log('Select a month first.')
      return null
    }

    const categoryIndex = this.#getUserCategoryChoice()
    const categorySelected = this.#selectCategoryByIndex(categoryIndex)
    this.#displayCategorySelectionMessage(categorySelected)
    return categorySelected
  }

  #getUserCategoryChoice () {
    const userChoice = readlineSync.question('Enter the number of the specific category you want to select: ')
    const categoryIndex = Number(userChoice) - 1
    this.#validateCategoryIndex(categoryIndex)
    return categoryIndex
  }

  #selectCategoryByIndex (categoryIndex) {
    return this.#getExpenseCategories()[categoryIndex]
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

  displayTotalYearlyExpenseForCategory (category) {
    this.#validateCategoryIndex(category)

    const totalExpenses = this.budgetInsight.getTotalYearlyExpenseForCategory(category)
    console.log(`Total yearly expenses for ${category}: $${totalExpenses}`)
  }

  displayMonthlyAverageExpenseForCategory (category) {
    this.#validateCategoryIndex(category)

    const averageExpense = this.budgetInsight.getAverageMonthlyExpenseForCategory(category)
    console.log(`Average monthly expense for ${category}: $${averageExpense}`)
  }

  #validateMonthIndex (indexOfMonth) {
    if (indexOfMonth < 0 || indexOfMonth >= this.validMonths.length) {
      throw new Error('The month index is invalid. Select a valid month index.')
    }
  }

  #validateCategoryIndex (categoryIndex) {
    const categories = this.#getExpenseCategories()
    if (categoryIndex < 0 || categoryIndex >= categories.length) {
      throw new Error('The category index is invalid. Select a valid category index.')
    }
  }

  #validateExpenseAmount (amount) {
    if (isNaN(amount) || amount <= 0) {
      throw new Error('Expense amount should be a number that is not negative.')
    }
  }
}
