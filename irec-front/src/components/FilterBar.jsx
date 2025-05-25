'use client'

const mainTypes = [
  { label: '全部', value: '' },
  { label: '电影', value: 'movie' },
  { label: '番剧', value: 'bangumi' },
]
const genres = [
  { label: '全部', value: '' },
  { label: '动作', value: 'action' },
  { label: '剧情', value: 'drama' },
  { label: '喜剧', value: 'comedy' },
]

export default function FilterBar({ filters, onChange }) {
  return (
    <div className="flex flex-col gap-6 p-0">
      <div className="flex flex-col gap-1">
        <div className="text-[11px] text-gray-400 mb-1 pl-1 tracking-wide">类型</div>
        {mainTypes.map(t => (
          <button
            key={t.value}
            className={`w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition focus:outline-none
              ${filters.mainType === t.value ? 'bg-bili-blue text-white' : 'bg-transparent text-bili-blue hover:bg-bili-blue/10'}`}
            style={{border: 'none', boxShadow: 'none'}}
            onClick={() => onChange({ ...filters, mainType: t.value })}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-[11px] text-gray-400 mb-1 pl-1 tracking-wide">题材</div>
        {genres.map(g => (
          <button
            key={g.value}
            className={`w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition focus:outline-none
              ${filters.genre === g.value ? 'bg-bili-blue text-white' : 'bg-transparent text-bili-blue hover:bg-bili-blue/10'}`}
            style={{border: 'none', boxShadow: 'none'}}
            onClick={() => onChange({ ...filters, genre: g.value })}
          >
            {g.label}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-[11px] text-gray-400 mb-1 pl-1 tracking-wide">年份区间</div>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="起始年份"
            className="w-1/2 px-3 py-1.5 rounded border border-blue-100 dark:border-gray-700 focus:ring-2 focus:ring-bili-blue outline-none text-sm"
            value={filters.yearStart || ''}
            onChange={e => onChange({ ...filters, yearStart: e.target.value })}
            min="1900"
            max="2100"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            placeholder="结束年份"
            className="w-1/2 px-3 py-1.5 rounded border border-blue-100 dark:border-gray-700 focus:ring-2 focus:ring-bili-blue outline-none text-sm"
            value={filters.yearEnd || ''}
            onChange={e => onChange({ ...filters, yearEnd: e.target.value })}
            min="1900"
            max="2100"
          />
        </div>
      </div>
    </div>
  )
}
