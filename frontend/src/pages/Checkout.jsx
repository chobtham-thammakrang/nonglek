import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Context from '../context';
import SummaryApi from '../common';
import displayCurrency from '../helpers/displayCurrency';
import { getAuthToken } from "../utils/auth";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [address, setAddress] = useState({
    houseNumber: '',
    alley: '',
    road: '',
    district: '',
    subDistrict: '',
    province: '',
    postalCode: ''
  });
  const [contactNumber, setContactNumber] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const navigate = useNavigate();
  const { fetchUserAddToCart } = useContext(Context);

  const token = getAuthToken();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: 'include',
        headers: {
          "content-type": 'application/json',
          "Authorization": `Bearer ${token}`
        },
      });
      const responseData = await response.json();
      if (responseData.success) {
        setCartItems(responseData.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const formData = new FormData();
      formData.append('items', JSON.stringify(cartItems.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price
      }))));
      formData.append('address', JSON.stringify(address));
      formData.append('contactNumber', contactNumber);
      formData.append('additionalDetails', additionalDetails);
  
      console.log('Sending order data:', Object.fromEntries(formData));
  
      const response = await fetch(SummaryApi.createOrder.url, {
        method: 'POST',
        credentials: 'include',
        body: formData,
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to place order');
      }
  
      const data = await response.json();
      toast.success('สร้างรายการสั่งซื้อ สำเร็จ!');
      fetchUserAddToCart();
      navigate('/order-confirmation', { state: { orderId: data.orderId } });
    } catch (error) {
      console.error('สร้างรายการสั่งซื้อ ล้มเหลว:', error);
      toast.error(error.message || 'An error occurred while placing the order');
    } finally {
      setIsSubmitting(false); 
    }
  };

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const totalPrice = cartItems.reduce((total, item) => 
    total + (item.productId?.price || 0) * item.quantity, 0);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">รายการสั่งซื้อ</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg p-8 md:p-12 max-w-2xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">รายการ</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm">
                <div className="flex items-center gap-4">
                  <img
                    src={item.productId?.productImage?.[0]}
                    alt={item.productId?.productName}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <span className="text-gray-600">{item.productId?.productName} x {item.quantity}</span>
                </div>
                <span className="text-gray-800 font-medium">{displayCurrency((item.productId?.price || 0) * item.quantity)}</span>
              </div>
            ))}
            <div className="text-xl font-bold text-right mt-4">
              ราคารวม: {displayCurrency(totalPrice)}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">ที่อยู่</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 mb-2">บ้านเลขที่</label>
              <input
                type="text"
                name="houseNumber"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={address.houseNumber}
                onChange={handleAddressChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">ซอย</label>
              <input
                type="text"
                name="alley"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={address.alley}
                onChange={handleAddressChange}
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">ถนน</label>
              <input
                type="text"
                name="road"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={address.road}
                onChange={handleAddressChange}
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">ตำบล</label>
              <input
                type="text"
                name="subDistrict"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={address.subDistrict}
                onChange={handleAddressChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">อำเภอ</label>
              <input
                type="text"
                name="district"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={address.district}
                onChange={handleAddressChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">จังหวัด</label>
              <input
                type="text"
                name="province"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={address.province}
                onChange={handleAddressChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">รหัสไปรษณีย์</label>
              <input
                type="text"
                name="postalCode"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={address.postalCode}
                onChange={handleAddressChange}
                required
              />
            </div>
          </div>
          <div className="mt-6 p-6 bg-blue-50 border border-blue-300 rounded-lg shadow-md">
            <p className="text-gray-800 font-medium leading-relaxed">
              🚚 <strong>ค่าจัดส่ง:</strong> ทางร้านจะคิดค่าขนส่งจากระยะทาง (นครปฐมส่งฟรี) <br />
              ค่าขนส่งทางร้านจะแจ้งผ่านทางเบอร์มือถือของคุณลูกค้าและรายการสั่งซื้อ <br />
              สามารถดูรายละเอียดได้ผ่านทางหน้าโปรไฟล์ รายการสั่งซื้อ
            </p>
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">เบอร์โทร</label>
          <input
            type="tel"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">รายละเอียดเพิ่มเติม</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={additionalDetails}
            onChange={(e) => setAdditionalDetails(e.target.value)}
            placeholder="Additional details (optional)"
          />
          <div className="mt-6 p-6 bg-green-50 border border-green-300 rounded-lg shadow-md">
            <p className="text-gray-800 font-medium leading-relaxed">
              📝 <strong>รายละเอียดเพิ่มเติม:</strong> ลูกค้าสามารถใส่รายละเอียดเพิ่มเติม เช่น <br />
              สีและรายละเอียดของสินค้า, วันส่งสินค้า (สามารถนัดวันส่งได้ตามฤกษ์ยามที่ลูกค้าต้องการ พร้อมบริการติดตั้งฟรี) <br />
              ทางร้านจะมีการติดต่อกลับเพื่อพูดคุยรายละเอียดเพิ่มเติม
            </p>
          </div>
        </div>

        <div className="mt-6 p-6 bg-yellow-50 border border-yellow-300 rounded-lg shadow-md">
          <p className="text-gray-800 font-medium leading-relaxed">
            🎨 <strong>สินค้าเป็นสินค้าสั่งทำ:</strong> <br />
            หลังจากพูดคุยรายละเอียด สี, ค่าจัดส่ง, วันเวลาจัดส่งและติดตั้ง <br />
            ลูกค้าสามารถดูลายละเอียดสินค้า, ค่าสินค้า, ค่าจัดส่ง, และวันเวลาจัดส่งและติดตั้งได้ที่หน้าโปรไฟล์ รายการสั่งซื้อ <br />
            เมื่อตรวจสอบข้อมูลถูกต้องครบถ้วนที่ รายการสั่งซื้อ ลูกค้าสามารถอัปโหลดหลักฐานการโอนเงินเพื่อยืนยันการสั่งซื้อ <br />
            ทางร้านจะใช้เวลาจัดทำสินค้า 5-6 วัน หลังจากนั้นจึงจัดส่งสินค้าและติดตั้งตามวันเวลาที่ลูกค้าเลือก
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md shadow-lg hover:bg-blue-700 transition duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'กำลังสร้างรายการสั่งซื้อ...' : 'สร้างรายการสั่งซื้อ'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
