import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ChangePasswordModal from '../components/ChangePasswordModal';

const UserDetail = () => {
  const user = useSelector(state=>state?.user?.user)
  const navigate = useNavigate()
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);


  useEffect(() => {
      if (user === null) {
          // User data is still loading
          return;
      }
  }, [user, navigate]);

  const handleChangePasswordClick = () => {
    setShowChangePasswordModal(true);
  };

  const handleCloseModal = () => {
    setShowChangePasswordModal(false);
  };
  return (
    <div className="container max-w-md mx-auto p-4 pt-6 md:p-6 lg:p-12 bg-white rounded shadow-md">
      <hr className="mb-4 border-gray-300" />
      <div className="user-detail flex flex-wrap -mx-4">
        <div className="user-info w-full p-4">
          <h2 className="text-lg font-bold mb-2">ข้อมูลผู้ใช้</h2>
          <p className="text-gray-600">
            <strong>ชื่อ:</strong> {user?.name}
          </p>
          <p className="text-gray-600">
            <strong>อีเมล:</strong> {user?.email}
          </p>
        </div>
        <div className="user-actions w-full p-4">
          <ul className="list-none mb-0">
            <li className="mb-2">
              <button
                onClick={handleChangePasswordClick}
                className="text-indigo-600 hover:text-indigo-900 transition duration-300 ease-in-out"
              >
                เปลี่ยนรหัสผ่าน
              </button>
            </li>
          </ul>
        </div>
      </div>
      {showChangePasswordModal && (
        <ChangePasswordModal
          isOpen={showChangePasswordModal}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default UserDetail;