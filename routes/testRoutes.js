const express = require("express");
const { testController } = require("../controllers/testController");

// router Object
const router = express.Router();

//routes
router.get("/", testController); // controller callback controller folder testController.js

//export
module.exports = router;
