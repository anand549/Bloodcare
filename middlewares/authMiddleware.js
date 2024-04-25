const JWT = require("jsonwebtoken");
//middleware is next function jo jab tak next call nahi hoga age ka code execute nahi hoga
module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Auth Failed",
        });
      } else {
        req.body.userId = decode.userId;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    // 401 unauthorized access
    return res.status(401).send({
      success: false,
      error,
      message: "Auth Failed",
    });
  }
};
