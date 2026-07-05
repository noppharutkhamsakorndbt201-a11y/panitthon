'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Upload, FileText, Image as ImageIcon, CheckCircle2, Loader2, AlertCircle, Trash } from 'lucide-react';
import Link from 'next/link';

export default function EditNewsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('ประชาสัมพันธ์');
  
  // Existing files links
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [existingFileUrl, setExistingFileUrl] = useState('');

  // New files to upload
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  // Authenticate and fetch original data
  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/admin/login');
        return;
      }
      
      setAuthLoading(false);
      
      if (id) {
        await fetchNewsDetails();
      }
    }
    
    init();
  }, [id, router]);

  const fetchNewsDetails = async () => {
    setPageLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('news')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;
      
      if (data) {
        setTitle(data.title);
        setContent(data.content);
        setCategory(data.category);
        setExistingImageUrl(data.image_url || '');
        setExistingFileUrl(data.file_url || '');
      }
    } catch (err) {
      console.error('Error fetching details:', err);
      setError('ไม่สามารถโหลดข้อมูลข่าวสารได้: ' + err.message);
    } finally {
      setPageLoading(false);
    }
  };

  const uploadFileToStorage = async (file, folderName) => {
    if (!file) return null;
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${folderName}-${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error: uploadError } = await supabase.storage
      .from('news')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw new Error(`อัปโหลดไฟล์ล้มเหลว: ${uploadError.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
      .from('news')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!title.trim() || !content.trim()) {
        throw new Error('กรุณากรอกข้อมูลหัวข้อข่าวและเนื้อหาให้ครบถ้วน');
      }

      // 1. Upload cover image if a new file is chosen
      let imageUrl = existingImageUrl;
      if (imageFile) {
        imageUrl = await uploadFileToStorage(imageFile, 'images');
      }

      // 2. Upload PDF file if a new file is chosen
      let fileUrl = existingFileUrl;
      if (pdfFile) {
        fileUrl = await uploadFileToStorage(pdfFile, 'documents');
      }

      // 3. Update database
      const { error: updateError } = await supabase
        .from('news')
        .update({
          title,
          content,
          category,
          image_url: imageUrl || null,
          file_url: fileUrl || null
        })
        .eq('id', id);

      if (updateError) throw updateError;

      alert('อัปเดตข่าวประชาสัมพันธ์สำเร็จแล้ว!');
      router.push('/admin');
    } catch (err) {
      console.error('Error updating news:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || pageLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center font-sarabun text-slate-500">
        <Loader2 className="w-10 h-10 animate-spin text-blue-950 mb-2" />
        <span>กำลังเตรียมข้อมูลการแก้ไขข่าวสาร...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Back navigation */}
        <div>
          <Link 
            href="/admin" 
            className="inline-flex items-center space-x-2 text-slate-500 hover:text-blue-950 transition text-sm font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับไปยังหน้ารายการข่าว</span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 sm:p-12 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h1 className="text-2xl font-extrabold text-blue-950">แก้ไขข่าวประชาสัมพันธ์</h1>
            <p className="text-xs sm:text-sm text-slate-400 font-sarabun mt-1">สามารถทำการปรับปรุงหัวข้อข่าว หมวดหมู่ รายละเอียดเนื้อหา และไฟล์แนบภาพ/PDF</p>
          </div>

          {/* Form Error Alert */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-5 flex items-start space-x-3 font-sarabun text-xs leading-relaxed">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* News Form */}
          <form onSubmit={handleSubmit} className="space-y-6 font-sarabun">
            
            {/* Title Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">หัวข้อข่าวประชาสัมพันธ์</label>
              <input
                type="text"
                required
                placeholder="ประกาศเรื่อง..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-950 text-slate-700 bg-slate-50/50"
              />
            </div>

            {/* Category select */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">หมวดหมู่ข่าวสาร</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-950 text-slate-700 bg-slate-50/50"
              >
                <option value="ประชาสัมพันธ์">ประชาสัมพันธ์ (กิจกรรม / ข่าวทั่วไป)</option>
                <option value="จัดซื้อจัดจ้าง">ประกาศจัดซื้อจัดจ้าง</option>
                <option value="ประกาศสำคัญ">ประกาศ / ข่าววิชาการเร่งด่วน</option>
              </select>
            </div>

            {/* Content Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">เนื้อหารายละเอียดข่าว</label>
              <textarea
                required
                rows="10"
                placeholder="เขียนรายละเอียดข่าวสารของคุณที่นี่..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-950 text-slate-700 bg-slate-50/50 resize-none leading-relaxed"
              ></textarea>
            </div>

            {/* Files Upload Area */}
            <div className="grid sm:grid-cols-2 gap-6">
              
              {/* Cover Image Upload */}
              <div className="bg-slate-50 border border-dashed border-slate-200 p-5 rounded-2xl flex flex-col items-center text-center space-y-3">
                <ImageIcon className="w-8 h-8 text-slate-400" />
                <div>
                  <span className="font-bold text-slate-800 text-xs block">รูปภาพหน้าปกข่าว</span>
                  {existingImageUrl ? (
                    <div className="mt-1 space-y-1 flex flex-col items-center">
                      <span className="text-[10px] text-green-600 block">มีรูปภาพเดิมอยู่แล้ว</span>
                      <img src={existingImageUrl} className="w-16 h-12 object-cover rounded border border-slate-200" alt="Current cover" />
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-400 block font-sarabun mt-0.5">รองรับไฟล์ภาพ JPG, PNG (ไม่เกิน 5MB)</span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="text-xs w-full text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-950 file:text-white hover:file:bg-yellow-500 hover:file:text-blue-950 cursor-pointer"
                />
                {imageFile && <span className="text-[11px] text-emerald-600 font-semibold">{imageFile.name}</span>}
              </div>

              {/* PDF Document Upload */}
              <div className="bg-slate-50 border border-dashed border-slate-200 p-5 rounded-2xl flex flex-col items-center text-center space-y-3">
                <FileText className="w-8 h-8 text-slate-400" />
                <div>
                  <span className="font-bold text-slate-800 text-xs block">เอกสารแนบประกอบข่าว</span>
                  {existingFileUrl ? (
                    <div className="mt-1 flex flex-col items-center space-y-0.5">
                      <span className="text-[10px] text-green-600 font-semibold">มีเอกสารแนบเดิมอยู่แล้ว</span>
                      <span className="text-[9px] text-slate-400 truncate max-w-[150px]" title={existingFileUrl}>เอกสารปัจจุบัน (PDF)</span>
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-400 block font-sarabun mt-0.5">แนบเฉพาะไฟล์เอกสารที่เป็น PDF เท่านั้น</span>
                  )}
                </div>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                  className="text-xs w-full text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-950 file:text-white hover:file:bg-yellow-500 hover:file:text-blue-950 cursor-pointer"
                />
                {pdfFile && <span className="text-[11px] text-emerald-600 font-semibold">{pdfFile.name}</span>}
              </div>

            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
              <Link
                href="/admin"
                className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-xl transition font-semibold text-sm cursor-pointer"
              >
                ยกเลิก
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-950 hover:bg-yellow-500 hover:text-blue-950 text-white font-bold px-8 py-3 rounded-xl transition duration-300 flex items-center justify-center space-x-2 shadow-md cursor-pointer text-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4.5 h-4.5 animate-spin" />
                    <span>กำลังบันทึกการแก้ไข...</span>
                  </>
                ) : (
                  <span>อัปเดตข้อมูล</span>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
