import React, { useState, useEffect } from 'react'
import { CgClose } from 'react-icons/cg'
import { FaCloudUploadAlt } from 'react-icons/fa'
import uploadImage from '../helpers/uploadImage'
import DisplayImage from './DisplayImage'
import { MdDelete } from 'react-icons/md'
import SummaryApi from '../common/index'
import { toast } from 'react-toastify'
import { getAuthToken } from "../utils/auth";

const AdminEditProduct = ({
    onClose,
    productData,
    fetchdata
}) => {
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState({
        ...productData,
        productName: productData?.productName,
        shape: productData?.shape,
        category: productData?.category,
        productImage: productData?.productImage || [],
        description: productData?.description,
        price: productData?.price,
        stock: productData?.stock,
    })
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
    const [fullScreenImage, setFullScreenImage] = useState("")
    const token = getAuthToken();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(SummaryApi.getCategories.url);
                const result = await response.json();
                if (result.success) {
                    setCategories(result.data);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((preve) => ({
            ...preve,
            [name]: value
        }))
    }

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]
        const uploadImageCloudinary = await uploadImage(file)
        setData((preve) => ({
            ...preve,
            productImage: [...preve.productImage, uploadImageCloudinary.url]
        }))
    }

    const handleDeleteProductImage = async (index) => {
        const newProductImage = [...data.productImage]
        newProductImage.splice(index, 1)
        setData((preve) => ({
            ...preve,
            productImage: [...newProductImage]
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const response = await fetch(SummaryApi.updateProduct.url, {
                method: SummaryApi.updateProduct.method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })

            const responseData = await response.json()
            if (responseData.success) {
                toast.success(responseData?.message)
                onClose()
                fetchdata()
            }
            if (responseData.error) {
                toast.error(responseData?.message)
            }
        } catch (error) {
            console.error("Error updating product:", error)
            toast.error("ไม่สามารถอัปเดตผลิตภัณฑ์ได้ กรุณาลองอีกครั้ง")
        }
    }

    return (
        <div className='fixed w-full h-full bg-slate-200 bg-opacity-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>แก้ไขสินค้า </h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>

                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
                    <label htmlFor="productName">ชื่อสินค้า : </label>
                    <input
                        type="text"
                        id='productName'
                        placeholder='Enter Product Name'
                        name='productName'
                        value={data.productName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor="shape" className='mt-3'>รูปร่าง : </label>
                    <input
                        type="text"
                        id='shape'
                        placeholder='Enter Product Shape'
                        name='shape'
                        value={data.shape}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />
                    
                    <label htmlFor="category" className='mt-3'>ประเภทสินค้า : </label>
                    <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
                        <option value={""}>เลือกประเภทสินค้า</option>
                        {categories.map((el, index) => (
                            <option value={el.value} key={el.value + index}>{el.label}</option>
                        ))}
                    </select>

                    <label htmlFor="productImage" className='mt-3'>รูปภาพสินค้า : </label>
                    <label htmlFor="uploadImageInput">
                        <div className='p-2 bg-slate-100 border rounded h-48 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex flex-col items-center justify-center gap-2'>
                                <span className='text-4xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm text-slate-400'>อัปโหลดรูปภาพสินค้า</p>
                                <input type="file" id='uploadImageInput' className='hidden' onChange={handleUploadProduct}/>
                            </div>
                        </div>
                    </label>

                    <div>
                        {data?.productImage[0] ? (
                            <div className='flex items-center gap-2'>
                                {data.productImage.map((el, index) => (
                                    <div key={`${el}-${index}`} className='relative group'>
                                        <img
                                            src={el}
                                            alt={`Product ${index + 1}`}
                                            width={80}
                                            height={80}
                                            className='bg-slate-100 border cursor-pointer'
                                            onClick={() => {
                                                setOpenFullScreenImage(true)
                                                setFullScreenImage(el)
                                            }}
                                        />
                                        <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 hover:bg-red-700 cursor-pointer rounded-full hidden group-hover:block' onClick={() => handleDeleteProductImage(index)}>
                                            <MdDelete />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className='text-red-500 text-xs'>*อัปโหลดรูปภาพสินค้า</p>
                        )}
                    </div>

                    <label htmlFor="price" className='mt-3'>ราคา : </label>
                    <input
                        type="number"
                        id='price'
                        placeholder='Enter Product Price'
                        name='price'
                        value={data.price}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor="stock" className='mt-3'>จำนวนคงเหลือ: </label>
                    <input
                        type="number"
                        id='stock'
                        placeholder='Enter Product Stock'
                        name='stock'
                        value={data.stock}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor="description" className='mt-3'>คำอธิบายสินค้า : </label>
                    <textarea
                        id='description'
                        placeholder='Enter Product Description'
                        name='description'
                        value={data.description}
                        rows={3}
                        onChange={handleOnChange}
                        className='h-28 p-2 bg-slate-100 border rounded'
                    />
                    
                    <button className='px-3 py-2 bg-red-600 text-white rounded mb-10 hover:bg-red-700'>แก้ไขสินค้า</button>
                </form> 
            </div>
            {openFullScreenImage && (
                <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
            )}
        </div>
    )
}

export default AdminEditProduct