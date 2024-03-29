const jwt = require("jsonwebtoken");

const isLogin = async (req, res, next) => {
  console.log(req.body);
const token = req.body.token
  if (!token) {
    return res.status(404).json({ message: "First login" });
  }

  try {
    const decode = jwt.verify(token,process.env.JWT_SECRET)
    console.log(decode);
    req.user = decode
  } catch (error) {
    return res.status(401).json({ message: "invalid token" });
  }
  return next();
};

module.exports = {
  isLogin,
};
