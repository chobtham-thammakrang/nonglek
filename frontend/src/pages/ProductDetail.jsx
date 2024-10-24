import React, { useCallback, useContext, useEffect, useState } from 'react'
import  { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import displayCurrency from '../helpers/displayCurrency';
import CategroyWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const ProductDetails = () => {
  const [data,setData] = useState({
    productName : "",
    shape : "",
    category : "",
    productImage : [],
    description : "",
    price : "",
  })
  const params = useParams()
  const [loading,setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage,setActiveImage] = useState("")

  const [zoomImageCoordinate,setZoomImageCoordinate] = useState({
    x : 0,
    y : 0
  })
  const [zoomImage,setZoomImage] = useState(false)

  const { fetchUserAddToCart } = useContext(Context)

  const navigate = useNavigate()

  const fetchProductDetails = async()=>{
    setLoading(true)
    const response = await fetch(SummaryApi.productDetail.url,{
      method : SummaryApi.productDetail.method,
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify({
        productId : params?.id
      })
    })
    setLoading(false)
    const dataReponse = await response.json()

    setData(dataReponse?.data)
    setActiveImage(dataReponse?.data?.productImage[0])

  }

  // console.log("data",data)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(()=>{
    fetchProductDetails()
  },[params])

  const handleMouseEnterProduct = (imageURL)=>{
    setActiveImage(imageURL)
  }

  const handleZoomImage = useCallback((e) =>{
    setZoomImage(true)
    const { left , top, width , height } = e.target.getBoundingClientRect()
    // console.log("coordinate", left, top , width , height)

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCoordinate({
      x,
      y
    })
  },[zoomImageCoordinate])

  const handleLeaveImageZoom = ()=>{
    setZoomImage(false)
  }


  const handleAddToCart = async(e,id) =>{
    await addToCart(e,id)
    fetchUserAddToCart()
  }

  const handleBuyProduct = async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
    navigate("/cart")

  }

  return (
    <div className='container mx-auto p-4'>

      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
          {/***product Image */}
          <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

              <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
                  <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}/>

                    {/**product zoom */}
                    {
                      zoomImage && (
                        <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                          <div
                            className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                            style={{
                              background : `url(${activeImage})`,
                              backgroundRepeat : 'no-repeat',
                              backgroundPosition : `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `
    
                            }}
                          >
    
                          </div>
                        </div>
                      )
                    }
                  
              </div>

              <div className='h-full'>
                  {
                    loading ? (
                      <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                        {
                          productImageListLoading.map((el,index) =>{
                            return(
                              <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"+index}>
                              </div>
                            )
                          })
                        }
                      </div>
                      
                    ) : (
                      <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                        {
                          data?.productImage?.map((imgURL,index) =>{
                            return(
                              <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgURL}>
                                <img src={imgURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={()=>handleMouseEnterProduct(imgURL)}  onClick={()=>handleMouseEnterProduct(imgURL)}/>
                              </div>
                            )
                          })
                        }
                      </div>
                    )
                  }
              </div>
          </div>

           {/***product details */}
           {
            loading ? (
              <div className='grid gap-1 w-full'>
                <p className='bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block'></p>
                <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full'></h2>
                <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full'></p>

                <div className='text-red-600 bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full'>
    
                </div>

                <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full'>
                  <p className='text-red-600 bg-slate-200 w-full'></p>
                  <p className='text-slate-400 line-through bg-slate-200 w-full'></p>
                </div>

                <div className='flex items-center gap-3 my-2 w-full'>
                  <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                  <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                </div>

                <div className='w-full'>
                  <p className='text-slate-600 font-medium my-1 h-6 lg:h-8   bg-slate-200 rounded animate-pulse w-full'></p>
                  <p className=' bg-slate-200 rounded animate-pulse h-10 lg:h-12  w-full'></p>
                </div>
              </div>
            ) : 
            (
              <div className='flex flex-col gap-1'>
                <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.shape}</p>
                <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
                <p className='capitalize text-slate-400'>{data?.category}</p>

                <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
                  <p className='text-red-600'>{displayCurrency(data.price)}</p>
                </div>

                <div className='flex items-center gap-3 my-2'>
                  <button
                    className={`border-2 ${data?.stock > 0 ? 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white' : 'border-gray-400 text-gray-400 cursor-not-allowed'} rounded px-3 py-1 min-w-[120px] font-medium`}
                    onClick={(e) => data?.stock > 0 && handleBuyProduct(e, data?._id)}
                    disabled={data?.stock === 0}
                  >
                    ซื้อ
                  </button>
                  <button
                    className={`border-2 ${data?.stock > 0 ? 'border-red-600 bg-red-600 text-white hover:text-red-600 hover:bg-white' : 'border-gray-400 bg-gray-400 text-white cursor-not-allowed'} rounded px-3 py-1 min-w-[120px] font-medium`}
                    onClick={(e) => data?.stock > 0 && handleAddToCart(e, data?._id)}
                    disabled={data?.stock === 0}
                  >
                    เพิ่มลงตะกร้า
                  </button>
                </div>

                <div>
                  <p className='text-xl text-red-600'>
                    {data?.stock > 0 ? `คงเหลือ: ${data?.stock}` : 'สินค้าหมด'}
                  </p>
                  <p className='text-slate-600 font-medium my-1'>รายละเอียดสินค้า : </p>
                  <p>{data?.description}</p>
                </div>

                <div className="mt-6 p-6 bg-yellow-50 border border-yellow-300 rounded-lg shadow-md">
                  <p className="text-gray-800 font-medium leading-relaxed">
                    🎨 <strong>สินค้าเป็นสินค้าสั่งทำ:</strong> <br />
                    ลูกค้าสามารถเลือกลายละเอียด สี, ค่าจัดส่ง, วันเวลาจัดส่งและติดตั้ง<br />
                    ได้ในช่องใส่รายละเอียดเพื่มเติม หน้าสร้างรายการสั่งซื้อ<br />
                    ทางร้านจะติดต่อกลับเพื่อขอข้อมูลที่จำเป็นเพิ่มเติม<br />
                  </p>
                </div>
              </div>
            )
           }

      </div>

      {
        data.category && (
          <CategroyWiseProductDisplay category={data?.category} heading={"สินค้าที่เกี่ยวข้อง"}/>
        )
      }

    </div>
  )
}

export default ProductDetails