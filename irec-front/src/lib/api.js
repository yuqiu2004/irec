const BASE_URL = '/api';

////////////////////////////////////////////////////////////
// 通用请求函数
async function request(url, { method = 'GET', data, headers = {} } = {}) {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(`${BASE_URL}${url}`, config);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Request failed: ${response.status} ${errorText}`);
  }

  return response.json();
}
////////////////////////////////////////////////////////////

// 获取所有类型
export function getGenres() {
  return request('/genre/list');
}

// 按名称搜索类型
export function getGenreByName(name) {
  return request(`/genre/${name}`);
}

// 获取某电影所有评论
export function getComments(movieId) {
  return request(`/comment/${movieId}`);
}

// 新增评论
export function postComment(movieId, userName, text) {
  return request('/comment', {
    method: 'PUT',
    data: { movieId, userName, text },
  });
}

// 分页获取电影
export function getMovies({ page = 1, pageSize = 10, type, genreName, startYear, endYear } = {}) {
  return request('/movie/page', {
    method: 'POST',
    data: { page, pageSize, type, genreName, startYear, endYear },
  });
}

// 获取电影Top10
export function getTop10() {
  return request('/movie/top10');
}

// 新增电影
export function addMovie({ title, year, cover, description, type, genres, uploadCode }) {
  return request('/movie', {
    method: 'PUT',
    data: { title, year, cover, description, type, genres, uploadCode },
  });
}

// 获取电影详情
export function getMovieDetail(id) {
  return request(`/movie/${id}`);
}

// 获取分类信息
export function getTypes() {
  return request('/type');
}