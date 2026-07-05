'use client';

import { useState } from 'react';
import { Users, Mail, Phone, ShieldCheck } from 'lucide-react';

export default function StaffPage() {
  const [activeTab, setActiveTab] = useState('ผู้บริหาร');

  const staffCategories = ['ผู้บริหาร', 'ฝ่ายวิชาการ', 'ฝ่ายพัฒนากิจการฯ', 'ฝ่ายบริหารทรัพยากร'];

  const staffData = {
    'ผู้บริหาร': [
      { name: 'ดร.สุรพล พาณิชย์เกียรติ', role: 'ผู้อำนวยการวิทยาลัยพณิชยการธนบุรี', email: 'director@panitthon.ac.th', phone: '0-2412-2411 ต่อ 101' },
      { name: 'นายอัครเดช ทองดี', role: 'รองผู้อำนวยการฝ่ายบริหารทรัพยากร', email: 'akaradech@panitthon.ac.th', phone: '0-2412-2411 ต่อ 102' },
      { name: 'นางสาวพิมพ์ชนก รัตนอุบล', role: 'รองผู้อำนวยการฝ่ายวิชาการ', email: 'pimchanok@panitthon.ac.th', phone: '0-2412-2411 ต่อ 103' },
      { name: 'นายณัฐพงษ์ ทัศนีย์', role: 'รองผู้อำนวยการฝ่ายพัฒนากิจการนักเรียนนักศึกษา', email: 'nattapong@panitthon.ac.th', phone: '0-2412-2411 ต่อ 104' },
    ],
    'ฝ่ายวิชาการ': [
      { name: 'นางสุดาภรณ์ สมบูรณ์', role: 'หัวหน้างานพัฒนาหลักสูตรการเรียนการสอน', email: 'sudaporn@panitthon.ac.th', phone: '0-2412-2411 ต่อ 201' },
      { name: 'นายชลทิศ เกื้อกูล', role: 'หัวหน้างานวัดผลและประเมินผล', email: 'cholathit@panitthon.ac.th', phone: '0-2412-2411 ต่อ 202' },
      { name: 'นางวิภาวิน ศิริวัฒนา', role: 'หัวหน้างานวิทยบริการและห้องสมุด', email: 'wipawin@panitthon.ac.th', phone: '0-2412-2411 ต่อ 203' },
    ],
    'ฝ่ายพัฒนากิจการฯ': [
      { name: 'นายสมศักดิ์ กิจกรรม', role: 'หัวหน้างานกิจกรรมนักเรียนนักศึกษา', email: 'somsak@panitthon.ac.th', phone: '0-2412-2411 ต่อ 301' },
      { name: 'นางกนกพร เลิศวิริยะ', role: 'หัวหน้างานแนะแนวอาชีพและจัดหางาน', email: 'kanokporn@panitthon.ac.th', phone: '0-2412-2411 ต่อ 302' },
      { name: 'นายอนันต์ ศรีสมบูรณ์', role: 'หัวหน้างานปกครอง', email: 'anan@panitthon.ac.th', phone: '0-2412-2411 ต่อ 303' },
    ],
    'ฝ่ายบริหารทรัพยากร': [
      { name: 'นางประภาศรี เจริญรัตน์', role: 'หัวหน้างานการเงินและบัญชี', email: 'prapasri@panitthon.ac.th', phone: '0-2412-2411 ต่อ 401' },
      { name: 'นายวิทยา สุขวิบูลย์', role: 'หัวหน้างานพัสดุ', email: 'wittaya@panitthon.ac.th', phone: '0-2412-2411 ต่อ 402' },
      { name: 'นายเจษฎา ศรีประเสริฐ', role: 'หัวหน้างานบุคลากร', email: 'jedsada@panitthon.ac.th', phone: '0-2412-2411 ต่อ 403' },
    ]
  };

  const activeStaff = staffData[activeTab] || [];

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Page Title */}
        <div className="text-center space-y-4">
          <span className="text-yellow-600 font-extrabold text-sm uppercase tracking-wider block">Staff Directory</span>
          <h1 className="text-4xl font-extrabold text-blue-950 tracking-tight">คณะผู้บริหารและบุคลากร</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base font-sarabun">
            รายชื่อบุคลากรทางการศึกษา ผู้บริหาร และหัวหน้างานแต่ละฝ่ายของวิทยาลัยพณิชยการธนบุรี
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
          {staffCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`flex-1 min-w-[130px] px-4 py-2.5 rounded-xl text-sm font-bold transition duration-300 cursor-pointer ${
                activeTab === cat
                  ? 'bg-blue-950 text-yellow-400 shadow-md shadow-blue-950/10'
                  : 'hover:bg-slate-50 text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Staff Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {activeStaff.map((person, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col items-center text-center space-y-4 hover:shadow-lg transition group"
            >
              {/* Picture Placeholder */}
              <div className="w-28 h-28 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 relative group-hover:border-yellow-400 group-hover:bg-blue-50/20 transition-all duration-300">
                <Users className="w-12 h-12 stroke-1 group-hover:scale-110 group-hover:text-blue-900 transition-all duration-300" />
                <ShieldCheck className="w-6 h-6 text-yellow-500 absolute -bottom-1 -right-1 bg-white rounded-full p-0.5" />
              </div>

              {/* Text Info */}
              <div className="space-y-1">
                <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-blue-950 transition duration-300">{person.name}</h3>
                <p className="text-xs font-semibold px-3 py-1 bg-slate-50 text-slate-500 rounded-full inline-block border border-slate-100">
                  {person.role}
                </p>
              </div>

              {/* Contact Info */}
              <div className="w-full pt-4 border-t border-slate-50 flex flex-col items-center space-y-2 text-xs text-slate-400 font-sarabun">
                <div className="flex items-center space-x-1.5 hover:text-blue-950 cursor-pointer">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{person.email}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{person.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
