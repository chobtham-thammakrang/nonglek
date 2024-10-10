import React from 'react'
import { CgClose } from 'react-icons/cg'


const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className='fixed bottom-0 left-0 right-0 top-0 flex justify-center items-center'>
        <div className='bg-white shadow-lg rounded max-w-5xl mx-auto'>
            <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                <CgClose />
            </div>
            <div className='flex justify-center p-4 max-h-[80vh] max-w-[80vw]'>
                <img src={imgUrl} alt="Displayed image" className='w-full h-full bg-slate-100 border'/>
            </div>
        </div>

    </div>
  )
}

export default DisplayImage