class MonthlyExpenseRecord {
  /**
   * Stores expenses connected to categories via objects
   */
  constructor (month) {
    this.month = month
    this.expenses = {
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
  addExpense (category, amount) {
    if (this.#isValidCategory(category)) {
      this.#increaseExpense(category, amount)
    }
  }

  #isValidCategory (category) {
    return this.expenses.hasOwnProperty(category)
  }

  #increaseExpense (category, amount) {
    this.expenses[category] += amount
  }
}
