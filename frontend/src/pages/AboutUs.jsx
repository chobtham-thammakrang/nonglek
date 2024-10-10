import React from 'react';
import โต๊ะปูกระเบื้อง from '../assest/AboutUs/5_5.gif'
import หินขัด from '../assest/AboutUs/5_20.gif'
import ศาลดิบ from '../assest/AboutUs/Rotation of IMG_1424.JPG'
import poom from '../assest/AboutUs/poom.jpg'

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto p-10 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">เกี่ยวกับเรา</h1>
      
      {/* Timeline Event 1 */}
      <div className="mb-8 border-l-4 border-gray-300 pl-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">ปี พ.ศ. 2507</h2>
        <p className="text-gray-800 leading-relaxed mb-4 text-lg">
        น้องเล็กศาลพระภูมิ มีประวัติความเป็นมาที่ยาวนานมากกว่า 60 ปี โดยเป็นกิจการที่สืบทอดจากคุณพ่อซึ่งมีประสบการณ์ในงานผลิตภัณฑ์ซีเมนต์ที่ทำด้วยมือ(Hand Made)โดยเริ่มจากคุณพ่อเป็นลูกจ้างในร้านทำฐานส้วมนั่งยองที่ทำด้วยมือตั้งแต่ประมาณปีพ.ศ 2507
        </p>
      </div>

      {/* Timeline Event 2 */}
      <div className="mb-8 border-l-4 border-gray-300 pl-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">ปี พ.ศ. 2512</h2>
        <p className="text-gray-800 leading-relaxed mb-4 text-lg">
          ต่อมาปี พ.ศ. 2512 ก็ได้หันมาทำเสาอั้งโล้วแบบเตาคู่
        </p>
      </div>

      {/* Timeline Event 3 */}
      <div className="mb-8 border-l-4 border-gray-300 pl-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">ปี พ.ศ. 2515</h2>
        <p className="text-gray-800 leading-relaxed mb-4 text-lg">
          ต่อมาปี พ.ศ. 2515 ได้เริ่มทำถังหินขัด และโต๊ะปูกระเบื้อง
        </p>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <img 
            src={หินขัด}
            alt="หินขัด" 
            className="rounded-lg shadow-md w-full md:w-1/2"
          />
          <img 
            src={โต๊ะปูกระเบื้อง}
            alt="โต๊ะปูกระเบื้อง" 
            className="rounded-lg shadow-md w-full md:w-1/2 "
          />
        </div>
      </div>

      {/* Timeline Event 4 */}
      <div className="mb-8 border-l-4 border-gray-300 pl-4">
        <p className="text-gray-800 leading-relaxed mb-4 text-lg">
          หลังจากนั้นจึงหันมาหล่อเสาและศาลพระภูมิเป็นศาลดิบ ส่งให้แก่ร้านขายศาลพระภูมิทั่วประเทศ
        </p>
        <img 
          src={ศาลดิบ}
          alt="ศาลดิบ" 
          className="rounded-lg shadow-md w-full mb-4"
        />
      </div>

      {/* Timeline Event 5 */}
      <div className="mb-8 border-l-4 border-gray-300 pl-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">ปี พ.ศ. 2527</h2>
        <p className="text-gray-800 leading-relaxed mb-4 text-lg">
          ด้วยวิสัยทัศน์ที่มองเห็นโอกาสว่าอนาคตบ้านเมืองจะเริ่มขยายตัว การตั้งศาลพระภูมิและโต๊ะหินขัด หินอ่อนจะได้รับความนิยมมากขึ้น ดังนั้นคุณพ่อจึงได้คิดเปิดร้านเป็นของตนเองในปี พ.ศ. 2527 โดยนำศาลดิบที่เคยส่งให้ร้านทั่วไป มาทาสีขายเอง รวมถึงโต๊ะหินขัด หินอ่อนอีกด้วย
        </p>
        <img 
          src={poom} 
          alt="ร้านศาลพระภูมิและโต๊ะ" 
          className="rounded-lg shadow-md w-full opacity-80 mb-4"
        />
      </div>

      {/* Timeline Event 6 */}
      <div className="border-l-4 border-gray-300 pl-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">ปัจจุบัน</h2>
        <p className="text-gray-800 leading-relaxed mb-4 text-lg">
          ซึ่งระหว่างที่คุณพ่อเปิดร้าน น้องเล็กก็ได้ช่วยงานทุกอย่างที่ร้านจนเรียนรู้เรื่องต่างๆ และซึมซับความรู้ต่างๆ ที่คุณพ่อได้ทำ และเมื่อคุณพ่ออายุมากขึ้น น้องเล็กเป็นห่วงสุขภาพคุณพ่อ จึงขอให้คุณพ่อหยุดคอยดูอยู่ห่างๆ โดยน้องเล็กก็ได้รับภาระดูแลร้านและทำงานต่างๆ แทนคุณพ่อ สืบทอดมาเป็นร้านน้องเล็กศาลพระภูมิในปัจจุบัน
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
