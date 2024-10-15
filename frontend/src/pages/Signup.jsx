import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa' // ใช้ไอคอนลูกตา
import LOGO from '../assest/banner/LOGO.png'
import SummaryApi from '../common'
import { toast } from 'react-toastify'

const Signup = () => {
	const [data, setData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
	const [showPassword, setShowPassword] = useState(false); // สำหรับ password
	const [showConfirmPassword, setShowConfirmPassword] = useState(false); // สำหรับ confirm password
	const navigate = useNavigate()

	const handleOnChange = (e) => {
		const { name, value } = e.target
		setData(prev => ({ ...prev, [name]: value }))
	}

	const handleOnSubmit = async (e) => {
		e.preventDefault()
		if(data.password === data.confirmPassword){
			const dataResponse = await fetch(SummaryApi.signUP.url,{
				method : SummaryApi.signUP.method,
				headers : {
					'content-type' : 'application/json'
				},
				body : JSON.stringify(data)
			})
	
			const dataApi = await dataResponse.json()
			if(dataApi.success){
				toast.success(dataApi.message)
				navigate('/login')
			}else{
				toast.error(dataApi.message)

			}
		}else{
			toast.error("Password and Confirm Password do not match")
		}
	}

	return (
		<section id='signup' className='container mx-auto px-4 flex items-center justify-center h-screen'>
			<div className='flex w-full'>
				<div className='w-1/2 flex items-center justify-end mr-2'>
					<img src={LOGO} alt='LOGO' className='w-full h-full object-contain' />
				</div>
				<div className='w-1/2 flex items-center justify-start ml-2'>
					<div className='bg-white p-12 rounded-lg shadow-md w-full max-w-lg'>
						<h2 className='text-3xl font-bold mb-6'>สมัครสมาชิก</h2>
						<form onSubmit={handleOnSubmit}>
							<InputField
								label="Name"
								type="text"
								name="name"
								value={data.name}
								onChange={handleOnChange}
							/>
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
								showPassword={showPassword}
								toggleShowPassword={() => setShowPassword(!showPassword)} // ฟังก์ชันแสดง/ซ่อนรหัสผ่าน
								onChange={handleOnChange}
							/>
							<PasswordField
								label="Confirm Password"
								name="confirmPassword"
								value={data.confirmPassword}
								showPassword={showConfirmPassword}
								toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)} // ฟังก์ชันแสดง/ซ่อน confirm password
								onChange={handleOnChange}
							/>
							<div className='flex items-center justify-between mt-6'>
								<button className='bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded' type='submit'>
									สมัครสมาชิก
								</button>
							</div>
						</form>
						<p className='mt-4'>เป็นสมาชิกแล้ว? <Link to='/login' className='text-red-500 hover:text-red-800'>เข้าสู่ระบบ</Link></p>
					</div>
				</div>
			</div>
		</section>
	)
}

// Reusable InputField component
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

// PasswordField component พร้อมไอคอนแสดง/ซ่อนรหัสผ่าน
const PasswordField = ({ label, name, value, onChange, showPassword, toggleShowPassword }) => (
	<div className='mb-4 relative'>
		<label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={name}>
			{label}
		</label>
		<div className='relative'>
			<input
				className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10'
				id={name}
				type={showPassword ? 'text' : 'password'}
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

export default Signup
