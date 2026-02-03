const jwt = require("jsonwebtoken");
const SECRET = "supersecretkey";

function generateToken(user) {
  return jwt.sign(user, SECRET, { expiresIn: "1d" });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { generateToken, verifyToken };
