const jwt = require("jsonwebtoken");
const db = require("../models/index.js");
//const User = require("../models/userModel.js");
//const ErrorHandler = require("../utils/errorHandler");
const User = db.user;

exports.userAuthentication = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(res.status(401).send("Sorry, authorize user"));
  }

  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const decoded = jwt.verify(token,process.env.JWT_SECRET);

  //   req.user = await User.findOne({
  //     where: {
  //       userId: decoded.userId,
  //     },
  //     attributes: ["userId", "accountId", "username", "role"],
  //   });

  req.user = await User.findOne({ where: { userId: decoded.userId },attributes:[`userId`,`firstName`,`lastName`, `username`,  `role`, `accountId`, `status`] });

  next();
};

//handling users roles

exports.userAuthorizeRoles = (roles) => {
  return (req, res, next) => {
   
    if (!roles.includes(req.user.role)) {
      return next(res.status(403).send("Access Denied"));
    }
    next();
  };
};
