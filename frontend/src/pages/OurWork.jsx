import React from 'react';
import image1 from '../assest/Gallery/01.jpg';
import image2 from '../assest/Gallery/02.jpg';
import image3 from '../assest/Gallery/03.jpg';
import image4 from '../assest/Gallery/04.jpg';
import image5 from '../assest/Gallery/05.jpg';
import image6 from '../assest/Gallery/06.jpg';
import image7 from '../assest/Gallery/07.jpg';
import image8 from '../assest/Gallery/08.jpg';
import image9 from '../assest/Gallery/09.jpg';
import image10 from '../assest/Gallery/10.jpg';
import image11 from '../assest/Gallery/11.jpg';
import image12 from '../assest/Gallery/12.jpg';
import image13 from '../assest/Gallery/13.jpg';
import image14 from '../assest/Gallery/14.jpg';
import image15 from '../assest/Gallery/15.jpg';
import image16 from '../assest/Gallery/16.jpg';
import image17 from '../assest/Gallery/17.jpg';
import image18 from '../assest/Gallery/18.jpg';
import image19 from '../assest/Gallery/19.jpg';
import image20 from '../assest/Gallery/20.jpg';

const OurWork = () => {
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12,
    image13,
    image14,
    image15,
    image16,
    image17,
    image18,
    image19,
    image20,
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-8">ผลงานของเรา</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="overflow-hidden rounded-lg">
            <img
              src={image}
              alt={`Our work ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurWork;
