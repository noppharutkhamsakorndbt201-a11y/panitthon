'use client';

import { FileSpreadsheet, Globe, Library, CheckCircle2 } from 'lucide-react';

export default function InfoSystems() {
  const systems = [
    { name: "ระบบ ศธ.02 ออนไลน์", icon: FileSpreadsheet, link: "#", desc: "ตรวจสอบผลการเรียนและแผนการเรียน" },
    { name: "ห้องเรียนออนไลน์ (RMS)", icon: Globe, link: "#", desc: "ระบบบริหารจัดการสถานศึกษาและชั้นเรียน" },
    { name: "ห้องสมุดอิเล็กทรอนิกส์", icon: Library, link: "#", desc: "คลังความรู้ ดิจิทัลสำหรับนักศึกษา" },
    { name: "ระบบประกันคุณภาพ", icon: CheckCircle2, link: "#", desc: "ประกันคุณภาพการศึกษาและมาตรฐานอาชีวศึกษา" },
  ];

  return (
    <section className="bg-blue-50/50 py-16 border-y border-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-yellow-600 font-bold text-xs uppercase tracking-wider block">Portals</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950">ทางลัดระบบสารสนเทศ</h2>
          <p className="text-slate-500 text-xs sm:text-sm">เข้าถึงบริการข้อมูลสารสนเทศที่เกี่ยวข้องของวิทยาลัยอย่างสะดวกรวดเร็ว</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {systems.map((sys, idx) => {
            const Icon = sys.icon;
            return (
              <a 
                key={idx} 
                href={sys.link} 
                className="bg-white p-6 rounded-2xl border border-blue-100 flex flex-col items-center justify-center text-center space-y-3 hover:bg-yellow-500 hover:text-blue-950 transition duration-300 group shadow-sm hover:shadow-lg hover:-translate-y-1"
              >
                <div className="p-3 bg-blue-50 text-blue-900 rounded-2xl group-hover:bg-blue-950 group-hover:text-yellow-400 transition-colors duration-300">
                  <Icon className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-base block">{sys.name}</span>
                  <span className="text-xs text-slate-500 group-hover:text-blue-950/80 transition-colors line-clamp-1">{sys.desc}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}