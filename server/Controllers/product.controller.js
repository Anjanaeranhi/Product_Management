const { categoryModel } = require("../Model/category.model");
const productModel = require("../Model/product.model");

const AddProduct = async(req,res) =>{
    try {
        const {title, subcategory, description} = req.body;
        const sub = await categoryModel.find();
        const allSubs = sub.flatMap(item => item.subcategory);
        console.log(allSubs);

        if (!allSubs.includes(subcategory)) {
            return res.status(400).send({ message: "Invalid subcategory" });
        }
       
        let variants = [];
        if (typeof req.body.variants === 'string') {
        
        variants = JSON.parse(req.body.variants);
        } else if (Array.isArray(req.body.variants)) {
        
        variants = req.body.variants;
        }
        console.log('Raw body:', req.body);

        const data = {
            title,
            subcategory,
            description,
            variants,
            images : req.files.map(file => file.filename),
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


const getCategProduct =  async(req,res) =>{
    try {
        const {CatId,SubCatName} = req.body
        console.log(CatId.CatId);
        console.log(SubCatName);
        
        const categ = await categoryModel.findById(CatId.CatId);
        if(!categ){
            return res.status(404).send({message: "No Category found"})
        }
        console.log(categ);
        
        
        
        return res.status(200).send()
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:"Internal server error"})
    }
}





module.exports = {AddProduct, getProduct, getCategProduct}