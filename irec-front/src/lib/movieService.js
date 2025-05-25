import { mockMovies } from './mockData'

export async function getMoviesByFilter(filters) {
  return mockMovies.filter((m) => {
    const matchMainType = !filters.mainType || m.mainType === filters.mainType
    const matchGenre = !filters.genre || (Array.isArray(m.genre) ? m.genre.includes(filters.genre) : m.genre === filters.genre)
    // 年份区间筛选
    const year = parseInt(m.year, 10)
    const yearStart = filters.yearStart ? parseInt(filters.yearStart, 10) : null
    const yearEnd = filters.yearEnd ? parseInt(filters.yearEnd, 10) : null
    let matchYear = true
    if (yearStart && yearEnd) {
      matchYear = year >= yearStart && year <= yearEnd
    } else if (yearStart) {
      matchYear = year >= yearStart
    } else if (yearEnd) {
      matchYear = year <= yearEnd
    }
    return matchMainType && matchGenre && matchYear
  })
}

export async function getMovieById(id) {
  return mockMovies.find((m) => m.id === id)
}
