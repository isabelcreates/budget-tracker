import { useMemo, useState } from 'react'
import { CATEGORIES } from '../utils/categories'
import { formatCurrency, formatMonth } from '../utils/formatters'

export default function MonthlySummary({ expenses }) {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())

  const monthExpenses = useMemo(
    () =>
      expenses.filter((e) => {
        const d = new Date(e.date)
        return d.getFullYear() === year && d.getMonth() === month
      }),
    [expenses, year, month],
  )

  const total = monthExpenses.reduce((sum, e) => sum + e.amount, 0)

  const byCategory = useMemo(() => {
    const totals = new Map()
    for (const expense of monthExpenses) {
      totals.set(expense.category, (totals.get(expense.category) ?? 0) + expense.amount)
    }
    return CATEGORIES.map((c) => ({
      ...c,
      total: totals.get(c.id) ?? 0,
    }))
      .filter((c) => c.total > 0)
      .sort((a, b) => b.total - a.total)
  }, [monthExpenses])

  function shiftMonth(delta) {
    const d = new Date(year, month + delta, 1)
    setYear(d.getFullYear())
    setMonth(d.getMonth())
  }

  return (
    <div className="card monthly-summary">
      <div className="month-nav">
        <button type="button" onClick={() => shiftMonth(-1)} aria-label="Vorheriger Monat">
          ‹
        </button>
        <h2>{formatMonth(year, month)}</h2>
        <button type="button" onClick={() => shiftMonth(1)} aria-label="Nächster Monat">
          ›
        </button>
      </div>

      <p className="month-total">
        Gesamt: <strong>{formatCurrency(total)}</strong>
      </p>

      {byCategory.length === 0 ? (
        <p className="empty-state">Keine Ausgaben in diesem Monat.</p>
      ) : (
        <ul className="category-breakdown">
          {byCategory.map((c) => {
            const percent = total > 0 ? (c.total / total) * 100 : 0
            return (
              <li key={c.id} className="category-breakdown-item">
                <div className="category-breakdown-label">
                  <span>{c.label}</span>
                  <span>{formatCurrency(c.total)}</span>
                </div>
                <div className="category-bar-track">
                  <div
                    className="category-bar-fill"
                    style={{ width: `${percent}%`, backgroundColor: c.color }}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
