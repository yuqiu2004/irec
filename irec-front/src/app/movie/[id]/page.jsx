import { getMovieById } from '../../../lib/movieService'
import { getComments } from '../../../lib/commentService'
import CommentBox from '../../../components/CommentBox'
import CommentList from '../../../components/CommentList'

export default async function MovieDetail({ params }) {
  const movie = await getMovieById(params.id)
  const comments = await getComments(params.id)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{movie.title}</h1>
      <p className="mt-2 mb-4">{movie.description}</p>
      <img src={movie.cover} alt={movie.title} className="w-full h-auto rounded" />

      <CommentBox movieId={params.id} />
      <CommentList comments={comments} />
    </div>
  )
}
