import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LOGO from '../assest/banner/LOGO.png';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const Forgotpassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
  
    setIsLoading(true);
  
    try {
      const controller = new AbortController();
  
      const response = await Promise.race([
        fetch(SummaryApi.forgotPassword.url, {
          method: SummaryApi.forgotPassword.method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
          credentials: 'include',
          mode: 'cors',
          signal: controller.signal,
        }),
      ]);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        navigate('/verify-otp', { state: { email } });
      } else {
        toast.error(data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      if (error.message === 'Request timed out') {
        toast.error('Request timed out. Please try again.');
      } else {
        console.error('Error details:', error);
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [email, navigate]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <section id='forgot-password' className='container mx-auto px-4 flex items-center justify-center h-screen'>
      <div className='flex w-full'>
        <div className='w-1/2 flex items-center justify-end mr-2'>
          <img src={LOGO} alt='LOGO' className='w-full h-full object-contain' />
        </div>
        <div className='w-1/2 flex items-center justify-start ml-2'>
          <div className='bg-white p-12 rounded-lg shadow-md w-full max-w-lg'>
            <h2 className='text-3xl font-bold mb-6'>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
              <InputField
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={handleOnChange}
              />
              <div className='flex items-center justify-between mt-6'>
                <button
                  className='bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded'
                  type='submit'
                  disabled={isLoading}
                >
                  {isLoading ? 'In progress...' : 'Reset Password'}
                </button>
              </div>
            </form>
            <p className='mt-4'>Remember your password? <Link to='/login' className='text-red-500 hover:text-red-800'>Log In</Link></p>
          </div>
        </div>
      </div>
    </section>
  );
};

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
);

export default Forgotpassword;
