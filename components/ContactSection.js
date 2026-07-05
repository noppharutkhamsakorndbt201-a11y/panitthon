export default function ContactSection() {
  return (
    <section id="contact" className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-blue-900 border-l-4 border-yellow-500 pl-3">ติดต่อเรา</h2>
        <div className="text-gray-600 space-y-2 text-sm leading-relaxed">
          <p className="font-bold text-base text-gray-900">วิทยาลัยพณิชยการธนบุรี</p>
          <p>📍 เลขที่ 185 ซอยพาณิชยการธนบุรี แขวงวัดท่าพระ เขตบางกอกใหญ่ กรุงเทพมหานคร 10600</p>
          <p>📞 เบอร์โทรศัพท์: 02-XXX-XXXX</p>
          <p>✉️ อีเมล: contact@tcc.ac.th</p>
        </div>
      </div>
      <div className="bg-gray-300 h-64 rounded-xl flex items-center justify-center text-gray-500 border shadow-inner">
        [ 🗺️ พื้นที่สำหรับวาง Google Maps iframe ]
      </div>
    </section>
  );
}