const productModel = require('../../models/productModel')

const getProductController = async (req, res) => {
    try {
        const allProducts = await productModel.find().sort({createdAt : -1})

        res.json({
            data : allProducts,
            message : "All Products",
            error : false,
            success : true,
            data : allProducts
        })
    } catch (err) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = getProductController