const domain = process.env.REACT_APP_BACKEND_URL//"http://localhost:8080"

export const SummaryApi = {
    signUP : {
        url : `${domain}/api/signup`,
        method : "POST"
    },
    signIn : {
        url : `${domain}/api/signin`,
        method : "POST"
    },
    current_user : {
        url : `${domain}/api/user-details`,
        method : "GET"
    },
    logout_user : {
        url : `${domain}/api/userLogout`,
        method : "GET"
    },
    allUser : {
        url : `${domain}/api/all-users`,
        method : "GET"
    },
    updateUser : {
        url : `${domain}/api/update-user`,
        method : "POST"
    },
    uploadProduct : {
        url : `${domain}/api/upload-product`,
        method : "POST"
    },
    getProduct : {
        url : `${domain}/api/get-product`,
        method : "GET"
    },
    updateProduct : {
        url : `${domain}/api/update-product`,
        method : "POST"
    },
    categoryProduct : {
        url : `${domain}/api/get-categoryProduct`,
        method : "GET"
    },
    categoryWiseProduct : {
        url : `${domain}/api/category-product`,
        method : "POST"
    },
    productDetail : {
        url : `${domain}/api/product-detail`,
        method : "POST"
    },
    addToCartProduct : {
        url : `${domain}/api/addtocart`,
        method : "POST"
    },
    addToCartProductCount : {
        url : `${domain}/api/countAddToCartProduct`,
        method : "GET"
    },
    addToCartProductView : {
        url : `${domain}/api/view-card-product`,
        method : "GET"
    },
    updateCartProduct : {
        url : `${domain}/api/update-card-product`,
        method : "POST"
    },
    deleteCartProduct : {
        url : `${domain}/api/delete-card-product`,
        method : "POST"
    },
    filterProduct : {
        url : `${domain}/api/filter-product`,
        method : "POST"
    },
    deleteProduct: {
        url: `${domain}/api/delete-product`,
        method: "DELETE"
    },
    changePassword: {
        url: `${domain}/api/change-password`,
        method: 'POST',
    },
    forgotPassword: {
        url: `${domain}/api/forgotPassword`,
        method: 'POST'
    },
    verifyOTP: {
      url: `${domain}/api/verifyOTP`,
      method: 'POST'
    },
    resetPassword: {
      url: `${domain}/api/resetPassword`,
      method: 'POST'
    },
    createOrder: {
        url: `${domain}/api/create-order`,
        method: 'POST'
    },
    getUserOrders: {
        url: `${domain}/api/user-orders`,
        method: 'GET'
    },
    getAllOrders: {
        url: `${domain}/api/all-orders`,
        method: 'GET'
    },
    updateOrderStatus: {
        url: `${domain}/api/update-order-status`,
        method: 'PUT'
    },
    updateOrderShippingCost: {
        url: `${domain}/api/update-order-shipping-cost`,
        method: 'PUT'
    },
    updateOrderAdditionalDetails: {
        url: `${domain}/api/update-order-additional-details`,
        method: 'PUT'
    },
    updateOrderReceiptImage: {
        url: `${domain}/api/update-order-receipt-image`,
        method: 'PUT'
    },
    // Product category API
    getCategories: {
        url: `${domain}/api/categories`,
        method: "GET"
    },
    addCategory: {
        url: `${domain}/api/categories`,
        method: "POST"
    },
    updateCategory: {
        url: `${domain}/api/categories`,
        method: "PUT"
    },
    deleteCategory: {
        url: `${domain}/api/categories`,
        method: "DELETE"
    },
}

export default SummaryApi