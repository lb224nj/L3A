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

  getCategoriesOfExpenses () {
    return Object.keys(this.expenses)
  }

  addExpense (category, amount) {
    this.#validateCategory(category)
    this.#validateAmount(amount)

    this.#increaseExpense(category, amount)
    
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


  #validateCategory (category) {
    if (!category || typeof category !== 'string') {
      throw new Error('Category should be a non-empty string.')
    }
  }

  #validateAmount (amount) {
    if (typeof amount !== 'number' || amount < 0) {
      throw new Error('Amount should be a number that is not negative.')
    }
  }
}
