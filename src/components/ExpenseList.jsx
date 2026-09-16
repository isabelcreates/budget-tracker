import CategoryBadge from './CategoryBadge'
import { formatCurrency, formatDate } from '../utils/formatters'

export default function ExpenseList({ expenses, onDelete }) {
  const sorted = [...expenses].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="card expense-list">
      <h2>Alle Ausgaben</h2>
      {sorted.length === 0 ? (
        <p className="empty-state">Noch keine Ausgaben erfasst.</p>
      ) : (
        <ul>
          {sorted.map((expense) => (
            <li key={expense.id} className="expense-item">
              <div className="expense-item-main">
                <span className="expense-description">{expense.description}</span>
                <CategoryBadge categoryId={expense.category} />
              </div>
              <div className="expense-item-meta">
                <span className="expense-date">{formatDate(expense.date)}</span>
                <span className="expense-amount">{formatCurrency(expense.amount)}</span>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => onDelete(expense.id)}
                  aria-label={`Ausgabe "${expense.description}" löschen`}
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
