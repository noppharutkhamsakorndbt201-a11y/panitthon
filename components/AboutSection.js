export default function AboutSection() {
  return (
    <section id="about" className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-blue-900">เกี่ยวกับวิทยาลัย</h2>
        <p className="text-gray-500">ข้อมูลพื้นฐานและเป้าหมายของวิทยาลัยพณิชยการธนบุรี</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 text-center">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-3">
          <div className="text-3xl">🧘‍♂️</div>
          <h3 className="font-bold text-xl text-blue-900">ปรัชญา</h3>
          <p className="text-gray-600 text-sm leading-relaxed">"ความรู้ดี ทักษะเด่น เน้นคุณธรรม นำสังคม"</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-3">
          <div className="text-3xl">🎯</div>
          <h3 className="font-bold text-xl text-blue-900">วิสัยทัศน์</h3>
          <p className="text-gray-600 text-sm leading-relaxed">เป็นผู้นำในการจัดการอาอาชีวศึกษาด้านบริหารธุรกิจที่ทันสมัย มีมาตรฐานระดับสากล</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-3">
          <div className="text-3xl">💎</div>
          <h3 className="font-bold text-xl text-blue-900">อัตลักษณ์</h3>
          <p className="text-gray-600 text-sm leading-relaxed">"บริการประทับใจ เชี่ยวชาญเทคโนโลยี มีทักษะวิชาชีพ"</p>
        </div>
      </div>
    </section>
  );
}