const AdminDB = require("../models/adminModel").Admin;
const UserDB = require("../models/userModel").user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const doLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    if (!(email && password)) {
      return res.status(422).json({ message: "Please fill the all fields" });
    }

    const admin = await AdminDB.findOne({ email: email });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      const token = jwt.sign({ id: admin._id, email }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      admin.token = token;
      admin.password = undefined;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      return res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        admin
      });
    } else {
      return res.json({success:false, message: "Invalid email or password" });
    }
};

//get all users
// #################################
const getAllUsers = async(req,res)=>{
    try {
        let users = await UserDB.find()
        res.status(200).json({success:true,users})
    } catch (error) {
        
    }
}


//delete user
// #######################
const deleteUser = async(req,res)=>{
  try {
    console.log("test");
    const userId = req.params.id;
    console.log(userId);
    const result = await UserDB.deleteOne({_id:userId})
    let users = await UserDB.find()
    console.log(result);
    res.status(200).json({success:true,users})
  } catch (error) {
    console.log(error);
  }
}



module.exports = {
  doLogin,
  getAllUsers,
  deleteUser
};
