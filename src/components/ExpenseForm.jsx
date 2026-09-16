import { useState } from 'react'
import { CATEGORIES } from '../utils/categories'
import { todayIso } from '../utils/formatters'

export default function ExpenseForm({ onAdd }) {
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0].id)
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(todayIso())
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const numericAmount = Number(amount)
    if (!amount || Number.isNaN(numericAmount) || numericAmount <= 0) {
      setError('Bitte einen gültigen Betrag größer als 0 eingeben.')
      return
    }
    if (!description.trim()) {
      setError('Bitte eine Beschreibung eingeben.')
      return
    }
    onAdd({ amount: numericAmount, category, description, date })
    setAmount('')
    setDescription('')
    setDate(todayIso())
    setError('')
  }

  return (
    <form className="card expense-form" onSubmit={handleSubmit}>
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
        />
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
        />
      </div>
      <div className="form-row">
        <label htmlFor="date">Datum</label>
        <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      {error && <p className="form-error">{error}</p>}
      <button type="submit">Ausgabe hinzufügen</button>
    </form>
  )
}
