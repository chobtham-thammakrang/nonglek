const productModel = require("../../models/productModel")
const uploadProductPermission = require("../../helpers/permission")

async function uploadProductController(req, res){
    try {
        const sessionUserId = req.user.id
        
        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Permission denied")
        }

        const uploadProduct = new productModel(req.body)
        const savedProduct = await uploadProduct.save()

        res.status(201).json({
            message : "Product uploaded successfully",
            error : false,
            success : true,
            data : savedProduct
        })
    } catch (err) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = uploadProductController
    