const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");

// dotenv config
//require('dotenv').config({path: './env'});
dotenv.config();
// mongodb connection
connectDB();
// rest object for server create
const app = express(); // express k sare feature ab app m store var m store honge

//Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//Routes
// 1 test route
app.use("/api/v1/test", require("./routes/testRoutes"));
//auth Route
app.use("/api/v1/auth", require("./routes/authRoutes"));
//route for inventory
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));

//port create
const PORT = process.env.PORT || 8080; //This line defines the port number on which the server will listen for incoming requests.

// listen
//below line starts the Express.js server and makes it listen for incoming HTTP requests on the specified port (PORT). When the server starts successfully, it logs a message to the console saying "Node Server is Running"

app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} ModeOn Port ${process.env.PORT}`
      .bgBlue.white
  );
});
