const productModel = require("../Model/product.model");

const AddProduct = async(req,res) =>{
    try {
        const {title, category, subcategory, description} = req.body
        // console.log(title);
        // const variants = [];
        // const variantkey = Object.keys(req.body).filter(key => key.startsWith('variants'));

        // const variantMap = {};

        // variantkey.forEach((key) => {
        //     const match = key.match(/variants\[(\d+)]\[(\w+)]/);
        //     if(match) {
        //         const index = match[1];
        //         const field = match[2];
        //         if(!variantMap[index]) variantMap[index] = {}
        //         variantMap[index][field] = req.body[key];
        //     }
        // });
        // for(let index in variantMap) {
        //     variants.push(variantMap[index])
        // }
        let variants = [];
        if (typeof req.body.variants === 'string') {
        // When sent as a JSON string (from FormData)
        variants = JSON.parse(req.body.variants);
        } else if (Array.isArray(req.body.variants)) {
        // Already parsed (when sent as raw JSON)
        variants = req.body.variants;
        }
        console.log('Raw body:', req.body);

        const data = {
            title,
            category,
            subcategory,
            description,
            variants,
            images : req.files.map(file => file.name),
        }
        const product = await productModel.create(data);
        
        return res.status(200).send({message: "Product added successfully", product})
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:"Internal server error"})
    }
}

const getProduct =  async(req,res) =>{
    try {
        const Products = await productModel.find()
        return res.status(200).send(Products)
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:"Internal server error"})
    }
}

module.exports = {AddProduct, getProduct}