'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Plus, Edit3, Trash2, LogOut, ExternalLink, Calendar, BookOpen, AlertCircle, RefreshCw, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const router = useRouter();
  
  const [user, setUser] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);

  // Authenticate user & load data
  useEffect(() => {
    async function checkAuthAndLoadData() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Not authenticated, redirect to login
        router.push('/admin/login');
        return;
      }

      setUser(session.user);
      await fetchAllNews();
    }

    checkAuthAndLoadData();
  }, [router]);

  const fetchAllNews = async () => {
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setNews(data || []);
    } catch (err) {
      console.error('Error fetching admin news:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('คุณต้องการลบข่าวประชาสัมพันธ์นี้ใช่หรือไม่? การลบไม่สามารถเรียกคืนได้')) {
      return;
    }

    setDeletingId(id);
    try {
      // Fetch news item to get image and file URL if we need to clean them in the future
      const { error: deleteError } = await supabase
        .from('news')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      // Update state
      setNews(news.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Error deleting news:', err);
      alert('เกิดข้อผิดพลาดในการลบข่าว: ' + err.message);
    } finally {
      setDeletingId(null);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center font-sarabun text-slate-500">
        <Loader2 className="w-10 h-10 animate-spin text-blue-950 mb-2" />
        <span>กำลังเตรียมข้อมูลแผงควบคุมระบบหลังบ้าน...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header */}
        <div className="bg-blue-950 text-white rounded-3xl p-6 sm:p-8 border border-blue-900 shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="space-y-1">
            <span className="text-yellow-400 font-bold text-xs uppercase tracking-wider block">Admin Panel</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">ระบบจัดการข่าวและเอกสาร</h1>
            <p className="text-xs sm:text-sm text-blue-200 font-sarabun">ยินดีต้อนรับผู้ดูแลระบบ: {user?.email}</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/news/new"
              className="bg-yellow-500 hover:bg-yellow-400 text-blue-950 font-extrabold px-5 py-3 rounded-xl shadow-md transition flex items-center space-x-2 text-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>สร้างข่าวสารใหม่</span>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600/10 hover:bg-red-600 border border-red-500/20 hover:border-red-600 text-red-400 hover:text-white font-semibold px-4 py-3 rounded-xl transition flex items-center space-x-1.5 text-sm cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>ออกจากระบบ</span>
            </button>
          </div>
        </div>

        {/* Database Sync Info & Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-5 flex items-start space-x-3 font-sarabun text-xs">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* News Table/Cards */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">รายการข่าวประชาสัมพันธ์ทั้งหมด ({news.length})</h2>
            <button 
              onClick={fetchAllNews}
              className="flex items-center space-x-1 hover:text-blue-900 text-xs font-semibold text-slate-400 transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>รีเฟรชข้อมูล</span>
            </button>
          </div>

          {news.length === 0 ? (
            <div className="text-center py-20 px-4 space-y-3 font-sarabun text-slate-400">
              <BookOpen className="w-16 h-16 mx-auto stroke-1 text-slate-300" />
              <h3 className="text-base font-bold text-slate-700">ไม่มีข่าวสารในระบบฐานข้อมูล</h3>
              <p className="text-xs">กดปุ่ม "สร้างข่าวสารใหม่" ด้านบนเพื่อเพิ่มข่าวสารชิ้นแรกของคุณ</p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm font-sarabun text-slate-600">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs font-bold uppercase">
                      <th className="py-4.5 px-6">หมวดหมู่</th>
                      <th className="py-4.5 px-6 w-3/5">หัวข้อข่าว</th>
                      <th className="py-4.5 px-6">วันที่อัปเดต</th>
                      <th className="py-4.5 px-6 text-right">ดำเนินการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {news.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition">
                        <td className="py-4 px-6">
                          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                            item.category === 'ประชาสัมพันธ์' ? 'bg-blue-50 text-blue-800' :
                            item.category === 'จัดซื้อจัดจ้าง' ? 'bg-amber-50 text-amber-800' : 'bg-rose-50 text-rose-800'
                          }`}>
                            {item.category}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-semibold text-slate-900 max-w-sm truncate">
                          {item.title}
                        </td>
                        <td className="py-4 px-6 text-xs text-slate-400 flex items-center space-x-1 pt-6.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{formatDate(item.created_at)}</span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex justify-end space-x-2">
                            <Link 
                              href={`/news/${item.id}`}
                              target="_blank"
                              className="p-2 text-slate-400 hover:text-blue-900 hover:bg-blue-50 rounded-xl transition cursor-pointer"
                              title="ดูหน้าหลัก"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                            <Link
                              href={`/admin/news/${item.id}/edit`}
                              className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition cursor-pointer"
                              title="แก้ไขข่าว"
                            >
                              <Edit3 className="w-4 h-4" />
                            </Link>
                            <button
                              disabled={deletingId === item.id}
                              onClick={() => handleDelete(item.id)}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
                              title="ลบข่าว"
                            >
                              {deletingId === item.id ? (
                                <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card List View */}
              <div className="md:hidden divide-y divide-slate-50 font-sarabun">
                {news.map((item) => (
                  <div key={item.id} className="p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.category === 'ประชาสัมพันธ์' ? 'bg-blue-50 text-blue-800' :
                        item.category === 'จัดซื้อจัดจ้าง' ? 'bg-amber-50 text-amber-800' : 'bg-rose-50 text-rose-800'
                      }`}>
                        {item.category}
                      </span>
                      <span className="text-[10px] text-slate-400">{formatDate(item.created_at)}</span>
                    </div>

                    <h3 className="font-semibold text-slate-900 line-clamp-2 leading-relaxed">
                      {item.title}
                    </h3>

                    <div className="flex justify-end space-x-4 pt-2 border-t border-slate-50/50">
                      <Link 
                        href={`/news/${item.id}`}
                        target="_blank"
                        className="flex items-center space-x-1 text-slate-400 hover:text-blue-900 text-xs transition cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>ดูข่าว</span>
                      </Link>
                      <Link
                        href={`/admin/news/${item.id}/edit`}
                        className="flex items-center space-x-1 text-slate-400 hover:text-amber-600 text-xs transition cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>แก้ไข</span>
                      </Link>
                      <button
                        disabled={deletingId === item.id}
                        onClick={() => handleDelete(item.id)}
                        className="flex items-center space-x-1 text-slate-400 hover:text-red-600 text-xs transition cursor-pointer"
                      >
                        {deletingId === item.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-red-600" />
                        ) : (
                          <>
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>ลบ</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
