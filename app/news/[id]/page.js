'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Calendar, ArrowLeft, BookOpen, AlertCircle, FileText, Download, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    
    async function fetchNewsDetail() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setNews(data);
      } catch (err) {
        console.error('Error fetching news detail:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchNewsDetail();
  }, [id]);

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
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }) + ' น.';
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: news?.title,
        url: window.location.href,
      }).catch(err => console.log(err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('คัดลอกลิงก์ไปยังคลิปบอร์ดแล้ว!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
          <div className="h-6 bg-slate-200 rounded w-16"></div>
          <div className="h-96 bg-slate-200 rounded-3xl"></div>
          <div className="space-y-4">
            <div className="h-10 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/4"></div>
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4 flex items-center justify-center">
        <div className="bg-white border border-slate-100 rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-sm">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-xl font-bold text-slate-800">ไม่พบข่าวสารที่คุณต้องการ</h2>
          <p className="text-sm text-slate-500 font-sarabun">ข้อมูลข่าวสารนี้อาจไม่มีอยู่จริงหรือถูกลบออกไปแล้ว</p>
          <div className="pt-2">
            <Link 
              href="/news"
              className="inline-flex items-center space-x-2 bg-blue-950 hover:bg-yellow-500 hover:text-blue-950 text-white font-semibold px-6 py-3 rounded-xl text-sm transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>ย้อนกลับไปหน้าข่าวสาร</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto space-y-8">
        
        {/* Back Button */}
        <div>
          <button 
            onClick={() => router.back()} 
            className="flex items-center space-x-2 text-slate-500 hover:text-blue-950 transition text-sm font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ย้อนกลับ</span>
          </button>
        </div>

        {/* Cover Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-100 border border-slate-100 shadow-sm aspect-video max-h-[460px] flex items-center justify-center">
          {news.image_url ? (
            <img 
              src={news.image_url} 
              alt={news.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-300 space-y-2 select-none py-12">
              <BookOpen className="w-16 h-16 stroke-1" />
              <span className="text-sm text-slate-400">ข่าวประชาสัมพันธ์ วิทยาลัยพณิชยการธนบุรี</span>
            </div>
          )}
        </div>

        {/* Article Meta */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getCategoryColor(news.category)}`}>
              {news.category}
            </span>
            <div className="flex items-center text-xs text-slate-400 font-sarabun">
              <Calendar className="w-4 h-4 mr-1.5" />
              <span>{formatDate(news.created_at)}</span>
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-950 leading-tight">
            {news.title}
          </h1>

          <div className="flex justify-end">
            <button 
              onClick={handleShare}
              className="flex items-center space-x-1.5 text-xs text-slate-500 hover:text-blue-900 border border-slate-200 bg-white hover:border-blue-200 px-3 py-1.5 rounded-lg transition font-semibold cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>แชร์ข่าวนี้</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-sm">
          <div className="prose max-w-none text-slate-700 leading-relaxed font-sarabun text-base sm:text-lg whitespace-pre-wrap">
            {news.content}
          </div>
        </div>

        {/* File Attachments */}
        {news.file_url && (
          <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-3.5 bg-blue-100 text-blue-900 rounded-2xl">
                <FileText className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">เอกสารแนบข่าวสาร</h3>
                <p className="text-xs text-slate-500 font-sarabun">สามารถดาวน์โหลดเอกสารประกาศเพิ่มเติมแบบ PDF ได้ที่นี่</p>
              </div>
            </div>
            <a 
              href={news.file_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-blue-900 hover:bg-yellow-500 hover:text-blue-950 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition flex items-center justify-center space-x-2 shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>ดาวน์โหลด PDF</span>
            </a>
          </div>
        )}
      </article>
    </div>
  );
}
