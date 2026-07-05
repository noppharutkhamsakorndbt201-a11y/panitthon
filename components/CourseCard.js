// Component แม่แบบสำหรับการ์ดหลักสูตร
export default function CourseCard({ name, level, icon }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex items-start space-x-4">
      <div className="text-4xl p-3 bg-blue-50 rounded-lg">
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className="font-bold text-lg text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500 font-medium bg-gray-100 px-2.5 py-0.5 rounded-full inline-block">
          ระดับ: {level}
        </p>
      </div>
    </div>
  )
}