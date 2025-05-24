import { mockMovies } from './mockData'

export async function getMoviesByFilter(filters) {
  return mockMovies.filter((m) => {
    const matchGenre = !filters.genre || m.genre === filters.genre
    const matchYear = !filters.year || m.year === filters.year
    return matchGenre && matchYear
  })
}

export async function getMovieById(id) {
  return mockMovies.find((m) => m.id === id)
}
