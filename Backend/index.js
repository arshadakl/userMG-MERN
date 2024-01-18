require("dotenv").config();
const mongoose = require("mongoose")
mongoose.connect(process.env.DB_HOST,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
// mongoose.connect("mongodb+srv://arshadayanikkal:ueqOXrejWD1UFcnC@cluster0.f8vnkyx.mongodb.net/UserMG")

const path = require('path')
const express = require('express')
const app = express()

// app.use(express.static(path.join(__dirname, "public")));

const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')



app.use('/',userRouter)
app.use('/admin',adminRouter)

app.listen(8080,()=>{
    console.log("Server Running...");
})