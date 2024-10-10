import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Forgotpassword from "../pages/Forgotpassword";
import Signup from "../pages/Signup";
import AdminPanel from "../pages/AdminPanel";
import AllUser from "../pages/AllUser";
import AllProducts from "../pages/AllProducts";
import ChangeUserRole from "../components/ChangeUserRole";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Contact from "../pages/Contact";
import AboutUs from "../pages/AboutUs";
import Profile from "../pages/Profile";
import UserDetail from "../pages/UserDetail";
import ProductOrder from "../pages/ProductOrder";
import AllProductOrder from "../pages/AllProductOrder";
import VerifyOTP from "../components/VerifyOTP";
import ResetPassword from "../pages/ResetPassword";
import Facts from "../pages/Facts";
import OurWork from "../pages/OurWork";
import Checkout from "../pages/Checkout"
import ProtectedRoute from "../components/ProtectedRoute";
import ROLE from "../common/role";
import OrderConfirmation from '../pages/OrderConfirmation';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <Forgotpassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOTP />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "sign-up",
        element: <Signup />,
      },
      {
        path: "product-category",
        element: <CategoryProduct />,
      },
      {
        path: "product/:id",
        element: <ProductDetail />,
      },
      {
        element: <ProtectedRoute allowedRoles={[ROLE.GENERAL, ROLE.ADMIN]} />,
        children: [
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "checkout",
            element: <Checkout />,
          },
          {
            path: "order-confirmation",
            element: <OrderConfirmation />,
          },
          {
            path: "profile",
            element: <Profile />,
            children: [
              {
                path: "users-detail",
                element: <UserDetail />,
              },
              {
                path: "product-Order",
                element: <ProductOrder />,
              },
            ],
          },
        ]
      },
      {
        element: <ProtectedRoute allowedRoles={[ROLE.ADMIN]} />,
        children: [
          {
            path: "admin-panel",
            element: <AdminPanel />,
            children: [
              {
                path: "all-users",
                element: <AllUser />,
              },
              {
                path: "all-products",
                element: <AllProducts />,
              },
              {
                path: "change-user-role",
                element: <ChangeUserRole />,
              },
              {
                path: "all-product-Order",
                element: <AllProductOrder />,
              },
            ],
          },
        ]
      },
      {
        path: "contact-us",
        element: <Contact />
      },
      {
        path: "about-us",
        element: <AboutUs/>
      },
      {
        path: "facts",
        element: <Facts/>
      },
      {
        path: "our-work",
        element: <OurWork/>
      },
    ],
  },
]);