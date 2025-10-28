const productModel = require("../models/product.model")
const userModel = require("../models/user.model")

const getAllUsersController = async(req, res)=>{
    try {
        let allUsers = await userModel.find().select("-password")
        if(allUsers.length === 0)
            return res.status(404).json("user not found")
        return res.status(200).json({
        message: "Users fetched successfully",
        users: allUsers,
     })
    } catch (error) {
        console.log("Error -->", error.message);
        return res.status(500).json({
        message: "Internal server error",
        });
    }
}

const getAllProductsController = async(req,res)=>{
    try {
        const allProducts = await productModel.find({}).populate("seller", "fullname email mobile")

        if(!allProducts || allProducts.length === 0){
            return res.staus(404).json({message: "no products found"})
        }

        return res.status(200).json({
        message: "Products fetched successfully",
        products: allProducts,
        });

    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({
        message: "Internal server error",
        error: error.message,
        });
    }
}

const deleteProductController = async (req, res) => {
  try {
    const product_id = req.params.product_id;

    if (!product_id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const deletedProduct = await productModel.findByIdAndDelete(product_id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
      deletedProduct,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


module.exports = {
    getAllUsersController,
    getAllProductsController,
    deleteProductController,
}

