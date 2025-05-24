'use client'

export default function FilterBar({ filters, onChange }) {
  return (
    <div className="flex gap-4">
      <select
        value={filters.genre}
        onChange={(e) => onChange({ ...filters, genre: e.target.value })}
        className="border p-2 rounded"
      >
        <option value="">全部类型</option>
        <option value="action">动作</option>
        <option value="drama">剧情</option>
        <option value="comedy">喜剧</option>
      </select>

      <select
        value={filters.year}
        onChange={(e) => onChange({ ...filters, year: e.target.value })}
        className="border p-2 rounded"
      >
        <option value="">全部年份</option>
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
      </select>
    </div>
  )
}
