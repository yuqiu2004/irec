export const API_BASE = 'http://localhost:8080';

// 获取所有类型
export async function getGenres() {
  return fetch(`${API_BASE}/genre/list`).then(res => res.json());
}

// 按名称搜索类型
export async function getGenreByName(name) {
  return fetch(`${API_BASE}/genre/${name}`).then(res => res.json());
}

// 获取某电影所有评论
export async function getComments(movieId) {
  return fetch(`${API_BASE}/comment/${movieId}`).then(res => res.json());
}

// 新增评论
export async function postComment(movieId, userName, text) {
  return fetch(`${API_BASE}/comment`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ movieId, userName, text }),
  }).then(res => res.json());
}

// 分页获取电影
export async function getMovies({ page = 1, pageSize = 10, mainType, typeName, year, sortBy = 'popularity' } = {}) {
  return fetch(`${API_BASE}/movie/page`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ page, pageSize, mainType, typeName, year }),
  }).then(res => res.json());
}

// 获取电影Top10
export async function getTop10() {
  return fetch(`${API_BASE}/movie/top10`).then(res => res.json());
}

// 新增电影
export async function addMovie({ title, year, cover, description, type, genres }) {
  return fetch(`${API_BASE}/movie`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, year, cover, description, type, genres }),
  }).then(res => res.json());
}

// 获取电影详情
export async function getMovieDetail(id) {
  return fetch(`${API_BASE}/movie/${id}`).then(res => res.json());
} 