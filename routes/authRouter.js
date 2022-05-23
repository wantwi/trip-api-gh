const AuthController = require("../controllers/authController");

const router = require("express").Router();

router.post("/register", AuthController.registerUser);

router.post("/login", AuthController.userLogin);

module.exports = router;
