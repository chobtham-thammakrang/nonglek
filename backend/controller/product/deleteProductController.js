const productModel = require("../../models/productModel")
const uploadProductPermission = require("../../helpers/permission")

async function deleteProductController(req, res) {
  try {
    if (!uploadProductPermission(req.user.id)) {
      return res.status(403).json({
        message: "Permission denied",
        success: false,
        error: true
      });
    }
    const productId = req.params.id;

    const deletedProduct = await productModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
        error: true
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      data: deletedProduct,
      success: true,
      error: false
    });

  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({
      message: err.message || "An error occurred while deleting the product",
      error: true,
      success: false
    });
  }
}

module.exports = deleteProductController
