'use client'

export default function MovieCard({ movie }) {
  return (
    <div className="relative group bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-blue-50 dark:border-gray-800">
      <div className="relative w-full aspect-[16/9] bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img
          src={movie.cover}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex-1 flex flex-col gap-2 p-4">
        <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 line-clamp-2 min-h-[2.5em]">{movie.title}</h3>
        <div className="flex flex-col gap-2 mt-auto">
          {/* 题材标签 */}
          <div className="flex flex-wrap gap-2">
            {movie.genres
              ? movie.genres.split(',').map(t => (
                  <span key={t} className="px-2 py-0.5 bg-bili-blue/10 text-bili-blue rounded-full text-xs font-semibold">{t}</span>
                ))
              : <span className="px-2 py-0.5 bg-bili-blue/10 text-bili-blue rounded-full text-xs font-semibold">{movie.genres}</span>
            }
          </div>
          {/* 年份标签 */}
          <div className="flex gap-2">
            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-full text-xs">{movie.year}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
