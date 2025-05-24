const {Router} = require("express");
const { createUser, userLogin } = require("../Controllers/user.controller");
const auth = require("../Middleware/auth");

const upload = require("../Middleware/multer");
const { AddProduct, getProduct } = require("../Controllers/product.controller");
const { addCategory, getCategory, addSubcategory, getSubcategories } = require("../Controllers/category.controller");

const userRouter = Router();

userRouter.post("/signup", createUser);
userRouter.post("/signin",auth, userLogin);
userRouter.post("/addproduct",auth, upload.array('images'), AddProduct);
userRouter.get("/products", getProduct);
userRouter.post("/addcategory", addCategory);
userRouter.get("/getcategory", getCategory);
userRouter.post("/addsubcategory", addSubcategory);
userRouter.post("/getsubcategories", getSubcategories);

module.exports = userRouter