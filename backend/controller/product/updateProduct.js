const productModel = require("../../models/productModel")
const uploadProductPermission = require("../../helpers/permission")

async function updateProductController(req, res){
    try {
        if(!uploadProductPermission(req.user.id)){
            throw new Error("Permission denied")
        }
        const { _id, ...resBody } = req.body

        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody)

        res.json({
            message: "Update product success",
            data: updateProduct,
            success: true,
            error: false
        })


    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = updateProductController