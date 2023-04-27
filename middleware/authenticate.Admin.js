const jwt = require("jsonwebtoken");
require("dotenv").config();
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.send({ msg: "Please login first" });
  }

  const decoded = jwt.verify(token, process.env.key);

  if (decoded) {
    req.body.AdminId = decoded.AdminId;
    next();
  } else {
    res.send({ msg: "Please login first" });
  }
};

module.exports = {
  authenticateAdmin,
};
