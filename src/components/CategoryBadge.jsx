import { getCategory } from '../utils/categories'

export default function CategoryBadge({ categoryId }) {
  const category = getCategory(categoryId)
  return (
    <span className="category-badge" style={{ '--badge-color': category.color }}>
      {category.label}
    </span>
  )
}
