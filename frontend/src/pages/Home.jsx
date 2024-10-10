import { Link } from 'react-router-dom';
import BannerProduct from '../components/BannerProduct';
import HorizontalCardProduct from '../components/HorizontalCardProduct';
import VerticalCardProduct from '../components/VerticalCardProduct';

import Img01 from '../assest/homeImg/01.jpg'
import Img02 from '../assest/homeImg/02.jpg'
import Img03 from '../assest/homeImg/03.jpg'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      {/* แบนเนอร์อยู่ข้างบนสุด */}
      <BannerProduct />

      <div className="bg-white shadow-lg rounded-xl p-8 mt-8 w-full max-w-6xl">
        <h1 className="text-6xl font-bold text-center mb-6 text-gray-800">
          ยินดีต้อนรับสู่ น้องเล็กศาลพระภูมิ นครปฐม
        </h1>
        <p className="text-4xl text-gray-600 text-center mb-4">
          ศาลทุกหลังจัดทำพิเศษตามที่ลูกค้าสั่งเท่านั้น ไม่ว่าจะเป็นลวดลายหรือสีที่ถูกโฉลก ไม่มีการทำล่วงหน้า
        </p>
        <p className="text-4xl text-gray-600 text-center mb-6">
          น้องเล็กศาลพระภูมิ จัดทำโดยเริ่มจากการคัดสรรสารดิบอย่างประณีต รองพื้นด้วยสีที่มีคุณภาพ ลงสีพื้นและลวดลายอย่างประณีตด้วยสีอย่างดี
        </p>
      </div>

      {/* ส่วนแสดงภาพตัวอย่าง */}
      <div className="flex flex-col items-center mt-12">
        <h2 className="text-3xl font-semibold mb-8 text-gray-700">ภาพตัวอย่าง</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <img
            src={Img01}
            alt="Img01"
            className="w-full h-auto aspect-square object-cover rounded-xl shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out"
          />
          <img
            src={Img02}
            alt="Img02"
            className="w-full h-auto aspect-square object-cover rounded-xl shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out"
          />
          <img
            src={Img03}
            alt="Img03"
            className="w-full h-auto aspect-square object-cover rounded-xl shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
      </div>

      {/* แสดงสินค้า */}
      <div className="mt-16 w-full max-w-6xl">
        <div className="mb-8">
          <HorizontalCardProduct category="ศาลพระภูมิ"
          heading={<Link to="/product-category?category=ศาลพระภูมิ" className="text-blue-600 hover:underline">ศาลพระภูมิ แนะนำ</Link>} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <VerticalCardProduct 
            category="ศาลพระภูมิ" 
            heading={<Link to="/product-category?category=ศาลพระภูมิ" className="text-blue-600 hover:underline">ศาลพระภูมิ</Link>} 
          />
          <VerticalCardProduct 
            category="ศาลพระพรหม" 
            heading={<Link to="/product-category?category=ศาลพระพรหม" className="text-blue-600 hover:underline">ศาลพระพรหม</Link>} 
          />
          <VerticalCardProduct 
            category="ศาลเจ้าที่" 
            heading={<Link to="/product-category?category=ศาลเจ้าที่" className="text-blue-600 hover:underline">ศาลเจ้าที่</Link>} 
          />
          <VerticalCardProduct 
            category="โต๊ะหินอ่อน" 
            heading={<Link to="/product-category?category=โต๊ะหินอ่อน" className="text-blue-600 hover:underline">โต๊ะหินอ่อน</Link>} 
          />
          <VerticalCardProduct 
            category="โต๊ะไหว้" 
            heading={<Link to="/product-category?category=โต๊ะไหว้" className="text-blue-600 hover:underline">โต๊ะไหว้</Link>} 
          />
          <VerticalCardProduct 
            category="อุปกรณ์ประกอบศาล" 
            heading={<Link to="/product-category?category=อุปกรณ์ประกอบศาล" className="text-blue-600 hover:underline">อุปกรณ์ประกอบศาล</Link>} 
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
