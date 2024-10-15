import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa' // ใช้ไอคอนลูกตา
import LOGO from '../assest/banner/LOGO.png'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import Context from '../context'
import { setAuthToken } from '../utils/auth';

const Login = () => {
    const [data, setData] = useState({ email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false); // State สำหรับเปิด/ปิดการแสดงรหัสผ่าน
    const navigate = useNavigate()
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            const dataResponse = await fetch(SummaryApi.signIn.url, {
                method: SummaryApi.signIn.method,
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const dataApi = await dataResponse.json();
            console.log("Login response:", dataApi);

            if (dataApi.success) {
                console.log("Login successful, token:", dataApi.token);
                setAuthToken(dataApi.token);
                console.log("Token after setAuthToken:", localStorage.getItem('authToken'));
                toast.success(dataApi.message);
                navigate('/');
                fetchUserDetails();
                fetchUserAddToCart();
            } else {
                console.log("Login failed:", dataApi.message);
                toast.error(dataApi.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("An error occurred during login");
        }
    };

    return (
        <section id='login' className='container mx-auto px-4 flex items-center justify-center h-screen'>
            <div className='flex w-full'>
                <div className='w-1/2 flex items-center justify-end mr-2'>
                    <img src={LOGO} alt='LOGO' className='w-full h-full object-contain' />
                </div>
                <div className='w-1/2 flex items-center justify-start ml-2'>
                    <div className='bg-white p-12 rounded-lg shadow-md w-full max-w-lg'>
                        <h2 className='text-3xl font-bold mb-6'>เข้าสู่ระบบ</h2>
                        <form onSubmit={handleOnSubmit}>
                            <InputField
                                label="Email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleOnChange}
                            />
                            <PasswordField
                                label="Password"
                                name="password"
                                value={data.password}
                                onChange={handleOnChange}
                                showPassword={showPassword}
                                toggleShowPassword={() => setShowPassword(!showPassword)} // ฟังก์ชันสำหรับสลับเปิด/ปิดการแสดงรหัสผ่าน
                            />
                            <div className='flex items-center justify-between mt-6'>
                                <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded' type='submit'>
                                    เข้าสู่ระบบ
                                </button>
                                <Link to='/forgot-password' className='text-sm text-red-500 hover:text-red-800'>
                                    ลืมรหัสผ่าน?
                                </Link>
                            </div>
                        </form>
                        <p className='mt-4'>ยังไม่มีบัญชีผู้ใช้? <Link to='/sign-up' className='text-red-500 hover:text-red-800'>สมัครสมาชิก</Link></p>
                    </div>
                </div>
            </div>
        </section>
    )
}

const InputField = ({ label, type, name, value, onChange }) => (
    <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={name}>
            {label}
        </label>
        <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id={name}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={`Enter your ${label.toLowerCase()}`}
        />
    </div>
)

// Component สำหรับรหัสผ่านพร้อมไอคอนเปิด/ปิด
const PasswordField = ({ label, name, value, onChange, showPassword, toggleShowPassword }) => (
    <div className='mb-4 relative'>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={name}>
            {label}
        </label>
        <div className='relative'>
            <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10'
                id={name}
                type={showPassword ? 'text' : 'password'} // แสดงรหัสผ่านหาก state เป็น true
                name={name}
                value={value}
                onChange={onChange}
                placeholder={`Enter your ${label.toLowerCase()}`}
            />
            <div className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'>
                <button type='button' onClick={toggleShowPassword} className='text-gray-500 focus:outline-none'>
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
            </div>
        </div>
    </div>
)

export default Login
