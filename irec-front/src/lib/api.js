export const USE_MOCK = false; // 切换mock/接口
export const API_BASE = USE_MOCK ? '' : 'http://localhost:8080'; // 后端基础路径，接口模式下请改成你的后端地址

import { mockMovies, mockComments } from './mockData';

// 获取所有类型
export async function getGenres() {
  if (USE_MOCK) {
    // mockMovies的genre字段可能为数组
    const genreSet = new Set();
    mockMovies.forEach(m => {
      (Array.isArray(m.genre) ? m.genre : [m.genre]).forEach(g => genreSet.add(g));
    });
    return Array.from(genreSet).map(name => ({ name }));
  }
  return fetch(`${API_BASE}/genre/list`).then(res => res.json());
}

// 按名称搜索类型
export async function getGenreByName(name) {
  if (USE_MOCK) {
    const genreSet = new Set();
    mockMovies.forEach(m => {
      (Array.isArray(m.genre) ? m.genre : [m.genre]).forEach(g => {
        if (g === name) genreSet.add(g);
      });
    });
    return Array.from(genreSet).map(name => ({ name }));
  }
  return fetch(`${API_BASE}/genre/${name}`).then(res => res.json());
}

// 获取某电影所有评论
export async function getComments(movieId) {
  if (USE_MOCK) {
    const all = mockComments[movieId] || [];
    // mock数据字段兼容API文档
    return {
      data: all.map(c => ({
        id: c.id,
        movieId: movieId,
        userName: c.user,
        text: c.text,
      })),
      total: all.length,
    };
  }
  return fetch(`${API_BASE}/comment/${movieId}`).then(res => res.json());
}

// 新增评论
export async function postComment(movieId, userName, text) {
  if (USE_MOCK) {
    const newComment = {
      id: Date.now().toString(),
      user: userName || '匿名',
      text,
    };
    if (!mockComments[movieId]) mockComments[movieId] = [];
    mockComments[movieId].unshift(newComment);
    return { success: true };
  }
  return fetch(`${API_BASE}/comment`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ movieId, userName, text }),
  }).then(res => res.json());
}

// 分页获取电影
export async function getMovies({ id = 0, page = 1, pageSize = 10, mainType = '', genreName = '', startYear = 1900, endYear = 2100 } = {}) {
  if (USE_MOCK) {
    let list = [...mockMovies];
    if (id) list = list.filter(m => m.id === String(id));
    if (mainType) list = list.filter(m => m.mainType === mainType);
    if (genreName) list = list.filter(m => (Array.isArray(m.genre) ? m.genre.includes(genreName) : m.genre === genreName));
    if (startYear) list = list.filter(m => parseInt(m.year) >= parseInt(startYear));
    if (endYear) list = list.filter(m => parseInt(m.year) <= parseInt(endYear));
    const totalPage = Math.ceil(list.length / pageSize);
    const movies = list.slice((page - 1) * pageSize, page * pageSize).map(m => ({
      id: m.id,
      title: m.title,
      year: parseInt(m.year),
      cover: m.cover,
      mainType: m.mainType,
      type: 0, // mock类型编号
      genres: Array.isArray(m.genre) ? m.genre : [m.genre],
    }));
    return { totalPage, movies };
  }
  return fetch(`${API_BASE}/movie/page`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, page, pageSize, mainType, genreName, startYear, endYear }),
  }).then(res => res.json());
}

// 获取电影Top10
export async function getTop10() {
  if (USE_MOCK) {
    return mockMovies
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 10)
      .map(m => ({
        id: m.id,
        title: m.title,
        popularity: m.popularity,
      }));
  }
  return fetch(`${API_BASE}/movie/top10`).then(res => res.json());
}

// 新增电影
export async function addMovie({ title, year, cover, description, type, genres }) {
  if (USE_MOCK) {
    const newMovie = {
      id: Date.now().toString(),
      title,
      year,
      cover,
      description,
      mainType: type,
      genre: genres,
      popularity: 0,
    };
    mockMovies.unshift(newMovie);
    return { success: true };
  }
  return fetch(`${API_BASE}/movie`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, year, cover, description, type, genres }),
  }).then(res => res.json());
}

// 获取电影详情
export async function getMovieDetail(id) {
  if (USE_MOCK) {
    const m = mockMovies.find(m => m.id === String(id));
    if (!m) return null;
    return {
      id: m.id,
      title: m.title,
      year: parseInt(m.year),
      cover: m.cover,
      mainType: m.mainType,
      type: 0,
      genres: Array.isArray(m.genre) ? m.genre : [m.genre],
      description: m.description,
      popularity: m.popularity,
    };
  }
  return fetch(`${API_BASE}/movie/${id}`).then(res => res.json());
} 