const { userModel } = require("../Model/user.model");
const bcrypt = require("bcrypt") ;
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const productModel = require("../Model/product.model");

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
        const token = jwt.sign({sub: exist}, process.env.SEC_KEY, {expiresIn:"10d"});
        // const refreshToken = jwt.sign({ sub: exist._id }, process.env.REFRESH_KEY, { expiresIn: "7d" });
        return res.status(200).send({message: "Logged In Successfully", token, user}) 
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: "Internal server error"})
    }
}

const addToWishlist = async(req,res) =>{
  try {
    const {userId, item} = req.body;
   

    const user = await userModel.findById(userId);
    
    if(!user){
      return res.status(400).send({message: " User not found"})
    }
    
    const productData = await productModel.findById(item._id);
    if (!productData) {
      return res.status(400).send({ message: "Product not found" });
    }

    const exist =  user.wishlist.find((data)=>data?._id.toString() === item?._id);
    if(exist) {
      console.log("exist",exist);
      return res.status(400).send({message:"already in wishlist"}); 
    }

    user.wishlist.push(item);
    await user.save();

    return res.status(200).send({message: "Product added to wishlist"})
    
  } catch (error) {
    console.log(error);
    
  }
};

const viewWishlist = async(req,res) =>{
  const { userId } = req.params;
  // console.log("UserId: ",userId);
  
  try {
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).send({ message: "User not found" });
    
    res.status(200).send(user.wishlist); 
  } catch (err) {
    res.status(500).send({ message: "Internal server error" ,err});
  }
}


const removeFromWishlist = async(req,res) =>{
  const {userId, productId} =req.params
  // console.log(userId);
  try {
  const user = await userModel.findById(userId);
  // console.log(user);
  
  if(!user){
    return res.status(400).send({message:"User not found"})
  }
  // const product = user.wishlist.find((item)=> item.id==productId);
  // if(!product){
  //   return res.status(400).send({message:"Product is not in wishlist"})
  // }

  const index = user.wishlist.findIndex((item) => item?._id.toString() === productId);
    if (index === -1) {
      return res.status(400).send({ message: "Product not found in wishlist" });
    }

    
    user.wishlist.splice(index, 1);
    await user.save();

    return res.status(200).send({message:"Product removed from wishlist",user});

  
    
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
}

module.exports = {createUser, userLogin, addToWishlist, viewWishlist, removeFromWishlist}