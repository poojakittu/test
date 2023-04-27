const jwt = require("jsonwebtoken");
require("dotenv").config();
const authenticateAgent = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.send({ msg: "Please login first" });
  }
  console.log(token);

  const decoded = jwt.verify(token, process.env.key);

  if (decoded) {
    req.body.AgentId = decoded.AgentId;
    next();
  } else {
    res.send({ msg: "Please login first" });
  }
};

module.exports = {
  authenticateAgent,
};
