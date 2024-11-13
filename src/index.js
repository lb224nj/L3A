import { BudgetView } from './BudgetView.js'
import readlineSync from 'readline-sync'

const app = new BudgetView()
app.displayWelcomeMessage()

let continueApp = true

while (continueApp) {

app.displaySelectMonthMessage()
app.displayMonthOptions()
app.selectMonth()

let continueMonth = true

while (continueMonth) {
app.displayExpenseCategoriesOptions()
const selectedOption = app.handleCategorieSelection()

if (selectedOption) {
  const userAction = readlineSync.question('Choose action: (1): to add expense, (2): to view yearly total for a specific category, (3): to view monthly average for a specific category, you selected: ')
  
  if (userAction === '1') {
    app.promptAddExpense(selectedOption)
    app.displayBalanceForMonth()
  } else if (userAction === '2') {
    app.displayTotalYearlyExpenseForCategory(selectedOption)
  } else if (userAction === '3') {
    app.displayMonthlyAverageExpenseForCategory(selectedOption)
  } else {
    console.log('Select a valid option (1-3)')
  }
}

const userWantsToExitOrContinueMonth = readlineSync.question('Do you want to add more expenses in this month? (y/n): ')
continueMonth = userWantsToExitOrContinueMonth.toLowerCase() === 'y'
}
const userWantsToExitOrContinueApp = readlineSync.question('Do you want to switch months? (y/n): ')
continueApp = userWantsToExitOrContinueApp.toLowerCase() === 'y'

}
console.log('Exiting Budget View.')