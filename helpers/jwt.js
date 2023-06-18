const jwt = require("jsonwebtoken");
const JWT_SECRET = "123";
const generateToken = (token) => {
  console.log(token);
  const jwtToken = jwt.sign(token, JWT_SECRET, { expiresIn: "1d" });
  return jwtToken;
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = { verifyToken, generateToken };
