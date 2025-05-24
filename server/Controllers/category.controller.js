const {categoryModel} = require("../Model/category.model")

const addCategory = async(req,res) =>{
    try {
        const data = req.body;
        if(!data){
            return res.status(404).send({message: "Data not found"})
        }
        const category = await categoryModel.create(data);
        res.status(200).send({message: "Category created"})
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:"Internal server error"})
    }
}

const getCategory = async(req,res) =>{
    try {
        const data = await categoryModel.find();
        return res.status(200).send(data)
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:"Internal server error"})
    }
}
const addSubcategory = async(req,res) =>{
    try {
        const {category, subcategory} = req.body;
        // console.log(data);
        const exist = await categoryModel.findOne({category});
        if(!exist) {
            return res.status(404).send({message: "Category Doesn't exist"})
        }
        console.log(exist);
        if (exist.subcategory.includes(subcategory)) {
            return res.status(400).send({ message: "Subcategory already exists" });
        }

        exist.subcategory.push(subcategory);
        await exist.save();
        
        return res.status(200).send({message: "Subcategory added successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:"Internal server error"})
    }
}
const getSubcategories = async(req,res) =>{
    try {
        const {id} = req.body
        console.log(id);
        const exist = await categoryModel.findById(id);
        if(!exist){
            return res.status(404).send({message:"Category not found"})
        }
        const data = exist.subcategory
        console.log(exist.subcategory);
        return res.status(200).send(data)
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:"Internal server error"})
    }
}


module.exports = {addCategory, getCategory, addSubcategory, getSubcategories}