const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    productName : String,
    shape : String,
    category : String,
    productImage : [],
    description : String,
    price : Number,
},{
    timestamps : true
})

const productModel = mongoose.model("product", productSchema)

module.exports = productModel