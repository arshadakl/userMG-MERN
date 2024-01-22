const UserDB = require("../models/userModel").user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//signup functions
// #################################
const doSignup = async (req, res) => {
  console.log(req.body);
  const { userName, fullName, email, mobile, password } = req.body;

  if (!(userName && fullName && email && password && mobile)) {
    return res.status(422).json({ message: "Please fill the all fields" });
  }

  const existUser = await UserDB.findOne({ email: email });
  if (existUser) {
    return res.json({ success:false, message: "Email address already exists." });
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

  const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  user.token = token;

  user.password = undefined;
  user.block = undefined;
  res.status(201).json({ success:true,user });
};

// login function
// ############################
const doLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!(email && password)) {
      return res.status(422).json({ message: "Please fill the all fields" });
    }

    const user = await UserDB.findOne({ email: email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      return res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user,
      });
    } else {
      return res.json({success:false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
  }
};



//logOut
// #########################
const doLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.log(error.message);
  }
};

// profile load
// ########################
const profilePage = async (req, res) => {
  try {
    const { id } = req.user;
    const userDetails = await UserDB.findById(id);
    console.log(userDetails);
    res.status(200).json({ success: true, userData: userDetails });
  } catch (error) {
    console.log(error.message);
  }
};


// update user data 
// #######################
const updateUser = async (req, res) => {
  try {
    const {id, userName, fullName, mobile} = req.body
    const userData = await UserDB.updateOne({_id:id},{$set:{userName,fullName,mobile}})
    const user = await UserDB.findById(id)
    user.password = undefined
    res.json({user})

  } catch (error) {
    console.log(error.message);
  }
}


//update user image
// ######################
const updateUserImage = async (req, res) => {
  try {
    const {id} = req.body
    await UserDB.updateOne({_id:id},{$set:{image:req.file.filename}})
    const user = await UserDB.findOne({_id:id})
    console.log(user);
    res.json({user})
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  doSignup,
  doLogin,
  profilePage,
  doLogout,
  updateUser,
  updateUserImage
};
