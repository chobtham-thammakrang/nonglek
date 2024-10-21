import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import SummaryApi from '../common/index';
import { toast } from 'react-toastify';
import { getAuthToken } from "../utils/auth";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ label: '', value: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const token = getAuthToken();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(SummaryApi.getCategories.url);
      const result = await response.json();
      if (result.success) {
        setCategories(result.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddCategory = async () => {
    try {
      const response = await fetch(SummaryApi.addCategory.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newCategory)
      });
      const result = await response.json();
      if (result.success) {
        toast.success('เพิ่มหมวดหมู่สำเร็จแล้ว');
        fetchCategories();
        setIsModalOpen(false);
      } else {
        toast.error(result.message || 'ไม่สามารถเพิ่มหมวดหมู่ได้');
      }
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error('ไม่สามารถเพิ่มหมวดหมู่ได้');
    }
  };

  const handleEditCategory = async () => {
    try {
      const response = await fetch(SummaryApi.updateCategory.url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: currentCategoryId, ...newCategory })
      });
      const result = await response.json();
      if (result.success) {
        toast.success('อัปเดตหมวดหมู่เรียบร้อยแล้ว');
        fetchCategories();
        setIsModalOpen(false);
        setIsEditing(false);
      } else {
        toast.error(result.message || 'ไม่สามารถอัพเดตหมวดหมู่ได้');
      }
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('ไม่สามารถอัพเดตหมวดหมู่ได้');
    }
  };


  const openEditModal = (category) => {
    setIsEditing(true);
    setCurrentCategoryId(category._id);
    setNewCategory({ label: category.label, value: category.value });
    setIsModalOpen(true);
  };

  const handleDeleteCategory = async (id) => {
    try {
      const response = await fetch(`${SummaryApi.deleteCategory.url}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (result.success) {
        toast.success('ลบหมวดหมู่สำเร็จแล้ว');
        fetchCategories();
      } else {
        toast.error(result.message || 'ไม่สามารถลบหมวดหมู่ได้');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('ไม่สามารถลบหมวดหมู่ได้');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">การจัดการหมวดหมู่</h2>
      
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
        onClick={() => { 
          setIsModalOpen(true); 
          setIsEditing(false); 
          setNewCategory({ label: '', value: '' }); 
        }}
      >
        เพิ่มหมวดหมู่ใหม่
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
        contentLabel="Category Modal"
      >
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? 'Edit Category' : 'Add New Category'}
        </h2>
        <input
          type="text"
          placeholder="Category Value"
          className="w-full border px-3 py-2 rounded mb-4"
          value={newCategory.value}
          onChange={(e) => setNewCategory({ ...newCategory, value: e.target.value, label: e.target.value})}
        />
        <div className="flex justify-end space-x-4">
          <button 
            className={`px-4 py-2 rounded ${isEditing ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
            onClick={isEditing ? handleEditCategory : handleAddCategory}
          >
            {isEditing ? 'แก้ไขหมวดหมู่' : 'เพิ่มหมวดหมู่'}
          </button>
          <button 
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={() => setIsModalOpen(false)}
          >
            ปิด
          </button>
        </div>
      </Modal>

      <ul className="space-y-4">
        {categories.map(category => (
          <li 
            key={category._id} 
            className="flex justify-between items-center bg-gray-100 p-4 rounded shadow"
          >
            <div>
              <span className="font-medium">{category.value}</span>
            </div>
            <div className="space-x-2">
              <button 
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                onClick={() => openEditModal(category)}
              >
                แก้ไข
              </button>
              <button 
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => handleDeleteCategory(category._id)}
              >
                ลบ
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManagement;
