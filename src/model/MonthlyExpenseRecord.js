export class MonthlyExpenseRecord {
  /**
   * Stores expenses connected to categories via objects
   */
  constructor (month) {
    this.month = month
    this.expenses = this.#createCategories()
  }

  #createCategories () {
    return {
      groceries: 0,
      utilities: 0,
      entertainment: 0,
      transportation: 0,
      clothing: 0,
      education: 0,
      healthcare: 0,
      rent: 0,
      other: 0
    }
  }

  getcategoriesOfExpenses () {
    return Object.keys(this.expenses)
  }

  addExpense (category, amount) {
    if (this.#isValidCategory(category)) {
      this.#increaseExpense(category, amount)
    }
  }

  #isValidCategory (category) {
    // Checks if the category exists in the list of categories.
    return Object.prototype.hasOwnProperty.call(this.expenses, category)
  }

  #increaseExpense (category, amount) {
    this.expenses[category] += amount
  }

  getTotalExpenses () {
    return this.#calculateTotalExpenses()
  }

  #getExpensesArray () {
    return Object.values(this.expenses)
  }

  #calculateTotalExpenses () {
    return this.#sumExpenses(this.#getExpensesArray())
  }

  #sumExpenses (expensesArray) {
    let totalExpenses = 0
    for (const expense of expensesArray) {
      totalExpenses += expense
    }
    return totalExpenses
  }
}
