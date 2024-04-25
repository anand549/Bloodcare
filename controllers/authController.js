const userModel = require("../models/userModel");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    // validation
    if (existingUser) {
      return res.status(200).send(
        // 200 ok request
        {
          success: false,
          message: "User Already Exist",
        }
      );
    }
    // else save the user and password . for password hash (encryption)  using bcrypt js
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    //save rest data
    const user = new userModel(req.body);
    await user.save();
    return res.status(201).send({
      // 201 something has been created
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      // 500 internal server error
      success: false,
      message: "Error In Register API",
      error,
    });
  }
};
//login callback

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    //check role
    if (user.role !== req.body.role) {
      return res.status(500).send({
        success: false,
        message: "role does not match",
      });
    }
    //if user exists compare password
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    //if everything is correct create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    }); //encrypting token
    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login API",
    });
  }
};

// GET Current User
const currentUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    return res.status(200).send({
      success: true,
      message: "User Fetched Successfully",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "unable to get current user",
      error,
    });
  }
};
module.exports = { registerController, loginController, currentUserController };
