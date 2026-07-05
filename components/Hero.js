'use client';

import { ArrowRight, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-slate-950 text-white py-24 sm:py-32 px-4 overflow-hidden border-b-8 border-yellow-500">
      {/* Background Graphic Patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f1c40f_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-yellow-500/10 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"></div>

      <div className="max-w-5xl mx-auto space-y-8 relative z-10 text-center">
        <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-semibold px-4 py-2 rounded-full text-xs sm:text-sm uppercase tracking-wider">
          <GraduationCap className="w-4 h-4" />
          <span>เปิดรับสมัครนักศึกษาใหม่ ภาคเรียนที่ 1/2569</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-none space-y-2">
          <span className="block text-white">วิทยาลัยพณิชยการธนบุรี</span>
          <span className="block text-yellow-400 text-2xl sm:text-3xl md:text-5xl font-bold tracking-normal">
            Thonburi Commercial College
          </span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-sarabun font-light">
          สถาบันการอาชีวศึกษาชั้นนำ มุ่งเน้นผลิตกำลังคนด้านบริหารธุรกิจ บริการ และเทคโนโลยีสารสนเทศ ที่มีทักษะวิชาชีพเด่น เปี่ยมด้วยคุณธรรม จริยธรรม และมาตรฐานระดับสากล
        </p>
        
        <div className="pt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="#"
            className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-400 text-blue-950 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-yellow-500/20 transform hover:-translate-y-0.5 transition duration-300 text-center flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>รับสมัครนักศึกษาออนไลน์</span>
            <ArrowRight className="w-5 h-5" />
          </a>
          <Link
            href="/about"
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl transition duration-300 text-center flex items-center justify-center cursor-pointer"
          >
            <span>ทำความรู้จักวิทยาลัย</span>
          </Link>
        </div>
      </div>
    </section>
  );
}