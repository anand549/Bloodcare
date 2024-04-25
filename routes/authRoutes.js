const express = require("express");
const {
  registerController,
  loginController,
  currentUserController,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//routes for register using POST method
router.post("/register", registerController);

//routes for login using POST method
router.post("/login", loginController);

//GET Current User || using get method
router.get("/current-user", authMiddleware, currentUserController);

module.exports = router;
