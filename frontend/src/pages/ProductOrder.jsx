import React, { useState, useEffect } from 'react';
import SummaryApi from '../common';
import displayCurrency from '../helpers/displayCurrency';
import { FaEdit } from 'react-icons/fa';
import UploadReceiptModal from '../components/UploadReceiptModal';
import { getAuthToken } from "../utils/auth";


const ProductOrder = () => {
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [editingOrder, setEditingOrder] = useState(null);
  const [showUploadReceiptModal, setShowUploadReceiptModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const token = getAuthToken();

  const handlePaymentButtonClick = (orderId) => {
    setSelectedOrderId(orderId);
    setShowUploadReceiptModal(true);
  };

  const handleCloseModal = () => {
    setShowUploadReceiptModal(false);
    setSelectedOrderId(null);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(SummaryApi.getUserOrders.url, {
        method: SummaryApi.getUserOrders.method,
        credentials: 'include',
        headers : {
          "Authorization": `Bearer ${token}`
        },
      });
      const data = await response.json();
      if (data.success) {
        const sortedOrders = data.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedOrders);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const handleAdditionalDetailsUpdate = async (orderId, additionalDetails) => {
    try {
      const response = await fetch(`${SummaryApi.updateOrderAdditionalDetails.url}/${orderId}`, {
        method: SummaryApi.updateOrderAdditionalDetails.method,
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({ additionalDetails }),
      });
      const data = await response.json();
      if (data.success) {
        setOrders(orders.map(order =>
          order._id === orderId ? { ...order, additionalDetails } : order
        ));
        setEditingOrder(null);
      }
    } catch (error) {
      console.error('Error updating additional details:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">รายการสั่งซื้อของคุณ</h1>
      {orders.length === 0 ? (
        <p className="text-center text-xl text-gray-600">คุณยังไม่มีรายการสั่งซื้อ</p>
      ) : (
        <div className="space-y-12">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-8 rounded-xl shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="absolute top-4 right-4">
                <p className={`text-lg font-bold px-4 py-2 rounded-full ${
                  order.status === 'จัดส่งแล้ว' ? 'text-green-500' : 
                  order.status === 'อยู่ระหว่าจัดส่ง' ? 'text-purple-500' :
                  order.status === 'กำลังดำเนินการ' ? 'text-blue-500' :
                  'text-yellow-500'
                }`}>
                  {order.status}
                </p>
              </div>
              <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="w-full lg:w-1/2">
                  <h2 className="text-3xl font-semibold mb-6 text-gray-800">รหัสรายการ #{order._id}</h2>
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="font-semibold text-gray-600">ราคาสินค้ารวม:</p>
                      <p className="text-2xl text-green-600 font-bold">{displayCurrency(order.totalAmount)}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-600">ค่าขนส่ง:</p>
                      <p className="text-lg">{displayCurrency(order.shippingCost)}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-600">เบอร์โทร:</p>
                      <p className="text-lg">{order.contactNumber}</p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <p className="font-semibold text-gray-600 mb-2">ที่อยู่:</p>
                    <p className="text-lg">{`${order.address.houseNumber}, ${order.address.alley}, ${order.address.road}, ${order.address.district}, ${order.address.subDistrict}, ${order.address.province}, ${order.address.postalCode}`}</p>
                  </div>

                  {order.additionalDetails && (
                    <div className="mb-6">
                      <p className="font-semibold text-gray-600 mb-2 flex items-center">
                        รายละเอียดเพิ่มเติม:
                        {editingOrder !== order._id && (
                          <FaEdit
                            className="ml-2 text-gray-500 cursor-pointer hover:text-gray-700"
                            onClick={() => setEditingOrder(order._id)}
                          />
                        )}
                      </p>
                      {editingOrder === order._id ? (
                        <textarea
                          value={order.additionalDetails || ''}
                          onChange={(e) => setOrders(orders.map(o => o._id === order._id ? { ...o, additionalDetails: e.target.value } : o))}
                          onBlur={() => handleAdditionalDetailsUpdate(order._id, order.additionalDetails)}
                          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows="3"
                        />
                      ) : (
                        <p className="text-lg">{order.additionalDetails || 'No additional details provided'}</p>
                      )}
                    </div>
                  )}
                
                </div>
                <div className="w-full lg:w-1/2">
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800">สินค้า:</h3>
                  <ul className="space-y-6">
                    {order.items.map((item) => (
                      <li key={item._id} className="flex items-center gap-6 bg-gray-50 p-4 rounded-lg transition-all duration-300 hover:bg-gray-100">
                        {/* Check if item.productId is not null before rendering the image */}
                        {item.productId && (
                          <img
                            src={item.productId.productImage[0]}
                            alt={item.productId.productName}
                            className="w-24 h-24 object-cover rounded-lg shadow"
                          />
                        )}
                        <div>
                          {/* Render the product name only if item.productId is not null */}
                          <p className="font-semibold text-xl mb-2">{item.productId ? item.productId.productName : 'Product not found'}</p>
                          <p className="text-gray-600">จำนวน: {item.quantity}</p>
                          {/* Render the product price only if item.productId is not null */}
                          <p className="text-gray-600">ราคา: {item.productId ? displayCurrency(item.productId.price) : 'N/A'}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {order.receiptImage && order.receiptImage.length > 0 ? (
                    <div className="mt-8">
                      <p className="font-semibold text-xl mb-4 text-gray-800">หลักฐานการโอนเงิน:</p>
                      <img src={order.receiptImage[0]} alt="Receipt" className="max-w-xs rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" />
                    </div>
                  ) : (
                    <div className="mt-8">
                      <p className="font-semibold text-xl text-gray-800">ชำระเงินเพื่อยืนยันการสั่งซื้อ:</p>
                      <p className='text-red-600'>*โปรดตรวจสอบข้อมูลก่อนชำระเงิน</p>
                      {order.shippingCost ? ( // Check if shippingCost is set
                        <button
                          onClick={() => handlePaymentButtonClick(order._id)}
                          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                          ชำระเงิน
                        </button>
                      ) : (
                        <p className="text-red-500">รอการตั้งค่าค่าขนส่งจากผู้ดูแลระบบ</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {showUploadReceiptModal && (
        <UploadReceiptModal
          orderId={selectedOrderId}
          onClose={handleCloseModal}
          fetchOrders={fetchOrders}
          order={orders.find(order => order._id === selectedOrderId)}
        />
      )}
    </div>
  );
};

export default ProductOrder;
