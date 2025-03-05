const jwt = require("jsonwebtoken");
const process = require("process");

const { JWT_SECRET } = process.env;

const createToken = (user, expire = "1h") => {
  try {
    const payload = {
      userId: user.id,
    };
    const hash = jwt.sign(payload, JWT_SECRET, { expiresIn: expire });
    return hash;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating JWT token");
  }
};

module.exports = {
  createToken,
};
