export const CATEGORIES = [
  { id: 'lebensmittel', label: 'Lebensmittel', color: '#22c55e' },
  { id: 'miete', label: 'Miete & Wohnen', color: '#3b82f6' },
  { id: 'transport', label: 'Transport', color: '#f59e0b' },
  { id: 'freizeit', label: 'Freizeit', color: '#a855f7' },
  { id: 'gesundheit', label: 'Gesundheit', color: '#ef4444' },
  { id: 'shopping', label: 'Shopping', color: '#ec4899' },
  { id: 'sonstiges', label: 'Sonstiges', color: '#64748b' },
]

export function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[CATEGORIES.length - 1]
}
