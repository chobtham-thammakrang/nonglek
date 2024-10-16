import React, { useState } from 'react';
import uploadReceipt from '../helpers/uploadReceipt';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import displayCurrency from '../helpers/displayCurrency';
import qr from '../assest/qrc.jpg';
import { getAuthToken } from "../utils/auth";

const UploadReceiptModal = ({ orderId, onClose, fetchOrders, isModal = true, order }) => {
  const [uploadingReceipt, setUploadingReceipt] = useState(false);
  const token = getAuthToken();

  const handleReceiptUpload = async (file) => {
    setUploadingReceipt(true);
    try {
      const uploadedReceipt = await uploadReceipt(file);
      if (uploadedReceipt.secure_url) {
        // Call the API to update the order with the receipt image
        const response = await fetch(`${SummaryApi.updateOrderReceiptImage.url}/${orderId}`, {
          method: SummaryApi.updateOrderReceiptImage.method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include',
          body: JSON.stringify({ receiptImage: uploadedReceipt.secure_url }),
        });
        const data = await response.json();
        if (data.success) {
          toast.success('อัปโหลดสำเร็จ');
          fetchOrders();
          if (isModal) onClose(); // Close the modal if it's a modal
        } else {
          throw new Error(data.message || 'Failed to update order with receipt');
        }
      } else {
        throw new Error('Failed to upload receipt to Cloudinary');
      }
    } catch (error) {
      console.error('Error uploading receipt:', error);
      toast.error('อัปโหลดล้มเหลว: ' + error.message);
    } finally {
      setUploadingReceipt(false);
    }
  };

  const getTotalPrice = () => {
    if (!order || !order.totalAmount || isNaN(order.totalAmount)) {
      return 0;
    }
    return order.totalAmount;
  };

  const getShippingCost = () => {
    if (!order || !order.shippingCost || isNaN(order.shippingCost)) {
      return 0;
    }
    return order.shippingCost;
  };

  return (
    <div className={isModal ? 'fixed z-10 inset-0 overflow-y-auto' : ''}>
      <div className={isModal ? 'flex items-center justify-center min-h-screen' : ''}>
        <div className={`bg-white rounded-lg shadow-lg p-8 max-w-md w-full ${isModal ? '' : 'mb-4'}`}>
          <h2 className="text-2xl font-semibold mb-4 text-center">โอนเงินและอัปโหลดสลิป</h2>
          <div className="mb-6 text-center">
            <img src={qr} alt="QR Code" className="w-64 h-64 mx-auto mb-4" />
            <p className="font-semibold">ธนาคาร: กสิกรไทย</p>
            <p className="font-semibold">หมายเลขบัญชี: 0641727385</p>
            <p className="font-semibold">ชื่อบัญชี: ชอบธรรม ธรรมกร่าง</p>
          </div>
          {/* Display order total and shipping cost */}
          <div className="mb-6">
            <p className="text-gray-700">ยอดรวมสินค้า: {displayCurrency(getTotalPrice())} บาท</p>
            <p className="text-gray-700">ค่าจัดส่ง: {displayCurrency(getShippingCost())} บาท</p>
            <p className="font-bold text-2xl">ยอดรวมทั้งหมด: {displayCurrency(getTotalPrice() + getShippingCost())} บาท</p>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleReceiptUpload(e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          {uploadingReceipt && (
            <p className="mt-2 text-blue-500 text-center">กำลังอัปโหลด...</p>
          )}
          {isModal && (
            <div className="flex justify-between">
              <button
                onClick={onClose}
                className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadReceiptModal;
