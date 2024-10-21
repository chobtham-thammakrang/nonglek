import React from 'react';
import { FaLine, FaFacebook } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="bg-gray-100">
      {/* Contact Section */}
      <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg mt-8">
        <h2 className="text-4xl font-bold text-center mb-6">ติดต่อ</h2>

        {/* Contact Info */}
        <div className="text-center">
          <p className="text-3xl font-semibold">น้องเล็ก ศาลพระภูมิ นครปฐม</p>
          <p className="text-2xl">ที่อยู่: 17 หมู่ 3 ตำบล ศรีมหาโพธิ์ อำเภอนครชัยศรี นครปฐม 73120</p>
          <p className="text-2xl">เบอร์โทร: 086-1607-129</p>

          {/* Social Media Links with Icons */}
          <div className="flex justify-center space-x-6 mt-6">
            <a
              href="https://line.me/R/ti/p/%400861607129"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-green-600 text-2xl"
            >
              <FaLine size={30} />
              <span>@0861607129</span>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100010768322698"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-blue-600 text-2xl"
            >
              <FaFacebook size={30} />
              <span>facebook.com/nonglek</span>
            </a>
          </div>

          {/* Call to Action Buttons */}
          <div className="mt-6 space-x-4 p-2">
            <a
              href="tel:086-1607-129"
              className="bg-yellow-400 text-white px-8 py-3 text-xl rounded-full shadow-lg"
            >
              โทร: 086-1607-129
            </a>
          </div>
          
          {/* Google Map Embed */}
          <div className="mb-4 p-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d242.09357995053173!2d100.18207856935643!3d13.869187880444779!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sth!2sth!4v1726140005608!5m2!1sth!2sth"
              width="100%"
              height="400"
              allowFullScreen=""
              loading="lazy"
              className="border-0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
