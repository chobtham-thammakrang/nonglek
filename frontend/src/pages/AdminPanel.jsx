import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaRegCircleUser } from 'react-icons/fa6'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ROLE from '../common/role'

const AdminPanel = () => {
    const user = useSelector(state=>state?.user?.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (user === null) {
            // User data is still loading
            return;
        }
        
        if (user?.role !== ROLE.ADMIN) {
            toast.error("คุณไม่มีสิทธิเข้าถึงหน้านี้");
            navigate("/");
        }
    }, [user, navigate]);

  return (
    <div className='min-h-[calc(100vh-120px)] md:flex'>
        <aside className='bg-white min-h-full w-full max-w-60'>
            <div className="h-32 flex items-center justify-center flex-col">
                <div className='text-5xl cursor-pointer relative flex justify-center'>
                    {user?.profilePic ? (
                        <img src={user?.profilePic} alt={user?.name} className='w-20 h-20 rounded-full object-cover' />
                    ) : (
                        <FaRegCircleUser />
                    )}
                </div>
                <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                <p className='capitalize text-sm'>{user?.role}</p>
            </div>

            <div>
                <nav className='grid p-4'>
                    <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>ผู้ใช้ทั้งหมด</Link>
                    <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100'>สินค้าทั้หมด</Link>
                    <Link to={"all-product-Order"} className='px-2 py-1 hover:bg-slate-100'>รายการสั่งซื้อทั้งหมด</Link>
                </nav>
            </div>
        </aside>

        <main className='w-full h-full p-2'>
            <Outlet />
        </main>
    </div>
  )
}

export default AdminPanel