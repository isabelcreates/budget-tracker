import { useEffect, useState } from 'react'

const STORAGE_KEY = 'budget-tracker-expenses'

function loadExpenses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function useExpenses() {
  const [expenses, setExpenses] = useState(loadExpenses)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  }, [expenses])

  function addExpense({ amount, category, description, date }) {
    const expense = {
      id: crypto.randomUUID(),
      amount: Number(amount),
      category,
      description: description.trim(),
      date,
    }
    setExpenses((prev) => [expense, ...prev])
  }

  function deleteExpense(id) {
    setExpenses((prev) => prev.filter((e) => e.id !== id))
  }

  return { expenses, addExpense, deleteExpense }
}
