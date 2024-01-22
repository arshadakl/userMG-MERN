require("dotenv").config();
// const mongoose = require("mongoose")
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors')
const Database = require('./config/config')
const path = require('path')

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

// Increase the limit for JSON bodies
app.use(bodyParser.json({ limit: '10mb' }));

// Increase the limit for URL-encoded bodies
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')


app.use(express.static(path.join(__dirname, "public")));

app.use('/',userRouter)
app.use('/admin',adminRouter)

app.listen(8080,()=>{
    console.log("Server Running...");
})