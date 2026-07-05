'use client';

import { Calculator, Award, Laptop, ShoppingCart, Globe, Truck, BookOpen, Layers } from 'lucide-react';

export default function DepartmentsPage() {
  const departments = [
    {
      name: 'สาขาวิชาเทคโนโลยีสารสนเทศ',
      icon: Laptop,
      level: 'ปวช. / ปวส. / ปวส. (ทวิภาคี)',
      desc: 'ศึกษาเกี่ยวกับการพัฒนาซอฟต์แวร์ เครือข่ายคอมพิวเตอร์ ความมั่นคงปลอดภัยไซเบอร์ การบริหารจัดการระบบฐานข้อมูล และเทคโนโลยีสมัยใหม่',
      skills: ['Web Development', 'Computer Networking', 'Database Systems', 'IT Support'],
      careers: 'นักพัฒนาเว็บ, เจ้าหน้าที่ไอที, ผู้ดูแลระบบเครือข่าย, นักวิเคราะห์ระบบ'
    },
    {
      name: 'สาขาวิชาการบัญชี',
      icon: Calculator,
      level: 'ปวช. / ปวส. / ปวส. (ทวิภาคี)',
      desc: 'ศึกษาหลักการบัญชี การจัดทำงบการเงิน การวางระบบบัญชี ภาษีอากร การตรวจสอบบัญชี และการใช้ซอฟต์แวร์บัญชีสำเร็จรูป',
      skills: ['Financial Accounting', 'Tax Planning', 'Auditing', 'Express Accounting Software'],
      careers: 'พนักงานบัญชี, เจ้าหน้าที่ภาษี, นักตรวจสอบบัญชี, ที่ปรึกษาทางการเงิน'
    },
    {
      name: 'สาขาวิชาการตลาด',
      icon: ShoppingCart,
      level: 'ปวช. / ปวส.',
      desc: 'ศึกษาทฤษฎีการตลาด พฤติกรรมผู้บริโภค การตลาดดิจิทัล การสร้างตราสินค้า การวางแผนกลยุทธ์การขาย และการวิจัยตลาด',
      skills: ['Digital Marketing', 'Brand Management', 'Sales Strategy', 'Market Research'],
      careers: 'นักการตลาด, ผู้จัดการฝ่ายขาย, นักสร้างเนื้อหาดิจิทัล, ผู้ประกอบการออนไลน์'
    },
    {
      name: 'สาขาวิชาคอมพิวเตอร์ธุรกิจ',
      icon: Layers,
      level: 'ปวช. / ปวส.',
      desc: 'เน้นประยุกต์ใช้คอมพิวเตอร์และสื่อดิจิทัลในงานธุรกิจ การสร้างมัลติมีเดีย การประมวลผลข้อมูล และการจัดการสำนักงานยุคใหม่',
      skills: ['Office Applications', 'Multimedia Design', 'E-Commerce', 'Data Entry'],
      careers: 'เจ้าหน้าที่สำนักงาน, นักออกแบบสื่อประชาสัมพันธ์, แอดมินร้านค้าออนไลน์'
    },
    {
      name: 'สาขาวิชาการจัดการโลจิสติกส์',
      icon: Truck,
      level: 'ปวส. (ทวิภาคี)',
      desc: 'ศึกษาการจัดการห่วงโซ่อุปทาน คลังสินค้า การขนส่งสินค้า การกระจายสินค้า และการควบคุมสต๊อกสินค้าอย่างมีประสิทธิภาพ',
      skills: ['Supply Chain', 'Warehouse Management', 'Inventory Control', 'Cargo Operations'],
      careers: 'เจ้าหน้าที่คลังสินค้า, ฝ่ายจัดซื้อ, เจ้าหน้าที่ประสานงานขนส่งนำเข้า-ส่งออก'
    },
    {
      name: 'สาขาวิชาภาษาต่างประเทศธุรกิจ',
      icon: Globe,
      level: 'ปวช. (ภาษาอังกฤษธุรกิจ) / ปวส.',
      desc: 'มุ่งเน้นการใช้ภาษาอังกฤษและภาษาที่สามเพื่อการสื่อสารทางธุรกิจ การเขียนจดหมายโต้ตอบ การเจรจาการค้า และทักษะเลขานุการ',
      skills: ['Business English', 'Cross-Cultural Comm', 'Secretarial Skills', 'Translation'],
      careers: 'เลขานุการ, เจ้าหน้าที่ลูกค้าสัมพันธ์ต่างประเทศ, พนักงานต้อนรับ, ล่ามอิสระ'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Page Title */}
        <div className="text-center space-y-4">
          <span className="text-yellow-600 font-extrabold text-sm uppercase tracking-wider block">Academics</span>
          <h1 className="text-4xl font-extrabold text-blue-950 tracking-tight">แผนกวิชาที่เปิดสอน</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base font-sarabun">
            หลักสูตรระดับประกาศนียบัตรวิชาชีพ (ปวช.) และระดับประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.) มุ่งสร้างความเชี่ยวชาญสู่การประกอบอาชีพจริง
          </p>
        </div>

        {/* Departments Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {departments.map((dept, idx) => {
            const Icon = dept.icon;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Icon & Title */}
                  <div className="flex items-center space-x-4">
                    <div className="p-3.5 bg-blue-50 text-blue-950 rounded-2xl group-hover:bg-blue-950 group-hover:text-yellow-400 transition duration-300">
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-950 transition duration-300">
                        {dept.name}
                      </h2>
                      <span className="text-xs font-semibold px-2.5 py-0.5 bg-yellow-500/10 text-yellow-700 rounded-full border border-yellow-500/10 font-sarabun mt-1 inline-block">
                        {dept.level}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 font-sarabun text-sm leading-relaxed">
                    {dept.desc}
                  </p>

                  {/* Skill Badges */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">ทักษะที่จะได้เรียนรู้</span>
                    <div className="flex flex-wrap gap-1.5">
                      {dept.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="text-xs font-medium bg-slate-50 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-100 font-sarabun">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Careers Info */}
                <div className="mt-6 pt-4 border-t border-slate-50 text-xs font-sarabun text-slate-500">
                  <span className="font-bold text-slate-700 block mb-1">เส้นทางอาชีพในอนาคต:</span>
                  <span className="leading-relaxed">{dept.careers}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
