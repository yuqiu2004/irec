'use client'

import { useEffect, useState } from 'react'
import { getMovies } from '../lib/api'
import MovieCard from '../components/MovieCard'
import FilterBar from '../components/FilterBar'
import Link from 'next/link'
import { mockMovies } from '../lib/mockData'

function ThemeToggle() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [dark])
  return (
    <button
      aria-label="切换暗色模式"
      className="ml-4 p-2 rounded-full bg-white/60 dark:bg-gray-800/60 shadow hover:bg-white/80 dark:hover:bg-gray-700 transition"
      onClick={() => setDark(d => !d)}
    >
      {dark ? (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
      ) : (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95-1.41-1.41M6.34 6.34 4.93 4.93m12.02 0-1.41 1.41M6.34 17.66l-1.41 1.41"/></svg>
      )}
    </button>
  )
}

function RankingList({ movies }) {
  const top10 = [...movies]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 10)
  return (
    <aside className="min-w-[180px] w-56 bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow p-4 flex flex-col gap-2 border border-blue-50 dark:border-gray-800">
      <div className="font-bold text-bili-blue mb-2 text-base">排行榜 TOP 10</div>
      {top10.map((movie, idx) => (
        <Link key={movie.id} href={`/movie/${movie.id}`} className="flex items-center gap-2 py-1 px-2 rounded hover:bg-bili-blue/10 transition text-sm">
          <span className={`font-bold ${idx < 3 ? 'text-pink-500' : 'text-gray-400'}`}>{idx + 1}</span>
          <span className="truncate flex-1">{movie.title}</span>
          <span className="text-xs text-gray-400">{movie.popularity}</span>
        </Link>
      ))}
    </aside>
  )
}

export default function HomePage() {
  const [movies, setMovies] = useState([])
  const [filters, setFilters] = useState({ mainType: '', genre: '' })

  useEffect(() => {
    getMovies({
      page: 1,
      pageSize: 100,
      mainType: filters.mainType,
      genreName: filters.genre,
    }).then(res => {
      let movies = [];
      if (res && res.data && Array.isArray(res.data.movies)) {
        movies = res.data.movies;
      }
      setMovies(movies);
    })
  }, [filters])

  return (
    <div className="min-h-screen bg-gradient-to-br from-bili-blue/10 via-pink-50 to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-x-hidden pt-12">
      <main className="max-w-7xl mx-auto px-4 pb-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow mb-2 flex items-center justify-center gap-2">
            <span role="img" aria-label="movie">🎬</span> IRec
          </h1>
          <div className="mx-auto w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full mb-2" />
          <p className="text-lg text-gray-500 dark:text-gray-300">这是我推的XX!</p>
        </div>
        <div className="flex gap-8 items-start">
          <aside className="min-w-max flex-shrink-0">
            <FilterBar filters={filters} onChange={setFilters} />
          </aside>
          <section className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {movies.map((movie) => (
                <Link key={movie.id} href={`/movie/${movie.id}`} className="block h-full">
                  <div className="relative group bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-blue-50 dark:border-gray-800">
                    <MovieCard movie={movie} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
          <div className="hidden lg:block ml-4">
            <RankingList movies={mockMovies} />
          </div>
        </div>
      </main>
      {/* 背景装饰 */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-200/40 dark:bg-pink-900/30 rounded-full blur-3xl z-0" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-200/40 dark:bg-blue-900/30 rounded-full blur-2xl z-0" />
      <Link href="/add" className="fixed right-8 bottom-8 z-40 w-14 h-14 flex items-center justify-center rounded-full bg-bili-blue text-white text-3xl shadow-lg hover:bg-bili-blue-dark transition group" aria-label="添加作品">
        <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" className="transition"><path d="M12 5v14M5 12h14"/></svg>
      </Link>
    </div>
  )
}
