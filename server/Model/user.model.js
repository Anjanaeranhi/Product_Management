const { model, Schema } = require("mongoose");

const schema = Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
}, { timestamps: true })

const userModel = model("User", schema);
module.exports ={ userModel}