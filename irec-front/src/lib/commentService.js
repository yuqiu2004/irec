import { mockComments } from './mockData'

export async function getComments(movieId) {
  return mockComments[movieId] || []
}

export async function postComment(movieId, text) {
  // 模拟延迟和返回
  const newComment = {
    id: Date.now().toString(),
    user: '匿名',
    text,
  }
  if (!mockComments[movieId]) {
    mockComments[movieId] = []
  }
  mockComments[movieId].unshift(newComment)
  return newComment
}
