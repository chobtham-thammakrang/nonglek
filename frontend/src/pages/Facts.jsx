import React from 'react';
import background from '../assest/facts/ประวัติ.JPG';
import setup from '../assest/facts/ตั้งศาล.JPG';
import stepImage from '../assest/facts/ขั้นตอน.JPG';
import stepImage2 from '../assest/facts/ขั้นตอน2.JPG';

const Facts = () => {
  return (
    <div className="max-w-6xl mx-auto p-10 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">สาระน่ารู้</h1>

      {/* Section ประวัติพระภูมิชัยมงคล */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="md:w-1/2">
            <img 
              src={background}
              alt="พระภูมิชัยมงคล" 
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold text-blue-600 mb-4">ประวัติพระภูมิชัยมงคล</h2>
            <p className="text-gray-700 leading-relaxed">
              พระภูมิชัยมงคล หรือศาลพระภูมิ เป็นสิ่งศักดิ์สิทธิ์ที่คนไทยสักการะบูชาเพื่อความเป็นสิริมงคลและป้องกันภัย
              ประวัติของพระภูมิมีมาแต่โบราณโดยเชื่อว่าศาลนี้จะเป็นที่พักพิงของเทพผู้ปกป้องบริเวณที่อยู่อาศัย 
              การตั้งศาลพระภูมิจะมีการประกอบพิธีเพื่อเรียกเทพมาอยู่ในศาลและช่วยปกป้องบ้านเรือน
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              ในอดีต การตั้งศาลพระภูมิเป็นสิ่งสำคัญที่มีไว้เพื่อการบูชาและเพื่อคุ้มครองพื้นที่และผู้อยู่อาศัยให้ปลอดภัย
              โดยปัจจุบันการบูชาพระภูมิยังคงเป็นประเพณีสำคัญที่คนไทยให้ความเคารพนับถือ
              โดยเฉพาะในพื้นที่ชนบทและบ้านเรือนที่สร้างใหม่
            </p>
          </div>
        </div>
      </section>

      {/* Section การตั้งศาล */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold text-blue-600 mb-4">การตั้งศาลพระภูมิ</h2>
            <p className="text-gray-700 leading-relaxed">
              การตั้งศาลพระภูมิเป็นพิธีกรรมที่ต้องคำนึงถึงฤกษ์ยามและสถานที่ที่เหมาะสม 
              โดยขั้นตอนต่าง ๆ จะต้องดำเนินการตามลำดับเพื่อให้เป็นสิริมงคลแก่บ้านและครอบครัว 
              โดยมีการเลือกสถานที่ตั้งให้เป็นมุมที่ศาลสามารถเฝ้ามองและคุ้มครองบ้านได้
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              ขั้นตอนการตั้งศาลพระภูมิรวมถึงการบวงสรวงและถวายเครื่องสักการะเพื่อให้เทพมาประทับ 
              สิ่งที่นิยมนำมาถวายได้แก่ ดอกไม้ ผลไม้ น้ำดื่ม และธูปเทียน 
              เมื่อเสร็จพิธีการ เชื่อกันว่าศาลจะกลายเป็นที่สิงสถิตของเทพผู้คุ้มครอง
            </p>
          </div>
          <div className="md:w-1/2">
            <img 
              src={setup}
              alt="การตั้งศาลพระภูมิ" 
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Section ขั้นตอนการตั้งศาล */}
      <section>
        <h2 className="text-3xl font-semibold text-blue-600 mb-4">ขั้นตอนการตั้งศาลพระภูมิ</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          การตั้งศาลพระภูมิต้องปฏิบัติตามขั้นตอนต่าง ๆ อย่างเคร่งครัดเพื่อให้เกิดความเป็นสิริมงคลแก่ครอบครัวและผู้อยู่อาศัย โดยขั้นตอนหลักมีดังนี้:
        </p>
        <ol className="list-decimal list-inside pl-4 text-gray-700 leading-relaxed">
          <li className="mb-2">
            <strong className="font-medium">เลือกฤกษ์มงคล:</strong> การตั้งศาลควรเลือกวันที่มีฤกษ์ดี
            เช่น วันอังคารหรือพฤหัสบดี ตามปฏิทินโหราศาสตร์ไทย
          </li>
          <li className="mb-2">
            <strong className="font-medium">การเลือกสถานที่:</strong> ศาลพระภูมิควรตั้งในบริเวณที่เป็นจุดศูนย์กลางหรือมุมที่มองเห็นบ้านได้ชัดเจน และต้องหันหน้าศาลไปทางทิศเหนือหรือทิศตะวันออก
          </li>
          <li className="mb-2">
            <strong className="font-medium">พิธีบวงสรวง:</strong> ต้องมีการบวงสรวงด้วยของถวาย เช่น ผลไม้ น้ำดื่ม และธูปเทียน โดยมีผู้รู้หรือพราหมณ์มาทำพิธี
          </li>
        </ol>
        <div className="md:w-1/2">
          <div className="flex flex-col md:flex-row gap-4 p-2">
            <img 
              src={stepImage}
              alt="ขั้นตอนการตั้งศาล" 
              className="rounded-lg shadow-md"
            />
            <img 
              src={stepImage2}
              alt="ขั้นตอนการตั้งศาล2" 
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Facts;
