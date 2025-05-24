const {Router} = require("express");
const { createUser, userLogin, addToWishlist } = require("../Controllers/user.controller");
const auth = require("../Middleware/auth");

const upload = require("../Middleware/multer");
const { AddProduct, getProduct, getCategProduct } = require("../Controllers/product.controller");
const { addCategory, getCategory, addSubcategory, getSubcategories } = require("../Controllers/category.controller");

const userRouter = Router();

userRouter.post("/signup", createUser);
userRouter.post("/signin",auth, userLogin);
userRouter.post("/addproduct",auth, upload.array('images'), AddProduct);
userRouter.get("/products",auth, getProduct);
userRouter.post("/addcategory",auth, addCategory);
userRouter.get("/getcategory",auth, getCategory);
userRouter.post("/addsubcategory",auth, addSubcategory);
userRouter.post("/getsubcategories",auth, getSubcategories);
userRouter.post("/getcarproduct", getCategProduct);
userRouter.post("/wishlist",addToWishlist);

module.exports = userRouter