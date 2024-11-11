import { BudgetAssistant } from './BudgetAssistant.js'

const app = new BudgetAssistant()
app.displayWelcomeMessage()
app.displaySelectMonthMessage()
app.displayMonthOptions()
app.selectMonth()