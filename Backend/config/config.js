const mongoose = require("mongoose")

const DBConnection = ()=>{
    mongoose.connect(process.env.DB_HOST ).then(()=>{
        console.log("Database Connected..");
    })
}

module.exports={
    DBConnection
}