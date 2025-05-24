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

connect_DB();

// app.post("/refresh-token", (req, res) => {
//   const { refreshToken } = req.body;

//   if (!refreshToken) return res.status(401).send({ message: "Refresh token missing" });

//   try {
//     const decoded = jwt.verify(refreshToken, process.env.REFRESH_KEY);
//     const accessToken = jwt.sign({ sub: decoded.sub }, process.env.SEC_KEY, { expiresIn: "15m" });
//     return res.send({ accessToken });
//   } catch (err) {
//     return res.status(403).send({ message: "Invalid refresh token" });
//   }
// });


app.listen(8080, (error) =>{
    if(error){
        console.log(error);
        process.exit(1)
    }
    console.log("Running in port ", 8080);
    
})
