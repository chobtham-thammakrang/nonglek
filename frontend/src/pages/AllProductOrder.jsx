import React, { useState, useEffect } from 'react';
import SummaryApi from '../common';
import displayCurrency from '../helpers/displayCurrency';
import { FaEdit } from 'react-icons/fa';
import { getAuthToken } from "../utils/auth";

const AllProductOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('date');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingOrder, setEditingOrder] = useState(null);
  const ordersPerPage = 10;
  const token = getAuthToken();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(SummaryApi.getAllOrders.url, {
        method: SummaryApi.getAllOrders.method,
        credentials: 'include',
        headers : {
          'Authorization': `Bearer ${token}`
        },
      });
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const sortOrders = (ordersToSort) => {
    switch (sortBy) {
      case 'date':
        return ordersToSort.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'total':
        return ordersToSort.sort((a, b) => b.totalAmount - a.totalAmount);
      default:
        return ordersToSort;
    }
  };

  const filterOrders = (ordersToFilter) => {
    if (filterStatus === 'all') return ordersToFilter;
    return ordersToFilter.filter(order => order.status === filterStatus);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortOrders(filterOrders(orders)).slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusColor = (status) => {
    switch (status) {
      case 'รอดำเนินการ':
        return 'text-yellow-500';
      case 'กำลังดำเนินการ':
        return 'text-blue-500';
      case 'อยู่ระหว่าจัดส่ง':
        return 'text-purple-500';
      case 'จัดส่งแล้ว':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${SummaryApi.updateOrderStatus.url}/${orderId}`, {
        method: SummaryApi.updateOrderStatus.method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (data.success) {
        setOrders(orders.map(order => 
          order._id === orderId ? { ...order, status: newStatus } : order
        ));
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleShippingCostUpdate = async (orderId, shippingCost) => {
    try {
      const response = await fetch(`${SummaryApi.updateOrderShippingCost.url}/${orderId}`, {
        method: SummaryApi.updateOrderShippingCost.method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({ shippingCost: Number(shippingCost) }),
      });
      const data = await response.json();
      if (data.success) {
        setOrders(orders.map(order =>
          order._id === orderId ? { ...order, shippingCost: Number(data.order.shippingCost) } : order
        ));
        setEditingOrder(null); // Close the editing mode after successful update
      } else {
        console.error('Error updating shipping cost:', data.message);
      }
    } catch (error) {
      console.error('Error updating shipping cost:', error);
    }
  };

  const handleAdditionalDetailsUpdate = async (orderId, additionalDetails) => {
    try {
      const response = await fetch(`${SummaryApi.updateOrderAdditionalDetails.url}/${orderId}`, {
        method: SummaryApi.updateOrderAdditionalDetails.method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">รายการสั่งซื้อทั้งหมด</h1>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow">
        <div className="mb-4 sm:mb-0">
          <label className="mr-2 font-semibold">เรียงตาม:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)} 
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">วันที่</option>
            <option value="total">ราคารวม</option>
          </select>
        </div>
        <div>
          <label className="mr-2 font-semibold">กรองตามสถนะ:</label>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)} 
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="รอดำเนินการ">รอดำเนินการ</option>
            <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
            <option value="อยู่ระหว่าจัดส่ง">อยู่ระหว่าจัดส่ง</option>
            <option value="จัดส่งแล้ว">จัดส่งแล้ว</option>
          </select>
        </div>
      </div>
      <div className="space-y-6">
        {currentOrders.map((order) => (
          <div key={order._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">รายการ #{order._id}</h2>
              <div className="flex items-center">
                <p className={`text-xl font-bold ${getStatusColor(order.status)} mr-4`}>{order.status}</p>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="รอดำเนินการ">รอดำเนินการ</option>
                  <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
                  <option value="อยู่ระหว่าจัดส่ง">อยู่ระหว่าจัดส่ง</option>
                  <option value="จัดส่งแล้ว">จัดส่งแล้ว</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-lg"><span className="font-semibold">ลูกค้า:</span> {order.userId.name}</p>
                <p className="text-lg"><span className="font-semibold">อีเมล:</span> {order.userId.email}</p>
                <p className="text-lg"><span className="font-semibold">ราคาสินค้ารวม:</span> {displayCurrency(order.totalAmount)}</p>
                <div className="mt-2 flex items-center">
                  <span className="font-semibold">ค่าจัดส่ง:</span>
                  {editingOrder === order._id ? (
                    <input
                      type="number"
                      value={order.shippingCost || ''}
                      onChange={(e) => setOrders(orders.map(o => o._id === order._id ? { ...o, shippingCost: e.target.value } : o))}
                      onBlur={() => handleShippingCostUpdate(order._id, order.shippingCost)}
                      className="border ml-2 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="ml-2 flex items-center">
                      <span className="cursor-pointer text-blue-500 hover:text-blue-700">
                        {order.shippingCost ? displayCurrency(order.shippingCost) : 'Set shipping cost'}
                      </span>
                      <FaEdit
                        className="ml-2 text-gray-500 cursor-pointer hover:text-gray-700"
                        onClick={() => setEditingOrder(order._id)}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">ที่อยู่:</h3>
                <p className="text-gray-700">
                  {order.address.houseNumber}, {order.address.alley}, {order.address.road}, {order.address.district}, {order.address.subDistrict}, {order.address.province}, {order.address.postalCode}
                </p>
                <p className="mt-2"><span className="font-semibold">เบอร์โทร:</span> {order.contactNumber}</p>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-lg">รายละเอียดเพิ่มเติม:</h3>
              {editingOrder === order._id ? (
                <textarea
                  value={order.additionalDetails || ''}
                  onChange={(e) => setOrders(orders.map(o => o._id === order._id ? { ...o, additionalDetails: e.target.value } : o))}
                  onBlur={() => handleAdditionalDetailsUpdate(order._id, order.additionalDetails)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              ) : (
                <p
                  onClick={() => setEditingOrder(order._id)}
                  className="text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded"
                >
                  {order.additionalDetails || 'คลิกเพื่อเพิ่มรายละเอียดเพิ่มเติม'}
                </p>
              )}
            </div>
            <h3 className="font-semibold text-lg mb-2">สินค้า:</h3>

            <ul className="space-y-2">
              {order.items.map((item) => (
                <li key={item._id} className="flex items-center gap-4 bg-gray-50 p-2 rounded">
                  {/* Check if item.productId is not null before rendering the image */}
                  {item.productId && (
                    <img
                      src={item.productId.productImage[0]}
                      alt={item.productId.productName}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    {/* Render the product name only if item.productId is not null */}
                    <p className="font-semibold">{item.productId ? item.productId.productName : 'ไม่พบสินค้า'}</p>
                    <p className="text-gray-600">จำนวน: {item.quantity}</p>
                    {/* Render the product price only if item.productId is not null */}
                    <p className="text-gray-600">ราคา: {item.productId ? displayCurrency(item.productId.price) : 'N/A'}</p>
                  </div>
                </li>
              ))}
            </ul>

            {order.receiptImage && order.receiptImage.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold text-lg mb-2">หลักฐานการชำระเงิน:</h3>
                <img src={order.receiptImage[0]} alt="Receipt" className="max-w-xs rounded shadow" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-4 py-2 rounded ${
              currentPage === i + 1
                ? 'bg-blue-500 text-white'
                : 'bg-white text-blue-500 hover:bg-blue-100'
            } transition-colors duration-300`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllProductOrder;
