export const USE_MOCK = false; // 切换mock/接口
export const API_BASE = USE_MOCK ? '' : 'http://localhost:8080'; // 后端基础路径，接口模式下请改成你的后端地址

import { mockMovies, mockComments } from './mockData';

// 获取所有类型
export async function getGenres() {
  if (USE_MOCK) {
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // 从mockMovies中获取所有类型
    const types = new Set()
    mockMovies.forEach(movie => {
      if (Array.isArray(movie.type)) {
        movie.type.forEach(t => types.add(t))
      } else if (movie.type) {
        types.add(movie.type)
      }
    })
    
    return Array.from(types).map(type => ({
      id: type,
      name: type
    }))
  }
  return fetch(`${API_BASE}/genre/list`).then(res => res.json());
}

// 按名称搜索类型
export async function getGenreByName(name) {
  if (USE_MOCK) {
    const typeSet = new Set();
    mockMovies.forEach(m => {
      (Array.isArray(m.type) ? m.type : [m.type]).forEach(t => {
        if (t === name) typeSet.add(t);
      });
    });
    return Array.from(typeSet).map(name => ({ name }));
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
export async function getMovies({ page = 1, pageSize = 10, mainType, typeName, year, sortBy = 'popularity' } = {}) {
  if (USE_MOCK) {
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 500))

    // 过滤电影
    let filteredMovies = [...mockMovies]
    
    // 按类型过滤
    if (mainType) {
      filteredMovies = filteredMovies.filter(movie => movie.mainType === mainType)
    }
    
    // 按题材过滤
    if (typeName) {
      filteredMovies = filteredMovies.filter(movie => 
        Array.isArray(movie.type) 
          ? movie.type.includes(typeName)
          : movie.type === typeName
      )
    }
    
    // 按年份过滤
    if (year) {
      filteredMovies = filteredMovies.filter(movie => movie.year === year)
    }
    
    // 排序
    filteredMovies.sort((a, b) => {
      if (sortBy === 'popularity') {
        return b.popularity - a.popularity
      }
      return 0
    })

    // 计算总页数
    const totalPage = Math.ceil(filteredMovies.length / pageSize)
    
    // 如果请求的页码超出范围，返回空数组
    if (page > totalPage) {
      return { movies: [], totalPage }
    }

    // 分页
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const paginatedMovies = filteredMovies.slice(start, end)

    return { movies: paginatedMovies, totalPage }
  }
  
  // 真实API调用
  return fetch(`${API_BASE}/movie/page`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ page, pageSize, mainType, typeName, year }),
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
      type: genres,
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
      genres: Array.isArray(m.type) ? m.type : [m.type],
      description: m.description,
      popularity: m.popularity,
    };
  }
  return fetch(`${API_BASE}/movie/${id}`).then(res => res.json());
} 