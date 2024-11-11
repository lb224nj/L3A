import { BudgetAssistant } from './BudgetAssistant.js'

const app = new BudgetAssistant()
app.displayWelcomeMessage()

app.displaySelectMonthMessage()
app.displayMonthOptions()

app.selectMonth()

app.displayExpenseCategoriesOptions()
const selectedCategory = app.handleCategorieSelection()

if (selectedCategory) {
  app.displayAddExpenseMessage()
  app.promptAddExpense(selectedCategory)
}