'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function MovieCard({ movie }) {
  const [liked, setLiked] = useState(false)
  return (
    <div className="relative group bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-blue-50 dark:border-gray-800">
      <div className="relative w-full aspect-[16/9] bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img
          src={movie.cover}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* 评分角标 */}
        {movie.rating && (
          <span className="absolute top-2 left-2 bg-bili-blue text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
            <svg width="14" height="14" fill="currentColor" className="inline -mt-0.5 mr-1"><polygon points="7,1 8.8,5.2 13.3,5.2 9.7,8.1 11.1,12.3 7,9.9 2.9,12.3 4.3,8.1 0.7,5.2 5.2,5.2"/></svg>
            {movie.rating}
          </span>
        )}
        {/* 喜欢按钮 */}
        <button
          className={`absolute top-2 right-2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow hover:bg-pink-100 dark:hover:bg-pink-900 transition ${liked ? 'text-pink-500' : 'text-gray-400'}`}
          onClick={e => { e.stopPropagation(); setLiked(l => !l) }}
          aria-label="喜欢"
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21s-6.5-5.2-8.5-8.1C1.2 10.1 2.1 7.1 5 6.3c2.1-.6 3.7 1.1 4.5 2.1.8-1 2.4-2.7 4.5-2.1 2.9.8 3.8 3.8 1.5 6.6C18.5 15.8 12 21 12 21z"/></svg>
        </button>
      </div>
      <div className="flex-1 flex flex-col gap-2 p-4">
        <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 line-clamp-2 min-h-[2.5em]">{movie.title}</h3>
        <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 min-h-[2.5em]">{movie.description || '暂无简介'}</div>
        <div className="flex flex-wrap gap-2 mt-auto">
          {Array.isArray(movie.genre)
            ? movie.genre.map(g => (
                <span key={g} className="px-2 py-0.5 bg-bili-blue/10 text-bili-blue rounded-full text-xs font-semibold">{g}</span>
              ))
            : <span className="px-2 py-0.5 bg-bili-blue/10 text-bili-blue rounded-full text-xs font-semibold">{movie.genre}</span>
          }
          <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-full text-xs">{movie.year}</span>
        </div>
      </div>
    </div>
  )
}
