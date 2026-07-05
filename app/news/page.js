'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Search, Calendar, BookOpen, AlertCircle, RefreshCw } from 'lucide-react';

export default function NewsPage() {
  const [allNews, setAllNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ทั้งหมด');

  const categories = ['ทั้งหมด', 'ประชาสัมพันธ์', 'จัดซื้อจัดจ้าง', 'ประกาศ', 'ประกาศสำคัญ'];

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAllNews(data || []);
      setFilteredNews(data || []);
    } catch (err) {
      console.error('Error loading news:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Filter & Search Logic
  useEffect(() => {
    let result = [...allNews];

    // Filter by Category
    if (activeCategory !== 'ทั้งหมด') {
      result = result.filter(item => {
        if (activeCategory === 'ประกาศ') {
          return item.category === 'ประกาศ' || item.category === 'ประกาศสำคัญ';
        }
        return item.category === activeCategory;
      });
    }

    // Search by title/content
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.content.toLowerCase().includes(query)
      );
    }

    setFilteredNews(result);
  }, [searchQuery, activeCategory, allNews]);

  const getCategoryColor = (category) => {
    switch (category) {
      case 'ประชาสัมพันธ์':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'จัดซื้อจัดจ้าง':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'ประกาศ':
      case 'ประกาศสำคัญ':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-800 border-slate-200';
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
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-yellow-600 font-extrabold text-sm uppercase tracking-wider block">Announcements</span>
          <h1 className="text-4xl font-extrabold text-blue-950 tracking-tight">ข่าวประชาสัมพันธ์ทั้งหมด</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base font-sarabun">
            ติดตามประกาศข่าวการประกวดราคา จัดซื้อจัดจ้าง กิจกรรม และข่าววิชาการของวิทยาลัย
          </p>
        </div>

        {/* Search & Filters Toolbar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
          {/* Search Box */}
          <div className="relative max-w-lg mx-auto">
            <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหาชื่อข่าวหรือเนื้อหา..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent font-sarabun text-slate-700 bg-slate-50/50"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4.5 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-blue-950 text-yellow-400 shadow-md shadow-blue-950/10'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center text-sm text-slate-500 font-sarabun px-2">
          <span>พบข่าวประชาสัมพันธ์ทั้งหมด {filteredNews.length} รายการ</span>
          <button 
            onClick={fetchNews}
            className="flex items-center space-x-1 hover:text-blue-900 transition text-xs font-semibold cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>รีเฟรชข้อมูล</span>
          </button>
        </div>

        {/* News Grid */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
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
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-6 flex flex-col items-center text-center space-y-3 max-w-md mx-auto">
            <AlertCircle className="w-10 h-10 text-red-600" />
            <h3 className="font-bold text-lg">การโหลดข้อมูลขัดข้อง</h3>
            <p className="text-sm text-red-700/80 font-sarabun">{error}</p>
            <button 
              onClick={fetchNews}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
            >
              ลองใหม่อีกครั้ง
            </button>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm max-w-md mx-auto">
            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4 stroke-1" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">ไม่พบรายการข่าว</h3>
            <p className="text-sm text-slate-500 font-sarabun">ลองเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่อื่นเพื่อค้นหาอีกครั้ง</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {filteredNews.map((news) => (
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
                      <span className="text-xs">ภาพประชาสัมพันธ์</span>
                    </div>
                  )}
                </div>

                {/* Card Details */}
                <div className="p-6 flex flex-col flex-grow space-y-4">
                  <div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getCategoryColor(news.category)}`}>
                      {news.category}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-lg text-slate-900 line-clamp-2 group-hover:text-blue-900 transition-colors leading-snug">
                    {news.title}
                  </h3>
                  
                  <div className="flex items-center text-xs text-slate-400 pt-4 mt-auto border-t border-slate-50 font-sarabun">
                    <Calendar className="w-4 h-4 mr-1.5 text-slate-400" />
                    <span>{formatDate(news.created_at)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
