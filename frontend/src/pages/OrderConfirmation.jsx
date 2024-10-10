// src/pages/OrderConfirmation.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">สร้างรายการสั่งซื้อแล้ว</h1>
      {orderId ? (
        <p className="text-lg">ขอบคุณสำหรับสร้างรายการสั่งซื้อ! ID รายการสั่งซื้อคือ: <span className="font-semibold">{orderId}</span></p>
      ) : (
        <p className="text-lg">ขอบคุณสำหรับสร้างรายการสั่งซื้อ!</p>
      )}
      <br></br>
      <Link to="/profile/product-Order" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
        ดูรายการสั่งซื้อของคุณ
      </Link>
    </div>
  );
};

export default OrderConfirmation;