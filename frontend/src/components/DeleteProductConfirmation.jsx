import React from 'react';

const DeleteProductConfirmation = ({ isOpen, onClose, onConfirm, productName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">ยืนยันการลบสินค้า</h2>
        <p>คุณแน่ใจมั้ยว่าจะลบสินค้า "{productName}"?</p>
        <div className="mt-4 flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-gray-200 rounded"
            onClick={onClose}
          >
            ยกเลิก
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={onConfirm}
          >
            ลบสินค้า
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductConfirmation;
