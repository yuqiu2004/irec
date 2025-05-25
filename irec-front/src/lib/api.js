export const USE_MOCK = true;

import { mockMovies, mockComments } from './mockData';

// 获取热门题材
export async function getHotGenres() {
  if (USE_MOCK) {
    const genreCount = {};
    mockMovies.forEach(m => {
      (Array.isArray(m.genre) ? m.genre : [m.genre]).forEach(g => {
        genreCount[g] = (genreCount[g] || 0) + 1;
      });
    });
    return Object.entries(genreCount)
      .sort((a, b) => b[1] - a[1])
      .map(([genre]) => genre)
      .slice(0, 10);
  }
  // TODO: return fetch('/api/hot-genres').then(res => res.json());
}

// 分页获取影视列表
export async function getMovies({ page = 1, pageSize = 20, mainType, genre, yearStart, yearEnd } = {}) {
  if (USE_MOCK) {
    let list = [...mockMovies];
    if (mainType) list = list.filter(m => m.mainType === mainType);
    if (genre) list = list.filter(m => (Array.isArray(m.genre) ? m.genre.includes(genre) : m.genre === genre));
    if (yearStart) list = list.filter(m => parseInt(m.year) >= parseInt(yearStart));
    if (yearEnd) list = list.filter(m => parseInt(m.year) <= parseInt(yearEnd));
    const total = list.length;
    const data = list.slice((page - 1) * pageSize, page * pageSize);
    return { data, total };
  }
  // TODO: return fetch(`/api/movies?...`).then(res => res.json());
}

// 获取排行榜前十
export async function getTop10() {
  if (USE_MOCK) {
    return [...mockMovies].sort((a, b) => b.popularity - a.popularity).slice(0, 10);
  }
  // TODO: return fetch('/api/top10').then(res => res.json());
}

// 获取详情
export async function getMovieDetail(id) {
  if (USE_MOCK) {
    return mockMovies.find(m => m.id === id);
  }
  // TODO: return fetch(`/api/movie/${id}`).then(res => res.json());
}

// 分页获取评论
export async function getComments(movieId, { page = 1, pageSize = 10 } = {}) {
  if (USE_MOCK) {
    const all = mockComments[movieId] || [];
    return {
      data: all.slice((page - 1) * pageSize, page * pageSize),
      total: all.length,
    };
  }
  // TODO: return fetch(`/api/comments?movieId=${movieId}&page=${page}&pageSize=${pageSize}`).then(res => res.json());
}

// 发表评论
export async function postComment(movieId, text) {
  if (USE_MOCK) {
    const newComment = {
      id: Date.now().toString(),
      user: '匿名',
      text,
    };
    if (!mockComments[movieId]) mockComments[movieId] = [];
    mockComments[movieId].unshift(newComment);
    return newComment;
  }
  // TODO: return fetch(`/api/comments`, { method: 'POST', body: JSON.stringify({ movieId, text }) }).then(res => res.json());
}

// 上传接口
export async function uploadMovie(form) {
  if (USE_MOCK) {
    return { success: true, id: Date.now().toString() };
  }
  // TODO: return fetch(`/api/upload`, { method: 'POST', body: ... }).then(res => res.json());
} 