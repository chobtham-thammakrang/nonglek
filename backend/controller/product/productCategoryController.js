const ProductCategory = require('../../models/productCategoryModel');
const productModel = require('../../models/productModel');

const getCategories = async (req, res) => {
    try {
        const categories = await ProductCategory.find();
        res.json({ data: categories, success: true, error: false });
    } catch (err) {
        res.json({ message: err.message || err, error: true, success: false });
    }
};

const addCategory = async (req, res) => {
    try {
        const newCategory = new ProductCategory(req.body);
        const savedCategory = await newCategory.save();
        res.status(201).json({ data: savedCategory, success: true, error: false });
    } catch (err) {
        res.status(400).json({ message: err.message || err, error: true, success: false });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id, ...updateData } = req.body;
        const oldCategory = await ProductCategory.findById(id);
        const updatedCategory = await ProductCategory.findByIdAndUpdate(id, updateData, { new: true });

        // Correct the condition to update products with the old category value
        await productModel.updateMany(
            { category: oldCategory.value }, // Use the old category value
            { category: updateData.value } // Update to the new category value
        );

        res.json({ data: updatedCategory, success: true, error: false });
    } catch (err) {
        res.json({ message: err.message || err, error: true, success: false });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find the category to be deleted
        const categoryToDelete = await ProductCategory.findById(id);
        if (!categoryToDelete) {
            return res.status(404).json({ message: 'Category not found', success: false, error: true });
        }

        // Check if the category to delete is "อื่นๆ"
        if (categoryToDelete.value === 'อื่นๆ') {
            return res.status(400).json({ message: 'Cannot delete the "อื่นๆ" category', success: false, error: true });
        }

        // Find or create the "อื่นๆ" category
        let otherCategory = await ProductCategory.findOne({ value: 'อื่นๆ' });
        if (!otherCategory) {
            otherCategory = new ProductCategory({ label: 'อื่นๆ', value: 'อื่นๆ' });
            await otherCategory.save();
        }

        // Update products to the "อื่นๆ" category
        await productModel.updateMany(
            { category: categoryToDelete.value },
            { category: otherCategory.value }
        );

        // Delete the category
        await ProductCategory.findByIdAndDelete(id);

        res.json({ message: 'Category deleted and products updated to "อื่นๆ"', success: true, error: false });
    } catch (err) {
        res.json({ message: err.message || err, error: true, success: false });
    }
};

module.exports = { getCategories, addCategory, updateCategory, deleteCategory };