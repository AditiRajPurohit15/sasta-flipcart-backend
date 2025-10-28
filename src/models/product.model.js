const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            requires: true,
        },
        description:{
            type: String,
            required: true,
        },
        price:{
            amount:{
                type:Number,
                required: true,
            },
            currency:{
                type:String,
                enum: ["INR","USD"],
                default: "INR",
            },
        },
        images:{
            type: [],
            required: true,
        },
        seller:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    {timestamps: true}
)

const productModel = mongoose.model("product", productSchema);
module.exports = productModel
    
