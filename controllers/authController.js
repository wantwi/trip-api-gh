const db = require("../models/index.js");
const { sendToken } = require("../utils/jwtToken.js");
const { hashPassword, comparePassword } = require("../utils/bcrypt");

const User = db.user;
const Account = db.account;

const registerUser = async (req, res) => {
  const {firstName,lastName, username, password, role } = req.body;

  try {
    let userInfo = {
      firstName,
      lastName,
      username,
      password,
      role,
      status: 1,
    };

    const encryptPassword = await hashPassword(password);

    if (encryptPassword) {
      userInfo.password = encryptPassword.toString();
      const user = await User.create(userInfo);

      console.log("creating user", user)

        if(user){
          sendToken(user, 200, res);
        }

     
    }

    //res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).send("Username and Password is required");
    }
    const user = await User.findOne({
      where: {
        username,
      },
    });

    //res.status(200).send(user);

    //return;

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    const encryptPassword = await comparePassword(password, user.password);

    if (!encryptPassword) {
      res.status(400).send("Invalid user credentials");
      return;
    }

    let userInfo = {};
    userInfo.userId = user.userId;
    userInfo.role = user.role;
    userInfo.username = user.username;
    userInfo.firstName = user.firstName;
    userInfo.lastName = user.lastName;


    sendToken(userInfo, 200, res);

    return;

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUser,
  userLogin,
};
