import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // ใช้ไอคอนลูกตา
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showPassword, setShowPassword] = useState(false); // สำหรับ password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // สำหรับ confirm password
  const location = useLocation();
  const navigate = useNavigate();
  const { email, token } = location.state || {};

  console.log("Token received in ResetPassword:", token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('รหัสผ่านไม่ตรงกัน');
      return;
    }
    if (passwordStrength !== 'Strong' && passwordStrength !== 'Medium') {
      toast.error('โปรดเลือกรหัสผ่านที่ปลอดภัยกว่านี้');
      return;
    }
    try {
      console.log("Sending reset password request with token:", token); // Log the token being sent
      const response = await fetch(SummaryApi.resetPassword.url, {
        method: SummaryApi.resetPassword.method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
        credentials: "include",
      });

      console.log("Response status:", response.status);
      
      const data = await response.json();
      console.log("Response data:", data);
      
      if (response.ok) {
        toast.success(data.message);
        navigate('/login');
      } else {
        toast.error(data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const checkPasswordStrength = (password) => {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

    if (strongRegex.test(password)) {
      setPasswordStrength('Strong');
    } else if (mediumRegex.test(password)) {
      setPasswordStrength('Medium');
    } else {
      setPasswordStrength('Weak');
    }
  };

  return (
    <div className="container mx-auto px-4 flex items-center justify-center h-screen">
      <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6">รีเซ็ตรหัสผ่าน</h2>
        <form onSubmit={handleSubmit}>
          <PasswordField
            label="New Password"
            name="password"
            value={password}
            showPassword={showPassword}
            toggleShowPassword={() => setShowPassword(!showPassword)} // ฟังก์ชันแสดง/ซ่อนรหัสผ่าน
            onChange={(e) => {
              setPassword(e.target.value);
              checkPasswordStrength(e.target.value);
            }}
            passwordStrength={passwordStrength}
          />
          <PasswordField
            label="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            showPassword={showConfirmPassword}
            toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)} // ฟังก์ชันแสดง/ซ่อน confirm password
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded"
            type="submit"
          >
            รีเซ็ตรหัสผ่าน
          </button>
        </form>
      </div>
    </div>
  );
};

// PasswordField component พร้อมไอคอนแสดง/ซ่อนรหัสผ่าน
const PasswordField = ({ label, name, value, onChange, showPassword, toggleShowPassword, passwordStrength }) => (
  <div className="mb-4 relative">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
      {label}
    </label>
    <div className="relative">
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
        id={name}
        type={showPassword ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
      <div className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'>
        <button type="button" onClick={toggleShowPassword} className='text-gray-500 focus:outline-none'>
          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      </div>
    </div>
    {passwordStrength && (
      <div className={`text-sm mt-1 ${
        passwordStrength === 'Strong' ? 'text-green-500' :
        passwordStrength === 'Medium' ? 'text-yellow-500' : 'text-red-500'
      }`}>
        Password strength: {passwordStrength}
      </div>
    )}
  </div>
);

export default ResetPassword;
