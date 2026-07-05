import './globals.css';
import Navbar from '@/components/Navbar';
import { Prompt, Sarabun } from 'next/font/google';

const prompt = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-prompt',
  display: 'swap',
});

const sarabun = Sarabun({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sarabun',
  display: 'swap',
});

export const metadata = {
  title: 'วิทยาลัยพณิชยการธนบุรี | Thonburi Commercial College',
  description: 'เว็บไซต์หลักอย่างเป็นทางการ วิทยาลัยพณิชยการธนบุรี สถาบันอาชีวศึกษาชั้นนำด้านพณิชยกรรมและบริการ',
  keywords: 'วิทยาลัยพณิชยการธนบุรี, พณิชยการธนบุรี, พ.ธ., สมัครเรียนพาณิชย์, ปวช, ปวส, Thonburi Commercial College, อาชีวศึกษา',
};

export default function RootLayout({ children }) {
  return (
    <html lang="th" className={`${prompt.variable} ${sarabun.variable} scroll-smooth`}>
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col font-sans">
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow">{children}</main>

        {/* Premium Footer */}
        <footer className="bg-slate-900 text-slate-300 border-t-4 border-yellow-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-950 font-bold text-base border border-yellow-400">
                    พ.ธ.
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-md leading-tight">วิทยาลัยพณิชยการธนบุรี</h3>
                    <p className="text-xs text-slate-400">Thonburi Commercial College</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed font-sarabun">
                  มุ่งมั่นจัดการศึกษาอาชีวศึกษาด้านพาณิชยกรรมและบริการ สู่มาตรฐานสากล ผลิตกำลังคนที่มีคุณภาพและมีคุณธรรม
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-semibold text-sm uppercase tracking-wider border-l-2 border-yellow-500 pl-2">เมนูหลัก</h4>
                <ul className="space-y-2 text-sm font-sarabun">
                  <li><a href="/" className="hover:text-yellow-400 transition">หน้าแรก</a></li>
                  <li><a href="/news" className="hover:text-yellow-400 transition">ข่าวประชาสัมพันธ์</a></li>
                  <li><a href="/about" className="hover:text-yellow-400 transition">เกี่ยวกับวิทยาลัย</a></li>
                  <li><a href="/staff" className="hover:text-yellow-400 transition">คณะผู้บริหารและครู</a></li>
                  <li><a href="/departments" className="hover:text-yellow-400 transition">สาขาที่เปิดสอน</a></li>
                  <li><a href="/contact" className="hover:text-yellow-400 transition">ติดต่อเรา</a></li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-semibold text-sm uppercase tracking-wider border-l-2 border-yellow-500 pl-2">ข้อมูลการติดต่อ</h4>
                <div className="text-sm space-y-2 text-slate-400 font-sarabun">
                  <p>📍 เลขที่ 185 ซอยพาณิชยการธนบุรี แขวงวัดท่าพระ เขตบางกอกใหญ่ กรุงเทพมหานคร 10600</p>
                  <p>📞 โทรศัพท์: 0-2412-2411 หรือ 0-2412-0761</p>
                  <p>📧 อีเมล: admin@panitthon.ac.th</p>
                  <p>🌐 เว็บไซต์: www.panitthon.ac.th</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 font-sarabun">
              <p>&copy; {new Date().getFullYear()} Thonburi Commercial College. All rights reserved.</p>
              <p className="mt-1">พัฒนาโดยคณะทำงานฝ่ายเทคโนโลยีสารสนเทศ วิทยาลัยพณิชยการธนบุรี</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}