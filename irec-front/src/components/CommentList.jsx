'use client'

export default function CommentList({ comments }) {
  return (
    <div className="mt-6 space-y-2">
      {comments.map((comment) => (
        <div key={comment.id} className="border p-2 rounded">
          <div className="text-sm text-gray-600">{comment.user}</div>
          <div>{comment.text}</div>
        </div>
      ))}
    </div>
  )
}
