import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-black text-white text-sm'>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-center md:items-start md:space-x-8 bg-black text-white py-2">
          {/* Left section: Contact information */}
          <div className="flex-shrink-0 mb-2 md:mb-0">
            <h2 className="text-lg mb-1">ติดต่อ</h2>
            <p className="text-base">17 หมู่ 3 ตำบล ศรีมหาโพธิ์</p>
            <p className="text-base">อำเภอนครชัยศรี นครปฐม 73120</p>
            <p className="mt-1 text-base">086-1607-129</p>
            {/* Facebook icon */}
            <a href="https://www.facebook.com/profile.php?id=100010768322698" target="_blank" rel="noopener noreferrer" className="mt-1 inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495V14.708h-3.13v-3.63h3.13V8.271c0-3.1 1.893-4.785 4.658-4.785 1.325 0 2.464.099 2.795.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.468 3.63h-3.119V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z"/>
              </svg>
            </a>
          </div>

          {/* Right section: Google Maps */}
          <div className="flex-shrink-0">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d242.09357995053173!2d100.18207856935643!3d13.869187880444779!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sth!2sth!4v1726140005608!5m2!1sth!2sth"
              width="300"
              height="200"
              style={{border: 0}}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer