import React, { useState, useEffect, useContext, useCallback } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import addtoCart from '../helpers/addToCart'
import Context from '../context/index'


const HorizontalCardProduct = ({category, heading}) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const loadingList = new Array(13).fill(null)
    const scrollElement = useRef()

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async (e, id) => {
        await addtoCart(e,id)
        fetchUserAddToCart()
    }

    const fetchData = useCallback(async () => {
        setLoading(true)
        const categoryProducts = await fetchCategoryWiseProduct(category)
        setLoading(false)
        setData(categoryProducts?.data)
    }, [category])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300
    }

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300
    }
  return (
    <div className='container mx-auto px-4 my-6 relative'>
        
        <h2 className='text-2xl font-bold py-4'>{heading}</h2>

        <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
            <button className='bg-white rounded-full p-1 shadow-md absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft/></button>
            <button className='bg-white rounded-full p-1 shadow-md absolute right-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight/></button>
            { loading ? (
                loadingList.map((_, index) => (
                    <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                        <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>
                        </div>
                        <div className='p-4 grid w-full gap-2'>
                            <h2 className='md:text-lg font-medium text-base text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'>
                            </h2>
                            <p className='text-sm text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                            <div className='flex gap-3 w-full'>
                                <p className='text-base font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                            </div>
                            <button className='px-3 py-0.5 rounded-full text-sm p-1 w-full bg-slate-200 animate-pulse'></button>
                        </div>
                    </div>
                ))
                ) : (
                data.map((product) => (
                    <Link key={product._id} to={"/product/"+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                        <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                            <img 
                                src={product.productImage[0]} 
                                alt={product.productName} // Add alt text
                                className='object-scale-down h-full hover:scale-110 transition-all' 
                            />
                        </div>
                        <div className='p-4 grid'>
                            <h2 className='md:text-lg font-medium text-base text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                            <p className='text-sm text-slate-500'>{product?.category}</p>
                            <div className='flex items-center gap-3'>
                                <p className='text-base font-medium'>{ displayCurrency(product?.price)}</p>
                            </div>
                            <button className='bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full text-sm' onClick={(e)=>handleAddToCart(e,product?._id)}>เพิ่มลงตะกร้า</button>
                        </div>
                    </Link>
                ))
            )
            }
        </div>

    </div>
  )
}

export default HorizontalCardProduct