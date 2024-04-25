const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrganizationController,
} = require("../controllers/inventoryController");

const router = express.Router();

//routes
//ADD INVENTORY POST
router.post("/create-inventory", authMiddleware, createInventoryController);

//GET ALL BLOOD RECORDS
router.get("/get-inventory", authMiddleware, getInventoryController);
module.exports = router;

//GET ALL DONARS RECORDS
router.get("/get-donars", authMiddleware, getDonarsController);

//GET ALL Hospitals RECORDS
router.get("/get-hospitals", authMiddleware, getHospitalController);

//GET ALL Organizations
router.get("/get-organization", authMiddleware, getOrganizationController);

module.exports = router;
