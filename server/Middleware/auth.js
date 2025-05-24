const express = require("express");
const jwt = require("jsonwebtoken");
const env = require("dotenv");

env.config()


const auth = (req,res,next) =>{
    const token = req.headers.authorization.split(" ")[1]
    console.log("token from auth",token);

    if(!token) {
        return res.status(400).send({message:"Token not found"})
    }
    try {
        // console.log(process.env.SEC_KEY);
        
        const decoded = jwt.verify(token, process.env.SEC_KEY);
        req.userId = decoded._id || decoded.id || decoded.sub;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message})
    }
    
}

module.exports = auth;
