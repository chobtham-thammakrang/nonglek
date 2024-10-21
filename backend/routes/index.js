const express = require('express')
const router = express.Router()
const authToken = require('../middleware/authToken')

const userSignUpController = require('../controller/user/userSignUp')
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUser')
const updateUser = require('../controller/user/updateUser')
const uploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetail = require('../controller/product/getProductDetail')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct  = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const filterProductController = require('../controller/product/filterProduct')
const deleteProductController = require('../controller/product/deleteProductController')
const changePasswordController = require('../controller/user/changePassword');
const forgotPassword = require('../controller/user/forgotPassword');
const verifyOTPController = require('../controller/user/verifyOTPController');
const resetPasswordController = require('../controller/user/resetPasswordController');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const createOrder = require('../controller/order/createOrder');
const getUserOrders = require('../controller/order/getUserOrders');
const getAllOrders = require('../controller/order/getAllOrders');

const updateOrderStatus = require('../controller/order/updateOrderStatus');
const updateOrderShippingCost = require('../controller/order/updateOrderShippingCost');
const updateOrderAdditionalDetails = require('../controller/order/updateOrderAdditionalDetails');
const updateOrderReceiptImage = require('../controller/order/updateOrderReceiptImage')

const {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory
} = require('../controller/product/productCategoryController');

// user routes
router.post('/signup', userSignUpController);
router.post('/signin', userSignInController);
router.get('/user-details', authToken, userDetailsController);
router.get('/userLogout', authToken, userLogout);

// admin routes
router.get('/all-users', authToken, allUsers)
router.post('/update-user', authToken, updateUser)

// product routes
router.post('/upload-product', authToken, uploadProductController)
router.get('/get-product', getProductController)
router.post('/update-product', authToken, updateProductController)
router.get('/get-categoryProduct', getCategoryProduct)
router.post('/category-product', getCategoryWiseProduct)
router.post('/product-detail', getProductDetail)
router.post('/filter-product', filterProductController)
router.delete('/delete-product/:id', authToken, deleteProductController)

// user add to cart
router.post('/addtocart', authToken, addToCartController)
router.get('/countAddToCartProduct', authToken, countAddToCartProduct)
router.get("/view-card-product", authToken, addToCartViewProduct)
router.post("/update-card-product", authToken, updateAddToCartProduct)
router.post("/delete-card-product", authToken, deleteAddToCartProduct)
router.post('/change-password', authToken, changePasswordController);

// Forgot password routes
router.post('/forgotPassword', forgotPassword);
router.post('/verifyOTP', verifyOTPController);
router.post('/resetPassword', authToken, resetPasswordController);

//other routes
router.post('/create-order', authToken, upload.single('receiptImage'), createOrder);
router.get('/user-orders', authToken, getUserOrders);
router.get('/all-orders', authToken, getAllOrders);

// Order update routes
router.put('/update-order-status/:orderId', authToken, updateOrderStatus);
router.put('/update-order-shipping-cost/:orderId', authToken, updateOrderShippingCost);
router.put('/update-order-additional-details/:orderId', authToken, updateOrderAdditionalDetails);
router.put('/update-order-receipt-image/:orderId', authToken, updateOrderReceiptImage);

// Product category routes
router.get('/categories', getCategories);
router.post('/categories', authToken, addCategory);
router.put('/categories', authToken, updateCategory);
router.delete('/categories/:id', authToken, deleteCategory);

module.exports = router
