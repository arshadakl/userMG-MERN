require("dotenv").config();
// const mongoose = require("mongoose")
const cookieParser = require('cookie-parser');
const cors = require('cors')
const Database = require('./config/config')
Database.DBConnection()

const express = require('express')
const app = express()
app.use(cookieParser());
app.use(
    cors({
      origin: ["http://localhost:5173"],
      methods: ["GET,PUT,PATCH,POST,DELETE",],
      credentials: true,
    })
);


const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')



app.use('/',userRouter)
app.use('/admin',adminRouter)

app.listen(8080,()=>{
    console.log("Server Running...");
})