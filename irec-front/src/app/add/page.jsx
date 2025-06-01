'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { addMovie, getTypes } from '../../lib/api' // Corrected import path and added getTypes API

// const UPLOAD_CODE = '123456' // 不再需要在前端硬编码上传码

export default function AddMoviePage() {
  const [form, setForm] = useState({
    title: '',
    type: '',
    genre: '', // 用户输入的是逗号分隔的字符串
    year: '',
    cover: '',
    description: '',
    code: '', // 对应 uploadCode
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false) // 新增 loading 状态
  const [types, setTypes] = useState([]); // 新增 types 状态存储类型列表
  const router = useRouter()

  // 获取类型列表
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await getTypes();
        if (res && res.code === 200 && Array.isArray(res.data)) {
          // 过滤掉 value 为"全部"的选项，并设置 types 状态
          const filteredTypes = res.data.filter(t => t.value !== '全部');
          setTypes(filteredTypes);
          // 如果 form.type 还没有设置，并且过滤后的类型列表不为空，默认选中第一个
          if (!form.type && filteredTypes.length > 0) {
            setForm(f => ({ ...f, type: filteredTypes[0].key.toString() })); // 将 key 转换为字符串存储
          }
        } else {
          console.error("Failed to fetch types:", res);
          // 可以在这里设置一个错误提示或者默认类型列表
        }
      } catch (error) {
        console.error("Error fetching types:", error);
        // 可以在这里设置一个错误提示或者默认类型列表
      }
    };
    fetchTypes();
  }, []); // 只在组件挂载时运行一次

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async e => { // 将 handleSubmit 改为 async 函数
    e.preventDefault()
    setError('') // 清空之前的错误信息
    setLoading(true) // 设置 loading 状态

    // 校验题材格式
    const genresString = form.genre.trim();
    let genresArray = [];
    if (genresString) {
        genresArray = genresString.split(',').map(g => g.trim()).filter(g => g !== '');
    }

    // 简单的年份格式校验（确保是数字）
    const yearInt = parseInt(form.year);
    if (isNaN(yearInt)) {
        setError('年份必须是有效的数字');
        setLoading(false);
        return;
    }

    // 构建 MovieDTO 对象
    const movieData = {
        title: form.title,
        year: yearInt,
        cover: form.cover,
        description: form.description,
        type: parseInt(form.type), // 传递整数类型的 key 给后端
        genres: genresArray,
        uploadCode: form.code,
    };

    try {
        // 调用 addMovie API
        const response = await addMovie(movieData);
        console.log("Add Movie API Response:", response); // 添加日志

        if (response && response.code === 200) {
            alert('添加成功！');
            router.push('/'); // 重定向到首页
        } else {
            // 显示后端返回的错误信息
            setError(response ? response.message : '添加作品失败');
        }
    } catch (err) {
        console.error("Error adding movie:", err); // 添加捕获异常的日志
        setError('添加作品时发生错误');
    } finally {
        setLoading(false); // 无论成功或失败都结束 loading 状态
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-bili-blue/10 via-pink-50 to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-4">
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl p-8">
        <Link href="/" className="inline-block mb-6 text-bili-blue hover:underline">← 返回首页</Link>
        <h2 className="text-2xl font-bold mb-6 text-center text-bili-blue">添加作品</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input name="title" value={form.title} onChange={handleChange} placeholder="标题" className="w-full px-4 py-2 rounded border border-blue-100 dark:border-gray-700 focus:ring-2 focus:ring-bili-blue outline-none" required />
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">类型</label>
            <select
              id="type"
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border border-blue-100 dark:border-gray-700 focus:ring-2 focus:ring-bili-blue outline-none text-sm"
              required
            >
              {types.map(type => (
                <option key={type.key} value={type.key.toString()}>
                  {type.value}
                </option>
              ))}
            </select>
          </div>
          <input name="genre" value={form.genre} onChange={handleChange} placeholder="题材（多个用英文逗号分隔）" className="w-full px-4 py-2 rounded border border-blue-100 dark:border-gray-700 focus:ring-2 focus:ring-bili-blue outline-none" required />
          <input name="year" value={form.year} onChange={handleChange} placeholder="年份" className="w-full px-4 py-2 rounded border border-blue-100 dark:border-gray-700 focus:ring-2 focus:ring-bili-blue outline-none" required type="number" min="1900" max="2100" /> {/* 增加 type="number" 和 min/max */}
          <input name="cover" value={form.cover} onChange={handleChange} placeholder="封面图片URL" className="w-full px-4 py-2 rounded border border-blue-100 dark:border-gray-700 focus:ring-2 focus:ring-bili-blue outline-none" required type="url" /> {/* 增加 type="url" */}
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="简介" className="w-full px-4 py-2 rounded border border-blue-100 dark:border-gray-700 focus:ring-2 focus:ring-bili-blue outline-none" rows={3} required />
          <input name="code" value={form.code} onChange={handleChange} placeholder="上传码（必填）" type="password" className="w-full px-4 py-2 rounded border border-blue-100 dark:border-gray-700 focus:ring-2 focus:ring-bili-blue outline-none" required />
          {error && <div className="text-red-500 text-sm text-center">{error}</div>} {/* 错误信息居中 */}
          <button type="submit" className="w-full py-2 rounded bg-bili-blue text-white font-bold hover:bg-bili-blue-dark transition disabled:opacity-50" disabled={loading}> {/* 提交按钮在 loading 时禁用 */}
            {loading ? '提交中...' : '提交'} {/* 根据 loading 状态改变按钮文本 */}
          </button>
        </form>
      </div>
    </div>
  )
} 