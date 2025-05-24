const { model, Schema } =  require("mongoose");

const schema = Schema({
    category : {
        type: String,
        required: true
    },
    subcategory:{
        type: [String],
        default: []
    }
})

const categoryModel = model("Category", schema);
module.exports = {categoryModel}