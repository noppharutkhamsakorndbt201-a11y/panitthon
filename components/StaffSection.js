export default function StaffSection() {
  const departments = [
    { title: "คณะผู้บริหาร", name: "นายสมชาย ใจดี", role: "ผู้อำนวยการวิทยาลัย" },
    { title: "ฝ่ายวิชาการ", name: "นางสาวสมศรี เรียนดี", role: "หัวหน้างานพัฒนาหลักสูตร" },
    { title: "ฝ่ายพัฒนากิจการฯ", name: "นายสมศักดิ์ กิจกรรม", role: "รองผู้อำนวยการฝ่ายพัฒนาฯ" },
  ];

  return (
    <section id="staff" className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">คณะผู้บริหารและบุคลากร</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {departments.map((dept, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm text-center space-y-4">
              <span className="bg-blue-900 text-white text-xs px-3 py-1 rounded-full font-bold">{dept.title}</span>
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto flex items-center justify-center text-gray-400 text-xs">[ รูปภาพ ]</div>
              <div>
                <h4 className="font-bold text-gray-900">{dept.name}</h4>
                <p className="text-xs text-gray-500">{dept.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}