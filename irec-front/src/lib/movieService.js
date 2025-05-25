import { mockMovies } from './mockData'

export async function getMoviesByFilter(filters) {
  return mockMovies.filter((m) => {
    const matchMainType = !filters.mainType || m.mainType === filters.mainType
    const matchGenre = !filters.genre || (Array.isArray(m.genre) ? m.genre.includes(filters.genre) : m.genre === filters.genre)
    const matchYear = !filters.year || m.year === filters.year
    return matchMainType && matchGenre && matchYear
  })
}

export async function getMovieById(id) {
  return mockMovies.find((m) => m.id === id)
}
