const AdminDB = require("../models/adminModel").Admin;
const UserDB = require("../models/userModel").user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { user } = require("../models/userModel");

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
      expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    return res.status(200).cookie("token", token, options).json({
      success: true,
      token,
      admin,
    });
  } else {
    return res.json({ success: false, message: "Invalid email or password" });
  }
};

//get all users
// #################################
const getAllUsers = async (req, res) => {
  try {
    let users = await UserDB.find();
    res.status(200).json({ success: true, users });
  } catch (error) {}
};

//delete user
// #######################
const deleteUser = async (req, res) => {
  try {
    console.log("test");
    const userId = req.params.id;
    console.log(userId);
    const result = await UserDB.deleteOne({ _id: userId });
    let users = await UserDB.find();
    console.log(result);
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.log(error);
  }
};

//get one user Data
// ########################
const getOneUser = async (req, res) => {
  try {
    console.log(req.params.userid);
    const user = await UserDB.findById(req.params.userid);
    console.log(user);
    res.json({ user });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    console.log(req.body);

    const { id, userName, fullName, mobile } = req.body.data;
    await UserDB.updateOne(
      { _id: id },
      { $set: { userName, fullName, mobile } }
    );
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};


// create new user/
// 333333333333333333333################
const createUser = async (req, res) => {
  try {
    console.log(req.body);
    console.log("test");
    const { userName, fullName, email, mobile, password } = req.body;

    if (!(userName && fullName && email && password && mobile)) {
      return res.status(422).json({ message: "Please fill the all fields" });
    }

    const existUser = await UserDB.findOne({ email: email });
    if (existUser) {
      return res.json({
        success: false,
        message: "Email address already exists.",
      });
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);
    const user = await UserDB({
      userName,
      fullName,
      email,
      mobile,
      password: encryptedPassword,
      block: 0,
    });

    await user.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};


//user search function
// #######################
const searchUser = async(req, res)=>{
  try {
    const key = req.query.key
    const users = await UserDB.find({
      $or: [
        { userName: { $regex: key, $options: "i" } },
        { fullName: { $regex: key, $options: "i" } },
        { email: { $regex: key, $options: "i" } }
      ],
    })
    res.json({users})
  } catch (error) {
    console.log(error);
  }
}




module.exports = {
  doLogin,
  getAllUsers,
  deleteUser,
  getOneUser,
  updateUser,
  createUser,
  searchUser
};
