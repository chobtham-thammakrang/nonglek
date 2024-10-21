import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import SummaryApi from '../common/index'

const Navbar = () => {
  const [showProductDropdown, setShowProductDropdown] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const dropdownRef = useRef(null)
  const [productCategories, setProductCategories] = useState([])

  const handleProductSelect = (category) => {
    navigate(`/product-category?category=${category}`)
    setShowProductDropdown(false)
    setIsMenuOpen(false)
  }

  useEffect(() => {
    // Fetch product categories from the database
    const fetchProductCategories = async () => {
      try {
        const response = await fetch(SummaryApi.getCategories.url) // Adjust the API endpoint as needed
        const result = await response.json()
        if (result.success) {
          setProductCategories(result.data);
        }
      } catch (error) {
        console.error('Error fetching product categories:', error)
      }
    }

    fetchProductCategories()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProductDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    // Force re-render when location changes
    setShowProductDropdown(false)
    setIsMenuOpen(false)
  }, [location])

  return (
    <>
      <button
        className="lg:hidden text-black hover:text-gray-600"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <nav className={`${isMenuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4 absolute lg:relative top-16 lg:top-0 left-0 right-0 bg-white lg:bg-transparent p-4 lg:p-0 shadow-md lg:shadow-none`}>
        <Link to="/" className='px-4 py-1 text-black hover:bg-black hover:text-white active:bg-black active:text-white transition duration-300' onClick={() => setIsMenuOpen(false)}>หน้าแรก</Link>
        <div className="relative" ref={dropdownRef}>
          <button
            className="px-4 py-1 text-black hover:bg-black hover:text-white active:bg-black active:text-white transition duration-300"
            onClick={() => setShowProductDropdown(!showProductDropdown)}
          >
            สินค้า
          </button>
          
          {showProductDropdown && (
            <div className="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <Link to="/product-category" className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' role="menuitem" onClick={() => setIsMenuOpen(false)}>สินค้าทั้งหมด</Link>
                {productCategories.map((category) => (
                  <button
                    key={category._id} // Assuming each category has a unique 'id'
                    onClick={() => handleProductSelect(category.value)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    {category.value}
                  </button>
                ))}
              </div>
            </div>
          )}
          
        </div>
        <Link to="/facts" className='px-4 py-1 text-black hover:bg-black hover:text-white active:bg-black active:text-white transition duration-300' onClick={() => setIsMenuOpen(false)}>สาระน่ารู้</Link>
        <Link to="/about-us" className='px-4 py-1 text-black hover:bg-black hover:text-white active:bg-black active:text-white transition duration-300' onClick={() => setIsMenuOpen(false)}>เกี่ยวกับเรา</Link>
        <Link to="/our-work" className='px-4 py-1 text-black hover:bg-black hover:text-white active:bg-black active:text-white transition duration-300' onClick={() => setIsMenuOpen(false)}>ผลงานของเรา</Link>
        <Link to="/contact-us" className='px-4 py-1 text-black hover:bg-black hover:text-white active:bg-black active:text-white transition duration-300' onClick={() => setIsMenuOpen(false)}>ติดต่อเรา</Link>
      </nav>
    </>
  )
}

export default Navbar