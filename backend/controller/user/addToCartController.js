const addToCartModel = require('../../models/cartProduct')

const addToCartController = async (req, res) => {
    try {
        const { productId } = req?.body
        const currentUser = req.user.id

        // const isProductAvailable = await addToCartModel.findOne({ productId })
        const isProductAvailable = await addToCartModel.findOne({ 
            productId: productId,
            userId: currentUser
        })

        console.log("isProductAvailabl   ",isProductAvailable)

        if(isProductAvailable){
            return res.json({
                message : "Already exits in cart",
                success : false,
                error : true
            })
        }

        const payload  = {
            productId : productId,
            quantity : 1,
            userId : currentUser,
        }

        const newAddToCart = new addToCartModel(payload)
        const saveProduct = await newAddToCart.save()

        return res.json({
            data : saveProduct,
            message : "Product Added in Cart",
            success : true,
            error : false
        })


    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = addToCartController