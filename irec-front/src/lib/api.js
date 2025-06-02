const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '/api'; // 客户端使用相对路径
  if (process.env.BACKEND_URL) return process.env.BACKEND_URL; // 服务器端使用完整 URL
  return process.env.NODE_ENV === 'development' 
    ? 'http://localhost:8080' 
    : 'http://backend:8080';
};

// 获取所有类型
export async function getGenres() {
  return fetch(`${getBaseUrl()}/genre/list`).then(res => res.json());
}

// 按名称搜索类型
export async function getGenreByName(name) {
  return fetch(`${getBaseUrl()}/genre/${name}`).then(res => res.json());
}

// 获取某电影所有评论
export async function getComments(movieId) {
  return fetch(`${getBaseUrl()}/comment/${movieId}`).then(res => res.json());
}

// 新增评论
export async function postComment(movieId, userName, text) {
  return fetch(`${getBaseUrl()}/comment`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ movieId, userName, text }),
  }).then(res => res.json());
}

// 分页获取电影
export async function getMovies({ page = 1, pageSize = 10, type, genreName, startYear, endYear } = {}) {
  return fetch(`${getBaseUrl()}/movie/page`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ page, pageSize, type, genreName, startYear, endYear }),
  }).then(res => res.json());
}

// 获取电影Top10
export async function getTop10() {
  return fetch(`${getBaseUrl()}/movie/top10`).then(res => res.json());
}

// 新增电影
export async function addMovie({ title, year, cover, description, type, genres, uploadCode }) {
  return fetch(`${getBaseUrl()}/movie`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, year, cover, description, type, genres, uploadCode }),
  }).then(res => res.json());
}

// 获取电影详情
export async function getMovieDetail(id) {
  return fetch(`${getBaseUrl()}/movie/${id}`).then(res => res.json());
}

// 获取分类信息
export async function getTypes() {
  return fetch(`${getBaseUrl()}/type`).then(res => res.json());
}