'use client'

import Link from 'next/link'

export default function MovieCard({ movie }) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="border rounded p-2 hover:shadow">
        <img src={movie.cover} alt={movie.title} className="w-full h-48 object-cover rounded" />
        <h3 className="text-lg font-semibold mt-2">{movie.title}</h3>
      </div>
    </Link>
  )
}
