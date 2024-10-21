const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
    label: { type: String, required: true },
    value: { type: String, required: true }
}, {
    timestamps: true
});

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);

module.exports = ProductCategory;