import { getMovieDetail, getComments } from '../../../lib/api'
import CommentBox from '../../../components/CommentBox'
import CommentList from '../../../components/CommentList'
import Link from 'next/link'

export default async function MovieDetail({ params }) {
  const movie = await getMovieDetail(params.id)
  const { data: comments } = await getComments(params.id)

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl mt-8">
      <Link
        href="/"
        className="fixed left-8 top-8 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 dark:bg-gray-900/80 shadow-lg border border-blue-100 dark:border-gray-800 hover:bg-bili-blue hover:text-white transition text-bili-blue text-2xl group"
        style={{ backdropFilter: 'blur(6px)' }}
        aria-label="返回首页"
      >
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" className="group-hover:stroke-white transition"><path d="M15 19l-7-7 7-7"/></svg>
      </Link>
      <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
        <img
          src={movie.cover}
          alt={movie.title}
          className="w-full md:w-64 h-80 object-cover rounded-2xl shadow-lg border-4 border-white dark:border-gray-800 transition-transform duration-300 hover:scale-105"
        />
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
            <span role="img" aria-label="movie">🎬</span> {movie.title}
          </h1>
          <div className="flex gap-2 text-sm">
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 rounded-full">{movie.genre}</span>
            <span className="text-gray-400 dark:text-gray-500">{movie.year}</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed border-l-4 border-blue-200 dark:border-blue-800 pl-4 mt-2">{movie.description}</p>
        </div>
      </div>
      <hr className="my-6 border-gray-200 dark:border-gray-700" />
      <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-300 flex items-center gap-2">
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        评论区
      </h2>
      <CommentBox movieId={params.id} />
      <CommentList comments={comments} />
    </div>
  )
}
