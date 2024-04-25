const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");
// CREATE INVENTORY
const createInventoryController = async (req, res) => {
  try {
    const { email } = req.body;
    //validation
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User Not Found");
    }
    // if (inventoryType === "in" && user.role !== "donar") {
    //   throw new Error("Not a donar account");
    // }
    // if (inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("Not a hospital");
    // }

    if (req.body.inventoryType === "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organization = new mongoose.Types.ObjectId(req.body.userId);

      //calculate in Blood quantity
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      // console.log("total in", totalInOfRequestedBlood);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;
      //calculate out Blood quantity

      const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

      // in and Out calculation
      const remainBlood = totalIn - totalOut;
      //quantity validation
      if (remainBlood < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${remainBlood} ml of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }

    //save record
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Blood Record Added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Create Inventory API",
      error,
    });
  }
};

//GET ALL BLOOD RECORDS

const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organization: req.body.userId,
      })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Got all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Get All Inventory",
      error,
    });
  }
};

//GET DONAR RECORDS
const getDonarsController = async (req, res) => {
  try {
    const organization = req.body.userId;
    //find donars
    const donarId = await inventoryModel.distinct("donar", {
      organization,
    });
    // console.log(donarId);

    const donars = await userModel.find({ _id: { $in: donarId } });

    return res.status(200).send({
      success: true,
      message: "Donar records fetched successfully",
      donars,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Donar records API",
      error,
    });
  }
};

//GET HOSPITALS RECORDS
const getHospitalController = async (req, res) => {
  try {
    const organization = req.body.userId;
    //get hospitals id
    const hospitalId = await inventoryModel.distinct("hospital", {
      organization,
    });

    //GET Hospitals
    const hospitals = await userModel.find({ _id: { $in: hospitalId } });
    return res.status(200).send({
      success: true,
      message: "Hospitals data fetched successfully",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Hospital API",
      error,
    });
  }
};

//GET organization profile
const getOrganizationController = async (req, res) => {
  try {
    const donar = req.body.userId;
    const orgId = await inventoryModel.distinct("organization", { donar });

    //find org
    const organizations = await userModel.find({ _id: { $in: orgId } });
    return res.status(200).send({
      success: true,
      message: "org data fetched successfully",
      organizations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in ORG API",
      error,
    });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrganizationController,
};
