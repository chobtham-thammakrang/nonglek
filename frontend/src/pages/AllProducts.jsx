import React, { useState, useEffect, useCallback } from 'react';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common/index';
import AdminProductCard from '../components/AdminProductCard';
import DeleteProductConfirmation from '../components/DeleteProductConfirmation';
import { toast } from 'react-toastify';
import { getAuthToken } from "../utils/auth";
import CategoryManagement from '../components/CategoryManagement';

const AllProducts = () => {
  const [categories, setCategories] = useState([]);
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [selectCategory, setSelectCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, productId: null, productName: '' });
  const [stockFilter, setStockFilter] = useState('');
  const [showCategoryManagement, setShowCategoryManagement] = useState(false);
  const token = getAuthToken();

  const handleCategoryChange = useCallback(() => {
    const selectedCategories = Object.keys(selectCategory).filter(
      (key) => selectCategory[key]
    );

    if (selectedCategories.length === 0) {
      fetchAllProducts();
    } else {
      fetchAllProducts(selectedCategories);
    }
  }, [selectCategory]);

  const fetchAllProducts = async (categories = []) => {
    setLoading(true);
    try {
      let url = SummaryApi.getProduct.url;
      let options = {
        method: 'GET',
      };

      if (categories.length > 0) {
        url = SummaryApi.filterProduct.url;
        options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ category: categories }),
        };
      }

      const response = await fetch(url, options);
      const dataResponse = await response.json();
      setAllProducts(dataResponse?.data || []);

      // const stockValues = dataResponse.data.map(product => product.stock);
      // console.log(stockValues)

    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCategoryChange();
  }, [handleCategoryChange]);

  useEffect(() => {
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

    fetchCategories();
  }, []);

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  const handleStockFilterChange = (e) => {
    setStockFilter(e.target.value);
  };

  const filteredProducts = allProducts.filter(product => {
    if (stockFilter === '') return true;
    return product.stock <= parseInt(stockFilter, 10);
  });

  const handleDeleteProduct = (productId, productName) => {
    setDeleteConfirmation({ isOpen: true, productId, productName });
  };

  const confirmDelete = async () => {
    const productId = deleteConfirmation.productId;
    setLoading(true);
    try {
      const response = await fetch(`${SummaryApi.deleteProduct.url}/${productId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers : {
          'Authorization': `Bearer ${token}`
        },
      });
      const data = await response.json();
      if (response.ok && data.success) {
        handleCategoryChange();
        toast.success('ลบสินค้าสำเร็จ');
      } else {
        console.error('Failed to delete product:', data.message);
        toast.error(data.message || 'ลบสินค้าไม่สำเร็จ');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('ลบสินค้าไม่สำเร็จ');
    } finally {
      setLoading(false);
      setDeleteConfirmation({ isOpen: false, productId: null, productName: '' });
    }
  };

  return (
    <div className='flex flex-col'>
      {/* Header */}
      <div className='bg-white py-3 px-5 rounded-lg shadow-md flex items-center justify-between'>
        <h2 className='font-bold text-3xl text-gray-700'>สินค้าทั้งหมด</h2>
        <div className='flex gap-4'>
          <button
            className='border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all px-4 py-2 rounded-lg text-red-600 font-semibold'
            onClick={() => setOpenUploadProduct(true)}
          >
            สร้างสินค้า
          </button>
          <button
            className='border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all px-4 py-2 rounded-lg text-blue-600 font-semibold'
            onClick={() => setShowCategoryManagement(!showCategoryManagement)}
          >
            จัดการประเภทสินค้า
          </button>
        </div>
      </div>

      {/* Conditionally render Category Management */}
      {showCategoryManagement && <CategoryManagement />}

      {/* Filter by category */}
      <div className='w-full bg-gray-50 p-6 rounded-lg shadow-md mt-4'>
        <h3 className='text-lg font-semibold text-gray-700 border-b pb-2 border-gray-300'>
          กรองสินค้าตามประเภท
        </h3>
        <form className='flex gap-4 flex-wrap py-3'>
          {categories.map((categoryName, index) => (
            <div key={index} className='flex items-center gap-3'>
              <input
                type='checkbox'
                name='category'
                checked={selectCategory[categoryName?.value] || false}
                value={categoryName?.value}
                id={categoryName?.value}
                onChange={handleSelectCategory}
                className='w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500'
              />
              <label htmlFor={categoryName?.value} className='text-gray-600'>
                {categoryName?.label}
              </label>
            </div>
          ))}
        </form>
      </div>

      {/* Stock filter input */}
      <h3 className='text-lg font-semibold text-gray-700 border-b p-2 border-gray-300'>
        กรองสินค้าตามจำนวนสต็อก
      </h3>
      <input
        type='number'
        value={stockFilter}
        onChange={handleStockFilterChange}
        placeholder='กรอกจำนวนสต็อก'
        className='w-1/4 p-1 text-sm border border-gray-300 rounded-sm mt-2'
      />

      {/* All products */}
      <div className='flex-grow px-4 mt-4'>
        <div className='flex items-center flex-wrap gap-6 py-5 h-[calc(100vh-300px)] overflow-y-scroll'>
          {loading ? (
                <div className="flex justify-center items-center h-screen">
                  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                </div>
          ) : filteredProducts.length === 0 ? (
            <p className='text-lg text-gray-500'>ไม่พบสินค้าจากประเภทที่เลือก.</p>
          ) : (
            filteredProducts.map((product, index) => (
              <AdminProductCard
                data={product}
                key={index + 'allProduct'}
                fetchdata={handleCategoryChange}
                onDelete={handleDeleteProduct}
                className="rounded-lg shadow-md"
              />
            ))
          )}
        </div>

        {/* upload product */}
        {openUploadProduct && (
          <UploadProduct
            onClose={() => setOpenUploadProduct(false)}
            fetchData={fetchAllProducts}
          />
        )}
      </div>

      <DeleteProductConfirmation
        isOpen={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({ isOpen: false, productId: null, productName: '' })}
        onConfirm={confirmDelete}
        productName={deleteConfirmation.productName}
      />
    </div>
  );
};

export default AllProducts;
