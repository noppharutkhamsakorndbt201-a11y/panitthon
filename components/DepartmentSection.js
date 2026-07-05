export default function DepartmentSection() {
  const courses = [
    { name: "สาขาวิชาการบัญชี", level: "ปวช. / ปวส." },
    { name: "สาขาวิชาการตลาด", level: "ปวช. / ปวส." },
    { name: "สาขาวิชาเทคโนโลยีสารสนเทศ", level: "ปวช. / ปวส." },
    { name: "สาขาวิชาคอมพิวเตอร์ธุรกิจ", level: "ปวช. / ปวส." },
  ];

  return (
    <section id="courses" className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">แผนกวิชาที่เปิดสอน</h2>
      <p className="text-center text-gray-500 mb-8">หลักสูตรประกาศนียบัตรวิชาชีพ (ปวช.) และประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)</p>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course, idx) => (
          <div key={idx} className="bg-white border border-gray-200 p-6 rounded-xl hover:border-yellow-500 transition shadow-sm text-center space-y-2">
            <h3 className="font-bold text-gray-900">{course.name}</h3>
            <p className="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full inline-block">{course.level}</p>
          </div>
        ))}
      </div>
    </section>
  );
}