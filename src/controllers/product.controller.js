const productModel = require('../models/product.model')
const sendFilesToStorage = require('../services/storage.services')

const createProductController = async(req, res)=>{
    try {

        // console.log("BODY:", req.body);
        // console.log("FILES:", req.files);
        
        let {title, description, amount, currency} = req.body

        if(!req.files || !req.files.length){
            return res.status(400).json({message: "images required"})
        }

        if(!title || !description || !amount || !currency){
            return res.status(400).json({message: "all fields are required"})
        }

        let uploadImgUrl = await Promise.all(
            req.files.map(async(elem)=>{
                return await sendFilesToStorage(elem.buffer, elem.originalname)
            })

        )
        console.log("uploadImgUrl", uploadImgUrl);

        


        let newProduct = await productModel.create({
            title,
            description,
            price:{
                amount,
                currency,
            },
            images : uploadImgUrl.map((elem)=>elem.url),
            seller : req.user._id,
        })

        return res.status(201).json({message: "product created successfully"})
    } catch (error) {
         console.log("Error in createProductController:", error);
        return res.status(500).json({ message: 'internal server error', error: error.message });
    }
}

const getAllProductsController = async(req,res)=>{
    try {
        let allProducts  = await productModel.find({})
        if(!allProducts){
            return res.ststus(400).json({message: 'something went wrong'})
        }
        if(allProducts.length == 0){
            return res.status(404).json({message: 'product not found'})
        }
        return res.status(200).json({
            message: "products fetched",
            product: allProducts
        })

    } catch (error) {
        return res.status(500).json({
      message: "internal server error",
      error: error,
    });
    }
}

const updateProductController = async(req,res)=>{
    try {
        const {product_id} = req.params;
        if(!product_id)
            return res.status(404).json({message: 'product id not found'})
        const product = await productModel.findOne({
            _id: product_id,
            seller: req.user._id,
        })
        if(!product)
            return res.status(404).json({message: 'Product not found or not authorized'})
        const {title, description, amount, currency} = req.body
        const updateData ={}
        if(title !== undefined) updateData.title = title
        if(description !== undefined) updateData.description = description
        if(amount !== undefined ) updateData['price.amount']=amount
        if(currency !== undefined) updateData["price.currency"] = currency

        if(req.files && req.files.length >0){
            const uploadedImg = await Promise.all(
                req.files.map(elem => sendFilesToStorage(elem.buffer, elem.originalname))
            )
            updateData.images = uploadedImg.map(elem=>elem.url)
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            product_id,
            {$set: updateData},
            {new: true},
        )

        return res.status(200).json({
        message: "Product updated successfully",
        updatedProduct,
        });

    } catch (error) {
        console.log("Error in update:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const deleteProductController = async(req,res)=>{
    try {
        const product_id = req.params.product_id
        if(!product_id){
            return res.status(404).json({message: 'product id not found'})
        }
        const product = await productModel.findById(product_id)
        if(!product){
            return res.status(404).json({message: 'product not found'})
        }
        if(!req.user || product.seller.toString()!== req.user._id.toString()){
            return res.status(401).json({message: "Not authorized to delete this product"})
        }
        await productModel.findByIdAndDelete(product_id)
        return res.status(200).json({ message: "Product deleted successfully" });
         
    } catch (error) {
         console.log("Error in delete:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const getProductByIdController = async(req,res)=>{
    try {
        const {id} = req.params
        const product = await productModel.findById(id)
        if(!product) return res.status(404).json({message: "product not found"})
         return res.status(200).json({message: "Product fetched", product})   
    } catch (error) {
         res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports ={
    createProductController,
    getAllProductsController,
    updateProductController,
    deleteProductController,
    getProductByIdController,
}

