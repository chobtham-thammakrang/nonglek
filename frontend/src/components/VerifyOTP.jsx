import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SummaryApi from '../common/index';
import { toast } from 'react-toastify';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(120);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (countdown === 0) {
      toast.error('OTP has expired. Please request a new one.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(SummaryApi.verifyOTP.url, {
        method: SummaryApi.verifyOTP.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        navigate('/reset-password', { state: { email, token: data.token } });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await fetch(SummaryApi.forgotPassword.url, {
        method: SummaryApi.forgotPassword.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        toast.success('OTP resent successfully');
        setCountdown(120);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 flex items-center justify-center h-screen">
      <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6">Verify OTP</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
              Enter OTP
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the OTP sent to your email"
            />
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Time remaining: {Math.floor(countdown / 60)}:{countdown % 60 < 10 ? '0' : ''}{countdown % 60}
            </p>
          </div>

          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded"
            type="submit"
            disabled={countdown === 0 || isLoading} // Disable button when loading or countdown is 0
          >
            {isLoading ? 'Loading...' : 'Verify OTP'}
          </button>
        </form>
        <button
          className="text-red-500 hover:text-red-700 text-sm mt-4"
          onClick={handleResendOTP}
          disabled={countdown > 0}
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP;