'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const UPLOAD_CODE = '123456' // 可自定义

export default function AddMoviePage() {
  const [form, setForm] = useState({
    title: '',
    type: '',
    genre: '',
    year: '',
    cover: '',
    description: '',
    code: '',
  })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    // 这里可扩展为实际上传逻辑，form.code 作为凭证传递给后端
    if (form.code !== UPLOAD_CODE) {
      setError('上传码错误')
      return
    }
    setError('')
    alert('添加成功！')
    router.push('/')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-bili-blue/10 via-pink-50 to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-4">
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl p-8">
        <Link href="/" className="inline-block mb-6 text-bili-blue hover:underline">← 返回首页</Link>
        <h2 className="text-2xl font-bold mb-6 text-center text-bili-blue">添加作品</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input name="title" value={form.title} onChange={handleChange} placeholder="标题" className="w-full px-4 py-2 rounded border border-blue-100 dark:border-gray-700 focus:ring-2 focus:ring-bili-blue outline-none" required />
          <input name="type" value={form.type} onChange={handleChange} placeholder="主类型（如 movie/bangumi）" className="w-full px-4 py-2 rounded border border-blue-100 dark:border-gray-700 focus:ring-2 focus:ring-bili-blue outline-none" required />
          <input name="genre" value={form.genre} onChange={handleChange} placeholder="题材（多个用英文逗号分隔）" className="w-full px-4 py-2 rounded border border-blue-100 dark:border-gray-700 focus:ring-2 focus:ring-bili-blue outline-none" required />
          <input name="year" value={form.year} onChange={handleChange} placeholder="年份" className="w-full px-4 py-2 rounded border border-blue-100 dark:border-gray-700 focus:ring-2 focus:ring-bili-blue outline-none" required />
          <input name="cover" value={form.cover} onChange={handleChange} placeholder="封面图片URL" className="w-full px-4 py-2 rounded border border-blue-100 dark:border-gray-700 focus:ring-2 focus:ring-bili-blue outline-none" required />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="简介" className="w-full px-4 py-2 rounded border border-blue-100 dark:border-gray-700 focus:ring-2 focus:ring-bili-blue outline-none" rows={3} required />
          <input name="code" value={form.code} onChange={handleChange} placeholder="上传码（必填）" type="password" className="w-full px-4 py-2 rounded border border-blue-100 dark:border-gray-700 focus:ring-2 focus:ring-bili-blue outline-none" required />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" className="w-full py-2 rounded bg-bili-blue text-white font-bold hover:bg-bili-blue-dark transition">提交</button>
        </form>
      </div>
    </div>
  )
} 