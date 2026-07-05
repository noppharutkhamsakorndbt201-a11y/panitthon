'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Calendar, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';

export default function NewsSection() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setNewsList(data || []);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const getCategoryColor = (category) => {
    switch (category) {
      case 'ประชาสัมพันธ์':
        return 'bg-blue-50 text-blue-800 border border-blue-200';
      case 'จัดซื้อจัดจ้าง':
        return 'bg-amber-50 text-amber-800 border border-amber-200';
      case 'ประกาศ':
      case 'ประกาศสำคัญ':
        return 'bg-rose-50 text-rose-800 border border-rose-200';
      default:
        return 'bg-slate-50 text-slate-800 border border-slate-200';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <section id="news" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Title */}
      <div className="flex justify-between items-end mb-12 border-l-4 border-blue-900 pl-4">
        <div>
          <span className="text-yellow-500 font-bold text-xs uppercase tracking-wider block mb-1">What's New</span>
          <h2 className="text-3xl font-extrabold text-blue-950 tracking-tight">ข่าวประชาสัมพันธ์</h2>
          <p className="text-slate-500 text-sm mt-1">ติดตามข่าวสาร อัปเดตกิจกรรมล่าสุดจากวิทยาลัย</p>
        </div>
        <Link 
          href="/news" 
          className="text-blue-900 font-semibold flex items-center space-x-1 hover:text-yellow-500 transition duration-300 group text-sm sm:text-base cursor-pointer"
        >
          <span>ดูข่าวทั้งหมด</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Content Grid */}
      {loading ? (
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm animate-pulse space-y-4">
              <div className="h-52 bg-slate-200"></div>
              <div className="p-6 space-y-3">
                <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-5 flex items-center space-x-3">
          <AlertCircle className="w-6 h-6 flex-shrink-0" />
          <div>
            <p className="font-semibold">ไม่สามารถเชื่อมต่อฐานข้อมูลได้</p>
            <p className="text-xs text-amber-700/80">ระบบกำลังใช้ข้อมูลจำลองชั่วคราว: {error}</p>
          </div>
        </div>
      ) : newsList.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 mb-1">ยังไม่มีข่าวประชาสัมพันธ์</h3>
          <p className="text-sm text-slate-500">เจ้าหน้าที่สามารถเพิ่มข่าวสารได้จากระบบหลังบ้าน</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {newsList.map((news) => (
            <Link 
              key={news.id} 
              href={`/news/${news.id}`}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition duration-300 flex flex-col group"
            >
              {/* Cover Image */}
              <div className="h-52 relative overflow-hidden bg-slate-100 flex items-center justify-center">
                {news.image_url ? (
                  <img 
                    src={news.image_url} 
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-400 space-y-1 select-none">
                    <BookOpen className="w-10 h-10 stroke-1" />
                    <span className="text-xs text-slate-400">ภาพประชาสัมพันธ์</span>
                  </div>
                )}
              </div>

              {/* Card Details */}
              <div className="p-6 flex flex-col flex-grow space-y-4">
                <div className="flex justify-between items-center">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getCategoryColor(news.category)}`}>
                    {news.category}
                  </span>
                </div>
                
                <h3 className="font-bold text-lg text-slate-900 line-clamp-2 group-hover:text-blue-900 transition-colors leading-snug">
                  {news.title}
                </h3>
                
                <div className="flex items-center text-xs text-slate-400 pt-4 mt-auto border-t border-slate-50">
                  <Calendar className="w-4 h-4 mr-1.5 text-slate-400" />
                  <span>{formatDate(news.created_at)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}