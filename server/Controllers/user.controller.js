const { userModel } = require("../Model/user.model");
const bcrypt = require("bcrypt") ;
const jwt = require("jsonwebtoken");
const env = require("dotenv");

env.config()

const createUser = async(req,res) =>{
    try {
        const data = req.body
        console.log(data);
        const email = data.email;
        const exist = await userModel.findOne({email});
        
        if(exist){
            return res.status(400).send({message: "Email Id Already Exist"})
        }
        data.password = await bcrypt.hash(data.password,10)
        const User = await userModel.create(data)
        const token = jwt.sign({sub: User?._id}, process.env.SEC_KEY , {expiresIn :"7d"})
        return res.status(200).send({message: "User Account Created", token})
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: "Internal server error"})
    }
};

const userLogin = async(req,res) =>{
    try {
        const {email, password} = req.body;
        const exist = await userModel.findOne({email})
        if(!exist){
            return res.status(404).send({message:"Email Id not found"})
        }
        // console.log(exist);
        const {...user } = exist.toObject();

        const check = await bcrypt.compare(password, exist.password);
        if(!check){
            return res.status(404).send({message: "Password doesn't match"})
        }
        const token = jwt.sign({sub: exist}, process.env.SEC_KEY, {expiresIn:"7d"});
        return res.status(200).send({message: "Logged In Successfully", token, user}) 
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: "Internal server error"})
    }
}

module.exports = {createUser, userLogin}