const express = require("express")
const cors = require("cors");
const env = require("dotenv");
const { connect_DB } = require("./Config/db.connect");
const userRouter = require("./Routes/user.route");
const path = require('path');


env.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/", userRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connect_DB()

app.listen(8080, (error) =>{
    if(error){
        console.log(error);
        process.exit(1)
    }
    console.log("Running in port ", 8080);
    
})
