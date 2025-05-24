'use client'

import { useState } from 'react'
import { postComment } from '../lib/commentService'

export default function CommentBox({ movieId }) {
  const [text, setText] = useState('')

  const handleSubmit = async () => {
    if (!text.trim()) return
    await postComment(movieId, text)
    setText('')
    // 建议这里刷新评论（此处略）
  }

  return (
    <div className="mt-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="写下你的评论..."
        className="w-full border p-2 rounded"
        rows={3}
      />
      <button onClick={handleSubmit} className="mt-2 px-4 py-1 bg-blue-600 text-white rounded">
        发表评论
      </button>
    </div>
  )
}
