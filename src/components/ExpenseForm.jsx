import { useState } from 'react'
import { CATEGORIES } from '../utils/categories'
import { todayIso } from '../utils/formatters'

export default function ExpenseForm({ onAdd }) {
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0].id)
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(todayIso())
  const [errors, setErrors] = useState({})

  function handleSubmit(e) {
    e.preventDefault()
    const numericAmount = Number(amount)
    const nextErrors = {}

    if (!amount || Number.isNaN(numericAmount) || numericAmount <= 0) {
      nextErrors.amount = 'Bitte einen gültigen Betrag größer als 0 eingeben.'
    }
    if (!description.trim()) {
      nextErrors.description = 'Bitte eine Beschreibung eingeben.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      return
    }

    onAdd({ amount: numericAmount, category, description, date })
    setAmount('')
    setDescription('')
    setDate(todayIso())
    setErrors({})
  }

  return (
    <form className="card expense-form" onSubmit={handleSubmit} noValidate>
      <h2>Neue Ausgabe</h2>
      <div className="form-row">
        <label htmlFor="amount">Betrag (€)</label>
        <input
          id="amount"
          type="number"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0,00"
          className={errors.amount ? 'input-invalid' : ''}
          aria-invalid={errors.amount ? 'true' : 'false'}
          aria-describedby={errors.amount ? 'amount-error' : undefined}
        />
        {errors.amount && (
          <p className="form-error" id="amount-error">
            {errors.amount}
          </p>
        )}
      </div>
      <div className="form-row">
        <label htmlFor="category">Kategorie</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <label htmlFor="description">Beschreibung</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="z. B. Wocheneinkauf"
          className={errors.description ? 'input-invalid' : ''}
          aria-invalid={errors.description ? 'true' : 'false'}
          aria-describedby={errors.description ? 'description-error' : undefined}
        />
        {errors.description && (
          <p className="form-error" id="description-error">
            {errors.description}
          </p>
        )}
      </div>
      <div className="form-row">
        <label htmlFor="date">Datum</label>
        <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <button type="submit">Ausgabe hinzufügen</button>
    </form>
  )
}
