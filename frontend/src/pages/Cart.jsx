import React, { useContext, useEffect, useState, useCallback } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom'
import { getAuthToken } from "../utils/auth";

const Cart = () => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(4).fill(null)

    const token = getAuthToken();

    const fetchData = async() =>{
        // const token = localStorage.getItem('authToken');
        
        const response = await fetch(SummaryApi.addToCartProductView.url,{
            method : SummaryApi.addToCartProductView.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
       

        const responseData = await response.json()

        if(responseData.success){
            setData(responseData.data)
        }


    }

    const handleLoading = useCallback(async() => {
        await fetchData()
    }, []) // Empty dependency array since fetchData doesn't depend on any props or state

    useEffect(()=>{
        setLoading(true)
        handleLoading()
        setLoading(false)
    }, [handleLoading]) // Add handleLoading to the dependency array


    const increaseQty = async(id,qty) =>{
        const response = await fetch(SummaryApi.updateCartProduct.url,{
            method : SummaryApi.updateCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body : JSON.stringify(
                {   
                    _id : id,
                    quantity : qty + 1
                }
            )
        })

        const responseData = await response.json()


        if(responseData.success){
            fetchData()
        }
    }


    const decraseQty = async(id,qty) =>{
       if(qty >= 2){
            const response = await fetch(SummaryApi.updateCartProduct.url,{
                method : SummaryApi.updateCartProduct.method,
                credentials : 'include',
                headers : {
                    "content-type" : 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body : JSON.stringify(
                    {   
                        _id : id,
                        quantity : qty - 1
                    }
                )
            })

            const responseData = await response.json()


            if(responseData.success){
                fetchData()
            }
        }
    }

    const deleteCartProduct = async(id)=>{
        const response = await fetch(SummaryApi.deleteCartProduct.url,{
            method : SummaryApi.deleteCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body : JSON.stringify(
                {   
                    _id : id,
                }
            )
        })

        const responseData = await response.json()

        if(responseData.success){
            fetchData()
            context.fetchUserAddToCart()
        }
    }

    const totalQty = data.reduce((previousValue, currentValue) => 
      currentValue.productId ? previousValue + currentValue.quantity : previousValue, 0);

    const totalPrice = data.reduce((preve, curr) => 
      curr.productId ? preve + (curr.quantity * (curr.productId.price || 0)) : preve, 0);
  return (
    <div className='container mx-auto'>
        
        <div className='text-center text-lg my-3'>
            {
                data.length === 0 && !loading && (
                    <p className='bg-white py-5'>ไม่มีสินค้า</p>
                )
            }
        </div>

        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>   
                {/***view product */}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart?.map((el,index) => {
                                return(
                                    <div key={el+"Add To Cart Loading"+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                    </div>
                                )
                            })
                             
                        ) : (
                          data.map((product,index)=>{
                           return(
                            <div key={product?._id+"Add To Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                {product?.productId ? (
                                  <>
                                    <div className='w-32 h-32 bg-slate-200'>
                                      <img src={product.productId.productImage?.[0]} className='w-full h-full object-scale-down mix-blend-multiply' alt={product.productId.productName} />
                                    </div>
                                    <div className='px-4 py-2 relative'>
                                      <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={() => deleteCartProduct(product._id)}>
                                        <MdDelete/>
                                      </div>
                                      <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product.productId.productName}</h2>
                                      <p className='capitalize text-slate-500'>{product.productId.category || 'N/A'}</p>
                                      <div className='flex items-center justify-between'>
                                        <p className='text-red-600 font-medium text-lg'>{displayCurrency(product.productId.price || 0)}</p>
                                        <p className='text-slate-600 font-semibold text-lg'>{displayCurrency((product.productId.price || 0) * (product.quantity || 0))}</p>
                                      </div>
                                      <div className='flex items-center gap-3 mt-1'>
                                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => decraseQty(product._id, product.quantity)}>-</button>
                                        <span>{product.quantity}</span>
                                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => increaseQty(product._id, product.quantity)}>+</button>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <div className='col-span-2 flex items-center justify-center'>
                                    <p className='text-red-600 font-medium'>สินค้าถูกลบ</p>
                                    <button className='ml-4 bg-red-600 text-white px-2 py-1 rounded' onClick={() => deleteCartProduct(product._id)}>นำออกจากตะกร้า</button>
                                  </div>
                                )}
                            </div>
                           )
                          })
                        )
                    }
                </div>


                {/***summary  */}
                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                        {
                            loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                                
                            </div>
                            ) : (
                                <div className='h-36 bg-white'>
                                    <h2 className='text-white bg-red-600 px-4 py-1'>รวม</h2>
                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>จำนวน</p>
                                        <p>{totalQty}</p>
                                    </div>

                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>ราคารวม</p>
                                        <p>{displayCurrency(totalPrice)}</p>    
                                    </div>

                                    <Link to="/checkout" className="bg-blue-600 p-2 text-white w-full mt-2 block text-center">
                                        สร้างรายการสั่งซื้อ
                                    </Link>
                                </div>
                            )
                        }
                </div>
        </div>
    </div>
  )
}

export default Cart