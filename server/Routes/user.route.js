const {Router} = require("express");
const { createUser, userLogin, addToWishlist, viewWishlist, removeFromWishlist } = require("../Controllers/user.controller");
const auth = require("../Middleware/auth");

const upload = require("../Middleware/multer");
const { AddProduct, getProduct, getCategProduct } = require("../Controllers/product.controller");
const { addCategory, getCategory, addSubcategory, getSubcategories, getAllSubCategory } = require("../Controllers/category.controller");

const userRouter = Router();

userRouter.post("/signup", createUser);
userRouter.post("/signin", userLogin);
userRouter.post("/addproduct", upload.array('images'), AddProduct);
userRouter.get("/products", getProduct);
userRouter.post("/addcategory", addCategory);
userRouter.get("/getcategory", getCategory);
userRouter.post("/addsubcategory", addSubcategory);
userRouter.post("/getsubcategories", getSubcategories);
userRouter.post("/getcarproduct", getCategProduct);
userRouter.post("/wishlist",addToWishlist);
userRouter.get("/wishlist/:userId", viewWishlist);
userRouter.delete("/wishlist/:userId/:productId", removeFromWishlist);
userRouter.get("/getallsubcategories", getAllSubCategory);


module.exports = userRouter