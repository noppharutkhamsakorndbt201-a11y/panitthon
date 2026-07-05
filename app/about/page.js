'use client';

import { Award, Target, Star, History, Users, BookOpen, GraduationCap } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { label: 'ปีที่ก่อตั้ง (พ.ศ.)', value: '2500', icon: History },
    { label: 'แผนกวิชาที่เปิดสอน', value: '8 แผนก', icon: BookOpen },
    { label: 'บุคลากรทางการศึกษา', value: '100+ ท่าน', icon: Users },
    { label: 'มาตรฐานระดับสากล', value: 'ISO 9001', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <span className="text-yellow-600 font-extrabold text-sm uppercase tracking-wider block">About Us</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-950 tracking-tight">เกี่ยวกับวิทยาลัย</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base font-sarabun">
            ทำความรู้จักวิทยาลัยพณิชยการธนบุรี สถาบันอาชีวศึกษาเพื่อความก้าวหน้าและการพัฒนาวิชาชีพ
          </p>
        </div>

        {/* Philosophy, Vision, Identity Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Philosophy Card */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="p-4 bg-blue-50 text-blue-900 rounded-full">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="font-extrabold text-xl text-blue-950">ปรัชญา (Philosophy)</h2>
            <p className="text-slate-600 font-sarabun leading-relaxed">
              "ความรู้ดี ทักษะเด่น เน้นคุณธรรม นำสังคม"
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="p-4 bg-yellow-50 text-yellow-600 rounded-full">
              <Target className="w-8 h-8" />
            </div>
            <h2 className="font-extrabold text-xl text-blue-950">วิสัยทัศน์ (Vision)</h2>
            <p className="text-slate-600 font-sarabun leading-relaxed">
              "เป็นผู้นำในการจัดการอาชีวศึกษาด้านบริหารธุรกิจและเทคโนโลยีที่ทันสมัย มีมาตรฐานระดับสากล"
            </p>
          </div>

          {/* Identity Card */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full">
              <Star className="w-8 h-8" />
            </div>
            <h2 className="font-extrabold text-xl text-blue-950">อัตลักษณ์ (Identity)</h2>
            <p className="text-slate-600 font-sarabun leading-relaxed">
              "บริการประทับใจ เชี่ยวชาญเทคโนโลยี มีทักษะวิชาชีพเด่น"
            </p>
          </div>
        </div>

        {/* History / About Content */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 sm:p-12 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-blue-950 tracking-tight">ประวัติความเป็นมา</h2>
            <div className="space-y-4 text-slate-600 font-sarabun leading-relaxed text-sm sm:text-base">
              <p>
                วิทยาลัยพณิชยการธนบุรี ก่อตั้งขึ้นเพื่อมุ่งเน้นสร้างสรรค์บุคลากรที่มีความเป็นเลิศในสายวิชาชีพด้านการค้า บริการ บัญชี เลขานุการ คอมพิวเตอร์ธุรกิจ และภาษาต่างประเทศ
              </p>
              <p>
                ตลอดหลายทศวรรษที่ผ่านมา วิทยาลัยได้มุ่งมั่นพัฒนาหลักสูตร วิธีการสอน และเครื่องมือสื่อสารเทคโนโลยี เพื่อตอบสนองตลาดแรงงานทั้งในประเทศและระดับภูมิภาค สู่การขับเคลื่อนเศรษฐกิจของประเทศอย่างยั่งยืน
              </p>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden h-72 bg-gradient-to-tr from-blue-900 to-blue-950 p-8 flex flex-col justify-end text-white border-b-8 border-yellow-500">
            <GraduationCap className="w-20 h-20 text-yellow-400 absolute top-8 right-8 stroke-1 opacity-20" />
            <h3 className="text-2xl font-bold text-yellow-400">สถาบันคุณภาพ</h3>
            <p className="text-sm font-sarabun text-slate-300 mt-2">
              สร้างความพร้อมสู่การทำงานจริง ร่วมกับสถานประกอบการชั้นนำของประเทศ
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center space-y-2 hover:shadow-md transition">
                <Icon className="w-8 h-8 text-blue-900 mx-auto opacity-80" />
                <span className="block text-2xl sm:text-3xl font-extrabold text-blue-950">{stat.value}</span>
                <span className="block text-xs sm:text-sm text-slate-500 font-sarabun">{stat.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
