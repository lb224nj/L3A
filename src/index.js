import { BudgetAssistant } from './BudgetAssistant.js'

const app = new BudgetAssistant()
app.displayWelcomeMessage()

let continueApp = true
while (continueApp) {

app.displaySelectMonthMessage()
app.displayMonthOptions()
app.selectMonth()

app.displayExpenseCategoriesOptions()
const selectedCategory = app.handleCategorieSelection()

if (selectedCategory) {
  app.promptAddExpense(selectedCategory)
  app.displayBalanceForMonth()
}

const continueResponse = app.askUserToContinue()
continueApp = continueResponse.toLowerCase() === 'y'
}
console.log('Exiting Budget Assistant.')