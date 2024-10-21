import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common';
import { useEffect, useState } from 'react';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch()
  const [cartProductCount, setCartProductCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        dispatch(setUserDetails(null));
        setCartProductCount(0);
        setLoading(false);
        return;
      }
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: "include",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (dataResponse.status === 401) {
        dispatch(setUserDetails(null));
        setCartProductCount(0);
        localStorage.removeItem('authToken');
        setLoading(false);
        return;
      }
      const dataApi = await dataResponse.json();
      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
        fetchUserAddToCart();
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      dispatch(setUserDetails(null));
      setCartProductCount(0);
      localStorage.removeItem('authToken');
    } finally {
      setLoading(false);
    }
  }

  const fetchUserAddToCart = async () => {
    try {
      const token = localStorage.getItem('authToken'); // Or however you're storing the token
      if (!token) {
        // User is not authenticated, set cart count to 0
        setCartProductCount(0);
        return;
      }
      const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
        method: SummaryApi.addToCartProductCount.method,
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}` // Include the token in the headers
        }
      });
      if (dataResponse.status === 401) {
        // User is not authenticated, set cart count to 0
        setCartProductCount(0);
        return;
      }
      const dataApi = await dataResponse.json();
      setCartProductCount(dataApi?.data?.count || 0);
    } catch (error) {
      console.error("Error fetching cart count:", error);
      setCartProductCount(0);
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (loading) {
    return (
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 justify-center items-center"></div>
    );
  }

  return (
    <>
      <Context.Provider value={{
          fetchUserDetails,
          cartProductCount,
          fetchUserAddToCart,
      }}>
        
        <ToastContainer 
            position='top-center'
        />

        <Header />
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet />
        </main>
        <Footer />
      
      </Context.Provider>
      
    </>
  );
}

export default App;