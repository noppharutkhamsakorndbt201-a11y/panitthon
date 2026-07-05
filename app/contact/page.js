'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending message
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Page Title */}
        <div className="text-center space-y-4">
          <span className="text-yellow-600 font-extrabold text-sm uppercase tracking-wider block">Get In Touch</span>
          <h1 className="text-4xl font-extrabold text-blue-950 tracking-tight">ติดต่อเรา</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base font-sarabun">
            หากคุณมีคำถามใดๆ เกี่ยวกับการเรียน การสมัคร หรือข้อมูลการติดต่อวิทยาลัย สามารถส่งข้อความหาเราได้ทันที
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Contact Details (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Box Information */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <h2 className="text-2xl font-extrabold text-blue-950">ข้อมูลการติดต่อ</h2>
              
              <div className="space-y-6 font-sarabun text-slate-600 text-sm">
                {/* Address */}
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 block">วิทยาลัยพณิชยการธนบุรี</span>
                    <span>185 ซอยพาณิชยการธนบุรี แขวงวัดท่าพระ เขตบางกอกใหญ่ กรุงเทพมหานคร 10600</span>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 block">โทรศัพท์</span>
                    <span>0-2412-2411 หรือ 0-2412-0761</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 block">อีเมล</span>
                    <span>admin@panitthon.ac.th</span>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 block">เวลาทำการ</span>
                    <span>วันจันทร์ - ศุกร์: 08:30 น. - 16:30 น.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Iframe Container */}
            <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm overflow-hidden h-72 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.9229272365287!2d100.47192837589417!3d13.72304899797072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e298fa7c3c5097%3A0xeab50d4eb076fa90!2z4Lin4Li04LiX4Lii4Liy4Lil4Lix4Lii4Lie4LiT4Li04LiK4Lii4LiB4Liy4Lij4LiY4LiZ4Li44Lij4Li1!5e0!3m2!1sth!2sth!4v1700000000000!5m2!1sth!2sth" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full rounded-3xl"
              ></iframe>
            </div>
          </div>

          {/* Contact Form (3 columns) */}
          <div className="lg:col-span-3">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <h2 className="text-2xl font-extrabold text-blue-950">ส่งข้อความติดต่อวิทยาลัย</h2>

              {success && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-5 flex items-center space-x-3 font-sarabun">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>ส่งข้อความสำเร็จแล้ว! เจ้าหน้าที่ฝ่ายต้อนรับจะดำเนินการช่วยเหลือในไม่ช้า</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 font-sarabun">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">ชื่อ-นามสกุลของคุณ</label>
                    <input
                      type="text"
                      required
                      placeholder="สมชาย ใจดี"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-950 text-slate-700 bg-slate-50/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">อีเมลติดต่อกลับ</label>
                    <input
                      type="email"
                      required
                      placeholder="somchai@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-950 text-slate-700 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">หัวข้อข้อความ</label>
                  <input
                    type="text"
                    required
                    placeholder="สอบถามเกี่ยวกับการลงทะเบียนรับสมัคร / อื่นๆ"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-950 text-slate-700 bg-slate-50/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">รายละเอียดข้อความ</label>
                  <textarea
                    required
                    rows="5"
                    placeholder="เขียนรายละเอียดคำถามหรือคำขอร้องเรียนของคุณ..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-950 text-slate-700 bg-slate-50/50 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-950 hover:bg-yellow-500 hover:text-blue-950 text-white font-bold py-3.5 rounded-xl transition duration-300 flex items-center justify-center space-x-2 shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'กำลังส่งข้อความ...' : 'ส่งข้อความหาเรา'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
