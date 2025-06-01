'use client'

import { useEffect, useState } from 'react'
import { getGenres, getTypes } from '../lib/api'

export default function FilterBar({ filters, onChange }) {
  const [genres, setGenres] = useState([])
  const [types, setTypes] = useState([])
  const [yearError, setYearError] = useState('')

  const validateYearRange = (start, end) => {
    if (!start || !end) return true;
    const startYear = parseInt(start);
    const endYear = parseInt(end);
    if (isNaN(startYear) || isNaN(endYear)) return false;
    if (startYear < 1900 || endYear > 2100) return false;
    if (startYear > endYear) return false;
    return true;
  };

  const handleYearChange = (field, value) => {
    if (filters[field] !== value) {
      const newFilters = { ...filters, [field]: value };
      if (field === 'startYear' || field === 'endYear') {
        if (!validateYearRange(newFilters.startYear, newFilters.endYear)) {
          setYearError('年份范围无效，请检查输入');
        } else {
          setYearError('');
        }
      }
      onChange(newFilters);
    }
  };

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await getTypes();
        const typesList = res.data;
        if (typesList && typesList.length > 0) {
          setTypes(typesList);
        } else {
          setTypes([{ key: 0, value: '全部' }, { key: 1, value: '电影' }]);
        }
      } catch (error) {
        console.error("Error fetching type:", error);
        setTypes([{ key: 0, value: '全部' }, { key: 1, value: '电影' }]);
      }
    }
    fetchTypes();
  }, []);

  useEffect(() => {
    if (types && types.length > 0 && filters.type === '') {
    } else if (types && types.length > 0 && !filters.type) {
      onChange({ ...filters, type: '' });
    }
  }, [types, filters.type, onChange, filters]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await getGenres();
        const genreList = response.data;
        const genresWithAll = [
          { label: '全部', value: '' },
          ...genreList.map(g => ({ label: g.name, value: g.name }))
        ];
        setGenres(genresWithAll);
        if (!filters.genre) {
          onChange({ ...filters, genre: '' });
        }
      } catch (error) {
        console.error("Error fetching genres:", error);
        setGenres([{ label: '全部', value: '' }]);
        if (!filters.genre) {
          onChange({ ...filters, genre: '' });
        }
      }
    };
    fetchGenres();
  }, []);

  return (
    <div className="flex flex-col gap-6 p-0">
      <div className="flex flex-col gap-1">
        <div className="text-[11px] text-gray-400 mb-1 pl-1 tracking-wide">类型</div>
        {types.map(t => (
          <button
            key={t.key}
            className={`w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition focus:outline-none
              ${filters.type === (t.value === '全部' ? '' : t.value) ? 'bg-bili-blue text-white' : 'bg-transparent text-bili-blue hover:bg-bili-blue/10'}`}
            style={{border: 'none', boxShadow: 'none'}}
            onClick={() => {
              const newType = t.value === '全部' ? '' : t.key;
              if (filters.type !== newType) {
                onChange({ ...filters, type: newType });
              }
            }}
          >
            {t.value}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-[11px] text-gray-400 mb-1 pl-1 tracking-wide">题材</div>
        {genres.map(g => (
          <button
            key={g.value}
            className={`w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition focus:outline-none
              ${filters.genreName === g.value ? 'bg-bili-blue text-white' : 'bg-transparent text-bili-blue hover:bg-bili-blue/10'}`}
            style={{border: 'none', boxShadow: 'none'}}
            onClick={() => {
              if (filters.genreName !== g.value) {
                onChange({ ...filters, genreName: g.value });
              }
            }}
          >
            {g.label}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-[11px] text-gray-400 mb-1 pl-1 tracking-wide">年份区间</div>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="起始年份"
            className={`w-1/2 px-3 py-1.5 rounded border ${yearError ? 'border-red-500' : 'border-blue-100 dark:border-gray-700'} focus:ring-2 focus:ring-bili-blue outline-none text-sm`}
            value={filters.startYear || ''}
            onChange={e => handleYearChange('startYear', e.target.value)}
            min="1900"
            max="2100"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            placeholder="结束年份"
            className={`w-1/2 px-3 py-1.5 rounded border ${yearError ? 'border-red-500' : 'border-blue-100 dark:border-gray-700'} focus:ring-2 focus:ring-bili-blue outline-none text-sm`}
            value={filters.endYear || ''}
            onChange={e => handleYearChange('endYear', e.target.value)}
            min="1900"
            max="2100"
          />
        </div>
        {yearError && <div className="text-red-500 text-xs mt-1">{yearError}</div>}
      </div>
    </div>
  )
}
