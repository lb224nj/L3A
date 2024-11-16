import { BudgetView } from './view/BudgetView.js'
import readlineSync from 'readline-sync'

const app = new BudgetView()
app.displayWelcomeMessage()

function validateUserAction(userAction) {
  const validActions = ['1', '2', '3', '4']
  if (!validActions.includes(userAction)) {
    throw new Error('Invalid option. Select a valid option (1-4).')
  }
}

let continueApp = true

while (continueApp) {
  console.log('What do you want to do?')
  console.log('1. Add an expense to a category')
  console.log('2. View yearly total expenses for a category')
  console.log('3. View average monthly expenses for a category (based on number of months it is included in, not all 12 months)')
  console.log('4. Exit tha app')

  const userAction = readlineSync.question('Choose an option (1-4): ')
  validateUserAction(userAction)

  switch (userAction) {
    case '1': {
      app.displaySelectMonthMessage()
      app.displayMonthOptions()
      app.selectMonth()

      app.displayExpenseCategoriesOptions()
      const selectedCategoryToAddExpenseTo = app.handleCategorieSelection()
      if (selectedCategoryToAddExpenseTo) {
        app.promptAddExpense(selectedCategoryToAddExpenseTo)
        app.displayBalanceForMonth()
      }
      break
    }

    case '2': {
      app.displayExpenseCategoriesOptions()
      const selectedCategoryForTotalYearlyExpenses = app.handleCategorieSelection()
      if (selectedCategoryForTotalYearlyExpenses) {
        app.displayTotalYearlyExpenseForCategory(selectedCategoryForTotalYearlyExpenses)
      }
      break
    }

    case '3': {
      app.displayExpenseCategoriesOptions()
      const selectedCategoryForAverageMonthlyExpenses = app.handleCategorieSelection()
      if (selectedCategoryForAverageMonthlyExpenses) {
        app.displayMonthlyAverageExpenseForCategory(selectedCategoryForAverageMonthlyExpenses)
      }
      break
    }

    case '4':
      // Exit the app.
      continueApp = false
      console.log('Exiting Budget View.')
      break

    default:
      console.log('Select a valid option (1-5).')
      break
  }

}
