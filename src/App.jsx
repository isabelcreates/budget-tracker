import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import MonthlySummary from './components/MonthlySummary'
import { useExpenses } from './hooks/useExpenses'
import './App.css'

export default function App() {
  const { expenses, addExpense, deleteExpense } = useExpenses()

  return (
    <div className="app">
      <header className="app-header">
        <h1>
          <span aria-hidden="true">💰</span> Budget Tracker
        </h1>
      </header>
      <main className="app-grid">
        <div className="app-column">
          <ExpenseForm onAdd={addExpense} />
          <MonthlySummary expenses={expenses} />
        </div>
        <div className="app-column">
          <ExpenseList expenses={expenses} onDelete={deleteExpense} />
        </div>
      </main>
    </div>
  )
}
