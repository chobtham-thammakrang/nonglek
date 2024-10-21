import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaUser, FaShoppingCart } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Logo from './Logo'
import Navbar from './Navbar'
import SummaryApi from '../common'
import { setUserDetails } from '../store/userSlice'
import ROLE from '../common/role'
import Context from '../context/index'
import { setAuthToken, getAuthToken } from '../utils/auth'

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const token = getAuthToken();

  const handleLogout = async () => {
    try {
      const fetchData = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: 'include',
        headers : {
          'Authorization': `Bearer ${token}`
        },
      });
  
      if (fetchData.status === 401) {
        setAuthToken(null);
        dispatch(setUserDetails(null));
        localStorage.removeItem('authToken');
        toast.error('เซสชั่นของคุณหมดเวลาแล้ว กรุณาเข้าสู่ระบบอีกครั้ง');
        navigate("/login");
        return;
      }
  
      const data = await fetchData.json();
      if (data.success) {
        setAuthToken(null);
        dispatch(setUserDetails(null));
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("เกิดข้อผิดพลาดระหว่างการออกจากระบบ");
    }
  };

  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className='flex items-center'>
          <Link to={"/"}>
            <Logo w={322} h={37} />
          </Link>
        </div>

        <div className="flex items-center">
          <Navbar />

          <div className='flex items-center gap-7 ml-4'>
            <div className='relative flex justify-center'>
              {user?._id && (
                <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(prev => !prev)}>
                  {user?.profilePic ? (
                    <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                  ) : (
                    <FaUser />
                  )}
                </div>
              )}

              {menuDisplay && (
                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                  <nav>
                    {user?.role === ROLE.GENERAL && (
                      <Link to={"/profile/users-detail"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>โปรไฟล์</Link>
                    )}
                    {user?.role === ROLE.ADMIN && (
                      <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>หน้าต่างแอดมิน</Link>
                    )}
                  </nav>
                </div>
              )}
            </div>

            {user?._id && (
              <Link to={"/cart"} className='text-2xl relative'>
                <span><FaShoppingCart /></span>
                <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                  <p className='text-sm'>{context?.cartProductCount}</p>
                </div>
              </Link>
            )}

            <div>
              {user?._id ? (
                <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>ออกจากระบบ</button>
              ) : (
                <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>เข้าสู่ระบบ</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header