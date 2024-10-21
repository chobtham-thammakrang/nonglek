import React, { useState } from 'react'
import { MdModeEdit, MdDelete } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({ data, fetchdata, onDelete }) => {
    const [editProduct, setEditProduct] = useState(false)
    return (
        <div className='bg-white p-2 rounded'>
            <div className='w-40'>
                <div className='w-32 h-32 flex justify-center items-center'>  
                    <img 
                        src={data?.productImage[0]} 
                        width={120} 
                        height={120} 
                        className='mx-auto object-fill h-full'
                        alt={data.productName}
                    />
                </div>
                <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>
                <p className={`text-sm ${data.stock === 0 ? 'text-red-500' : 'text-gray-500'}`}>
                    คงเหลือ: {data.stock}
                </p>

                <div className='flex items-center justify-between'>
                    <p className='font-semibold'>
                        {
                            displayCurrency(data.price)
                        }
                    </p>

                    <div className='flex gap-2'>
                        <div className='w-fit p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={() => setEditProduct(true)}>
                            <MdModeEdit />
                        </div>
                        <div className='w-fit p-2 bg-red-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer' onClick={() => onDelete(data._id, data.productName)}>
                            <MdDelete />
                        </div>
                    </div>
                </div>
            </div>


            {
                editProduct && (
                    <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata}/>
                )
            }
        </div>
    )
}

export default AdminProductCard