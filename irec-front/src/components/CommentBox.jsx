'use client'

import { useState } from 'react'
import { postComment } from '../lib/commentService'

export default function CommentBox({ movieId }) {
  const [text, setText] = useState('')
  const maxLen = 200;

  const handleSubmit = async () => {
    if (!text.trim()) return
    await postComment(movieId, text)
    setText('')
    // 建议这里刷新评论（此处略）
  }

  return (
    <div className="mt-4 bg-gray-50 dark:bg-gray-800 rounded-xl p-4 shadow">
      <div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="写下你的评论..."
          maxLength={maxLen}
          className="w-full border p-3 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 resize-none"
          rows={3}
        />
        <div className="flex justify-between items-center mt-2">
          <span className={`text-xs ${text.length === maxLen ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'}`}>{text.length}/{maxLen}</span>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-pink-500 text-white rounded-lg font-semibold shadow hover:from-blue-700 hover:to-pink-600 transition disabled:opacity-50"
            disabled={!text.trim()}
          >
            发表评论
          </button>
        </div>
      </div>
    </div>
  )
}
