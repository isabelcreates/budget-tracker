const currencyFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
})

const dateFormatter = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

const monthFormatter = new Intl.DateTimeFormat('de-DE', {
  month: 'long',
  year: 'numeric',
})

export function formatCurrency(amount) {
  return currencyFormatter.format(amount)
}

export function formatDate(isoDate) {
  return dateFormatter.format(new Date(isoDate))
}

export function formatMonth(year, month) {
  return monthFormatter.format(new Date(year, month, 1))
}

export function todayIso() {
  return new Date().toISOString().slice(0, 10)
}
