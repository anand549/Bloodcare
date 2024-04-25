const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected To Mongodb Database
       ${mongoose.connection.host}`.bgGreen.black
    );
  } catch (error) {
    console.log(`Mongodb Database Error: ${error}`.bgRed.white);
    //process.exit(1)
  }
};
module.exports = connectDB;
