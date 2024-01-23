

const jwt = require("jsonwebtoken");

const isLogin = async (req, res, next) => {
  const token = req.cookies.token;
  // console.log(token);

  if (token === undefined || token === null) {
    return res.status(404).json({ success: false, message: "First login" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(401).json({ success: false, message: "invalid token" });
    }

    console.log(decode);
    req.admin = decode;
  } catch (error) {
    return res.status(401).json({ success: false, message: "invalid token" });
  }

  return next();
};

module.exports = {
  isLogin,
};
