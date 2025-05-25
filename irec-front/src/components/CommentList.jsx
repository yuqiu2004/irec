'use client'

export default function CommentList({ comments }) {
  return (
    <div className="mt-4 space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="border rounded-xl p-4 bg-white dark:bg-gray-900 shadow flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{comment.user}</span>
            {/* 可扩展：时间 */}
            {comment.time && <span className="text-xs text-gray-400 ml-2">{comment.time}</span>}
          </div>
          <div className="text-gray-800 dark:text-gray-100 text-base">{comment.text}</div>
          {/* 可扩展：点赞按钮等 */}
        </div>
      ))}
    </div>
  )
}
