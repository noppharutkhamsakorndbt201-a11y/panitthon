'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Lock, Mail, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // If already logged in, redirect to admin panel
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push('/admin');
      }
    });
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Successful login, redirect to dashboard
      router.push('/admin');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'รหัสผ่านหรืออีเมลไม่ถูกต้อง');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Decorative overlays */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-yellow-500/10 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"></div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        
        {/* Back Link */}
        <div>
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับหน้าหลักวิทยาลัย</span>
          </Link>
        </div>

        {/* Box Container */}
        <div className="bg-slate-950/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          
          {/* Title */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-gradient-to-tr from-yellow-500 to-amber-400 text-slate-950 rounded-2xl mx-auto flex items-center justify-center font-extrabold text-2xl shadow-lg border border-yellow-300">
              พ.ธ.
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight pt-2 text-yellow-400">ระบบควบคุมหลังบ้าน</h1>
            <p className="text-xs text-slate-400 font-sarabun">วิทยาลัยพณิชยการธนบุรี (สำหรับเจ้าหน้าที่ดูแลระบบ)</p>
          </div>

          {/* Alert Error */}
          {error && (
            <div className="bg-red-950/40 border border-red-800 text-red-300 rounded-2xl p-4 flex items-start space-x-2.5 font-sarabun text-xs leading-relaxed">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 font-sarabun">
            
            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">อีเมลผู้ใช้งาน</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-4 top-3 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="admin@panitthon.ac.th"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-slate-100 bg-slate-900 focus:bg-slate-950 transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">รหัสผ่าน</label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-4 top-3 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-slate-100 bg-slate-900 focus:bg-slate-950 transition"
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold py-3.5 rounded-xl transition duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-yellow-500/10 cursor-pointer text-sm sm:text-base"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>กำลังตรวจสอบสิทธิ์...</span>
                </>
              ) : (
                <span>เข้าสู่ระบบ</span>
              )}
            </button>
          </form>

          {/* Quick Notice */}
          <div className="text-center pt-2 font-sarabun text-[11px] text-slate-500 border-t border-slate-900/60 leading-relaxed">
            <p>หมายเหตุ: บัญชีผู้ดูแลระบบจะต้องตั้งค่าเปิดใช้งานและอนุมัติผ่าน Supabase Console</p>
          </div>

        </div>
      </div>
    </div>
  );
}
