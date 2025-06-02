'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getMovieDetail, getComments } from '@/lib/api';
import CommentBox from '../../../components/CommentBox';
import CommentList from '../../../components/CommentList';
import Link from 'next/link';

export default function MovieDetail() {
    const params = useParams();
    const movieId = params.id;

    const [movie, setMovie] = useState(null);
    const [comments, setComments] = useState([]);
    const [movieError, setMovieError] = useState(null);
    const [commentsError, setCommentsError] = useState(null);
    const [loadingMovie, setLoadingMovie] = useState(true);
    const [loadingComments, setLoadingComments] = useState(true);

    useEffect(() => {
        setLoadingMovie(true);
        setMovieError(null);
        getMovieDetail(movieId)
            .then(res => {
                if (res && res.code === 200 && res.data) {
                    setMovie(res.data);
                } else {
                    setMovieError(res?.message || '获取电影详情失败');
                }
            })
            .catch(() => {
                setMovieError('加载电影详情时发生错误');
            })
            .finally(() => {
                setLoadingMovie(false);
            });
    }, [movieId]);

    useEffect(() => {
        setLoadingComments(true);
        setCommentsError(null);
        getComments(movieId)
            .then(res => {
                if (res && res.code === 200 && Array.isArray(res.data)) {
                    setComments(res.data);
                } else {
                    setCommentsError(res?.message || '获取评论失败');
                }
            })
            .catch(() => {
                setCommentsError('加载评论时发生错误');
            })
            .finally(() => {
                setLoadingComments(false);
            });
    }, [movieId]);

    if (loadingMovie) {
        return <div className="text-center py-10">加载中...</div>;
    }

    if (movieError) {
        return (
            <div className="max-w-4xl mx-auto p-6 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl mt-8 text-center text-red-500">
                <p>{movieError}</p>
                <Link href="/" className="mt-4 inline-block text-bili-blue hover:underline">
                    返回首页
                </Link>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="max-w-4xl mx-auto p-6 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl mt-8 text-center text-red-500">
                <p>未找到电影详情或数据异常。</p>
                <Link href="/" className="mt-4 inline-block text-bili-blue hover:underline">
                    返回首页
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl mt-8">
            <Link
                href="/"
                className="fixed left-8 top-8 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 dark:bg-gray-900/80 shadow-lg border border-blue-100 dark:border-gray-800 hover:bg-bili-blue hover:text-white transition text-bili-blue text-2xl group"
                style={{ backdropFilter: 'blur(6px)' }}
                aria-label="返回首页"
            >
                <svg
                    width="28"
                    height="28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    viewBox="0 0 24 24"
                    className="group-hover:stroke-white transition"
                >
                    <path d="M15 19l-7-7 7-7" />
                </svg>
            </Link>
            <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
                {movie.cover ? (
                    <img
                        src={movie.cover}
                        alt={movie.title || '电影海报'}
                        className="w-full md:w-64 h-80 object-cover rounded-2xl shadow-lg border-4 border-white dark:border-gray-800 transition-transform duration-300 hover:scale-105"
                    />
                ) : (
                    <div className="w-full md:w-64 h-80 bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center text-gray-500 dark:text-gray-400">
                        暂无海报
                    </div>
                )}

                <div className="flex-1 flex flex-col gap-4">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
            <span role="img" aria-label="movie">
              🎬
            </span>{' '}
                        {movie.title || '未知标题'}
                    </h1>
                    <div className="flex gap-2 text-sm">
                        {movie.genres &&
                            Array.isArray(movie.genres) &&
                            movie.genres.map((genre, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 rounded-full"
                                >
                  {genre}
                </span>
                            ))}
                        {movie.year && <span className="text-gray-400 dark:text-gray-500">{movie.year}</span>}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed border-l-4 border-blue-200 dark:border-blue-800 pl-4 mt-2">
                        {movie.description || '暂无简介'}
                    </p>
                </div>
            </div>
            <hr className="my-6 border-gray-200 dark:border-gray-700" />
            <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-300 flex items-center gap-2">
                <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                评论区
            </h2>
            <CommentBox movieId={movieId} />
            <CommentList comments={comments} />
            {commentsError && (
                <div className="text-center py-4 text-red-500 text-sm">{commentsError}</div>
            )}
        </div>
    );
}
