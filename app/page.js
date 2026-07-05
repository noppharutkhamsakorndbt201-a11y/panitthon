import Hero from '@/components/Hero';
import NewsSection from '@/components/NewsSection';
import InfoSystems from '@/components/InfoSystems';
import AboutSection from '@/components/AboutSection';
import StaffSection from '@/components/StaffSection';
import DepartmentSection from '@/components/DepartmentSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <div className="space-y-6">
      {/* 1. หน้าปกหลัก */}
      <Hero />

      {/* 2. ทางลัดระบบสารสนเทศ */}
      <InfoSystems />

      {/* 3. ข่าวประชาสัมพันธ์ */}
      <NewsSection />

      {/* 4. เกี่ยวกับวิทยาลัย (ปรัชญา/วิสัยทัศน์) */}
      <AboutSection />

      {/* 5. คณะผู้บริหารและบุคลากร */}
      <StaffSection />

      {/* 6. แผนกวิชาและหลักสูตร */}
      <DepartmentSection />

      {/* 7. ข้อมูลการติดต่อและแผนที่ */}
      <ContactSection />
    </div>
  );
}