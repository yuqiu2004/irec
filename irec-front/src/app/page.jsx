'use client'

import { useEffect, useState } from 'react'
import { getMoviesByFilter } from '../lib/movieService'
import MovieCard from '../components/MovieCard'
import FilterBar from '../components/FilterBar'

export default function HomePage() {
  const [movies, setMovies] = useState([])
  const [filters, setFilters] = useState({ genre: '', year: '' })

  useEffect(() => {
    getMoviesByFilter(filters).then(setMovies)
  }, [filters])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">影视推荐</h1>
      <FilterBar filters={filters} onChange={setFilters} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}
