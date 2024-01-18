const UserDB = require("../models/userModel").user;
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require("dotenv").config();


//signup functions
// #################################
const doSignup = async (req, res) => {

  const { userName, fullName, email, mobile, password } = req.body;

  if(!(userName && fullName && email && password && mobile)){
    return res.status(422).json({ message:"Please fill the all fields"})
  }

  const existUser = await UserDB.findOne({ email: email });
    if(existUser){
        return res.status(409).json({ message: 'Email address already exists.' });
    }

  const encryptedPassword = bcrypt.hashSync(password, 10);
  const user = await UserDB({
    userName,fullName, email, mobile,
    password: encryptedPassword,
    block:0
  })

  await user.save()

  const token = jwt.sign(
    {id:user._id,email},
    process.env.JWT_SECRET,
    {
        expiresIn:"2h"
    }
  )
  user.token = token

  user.password = undefined
  user.block = undefined
  res.status(201).json({ user});
};


// login function
// ############################
const doLogin = async (req, res) => {
    try {
        const {email, password} = req.body
        if(!(email && password)){
            return res.status(422).json({ message:"Please fill the all fields"})
        }

        const user = await UserDB.findOne({email: email})
        
        if(user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign(
                {id:user._id,email},
                process.env.JWT_SECRET,
                {
                    expiresIn:"2h"
                }
              )
              user.token = token
              user.password = undefined
            const options={
                expires : new Date(Date.now() +  3 * 24 * 60 * 60 * 1000),
                httpOnly : true
            }

           return res.status(200).cookie("token", token, options).json({
                success:true,
                token, user
            })

        }else{
            return res.status(422).json({ message:"Invalid email or password"})

        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    doSignup,
    doLogin
};
