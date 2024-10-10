import React from 'react'
import image from '../assest/banner/banner.jpg'

const BannerProduct = () => {
  return (
    <div className='container p-4 rounded mx-auto overflow-hidden'>
        <div className='h-72 w-full'>
            
            <div className='w-full h-full'>
                <img src={image} className='w-full '/>
            </div>
        </div>
    </div>

  )
}

export default BannerProduct