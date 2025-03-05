const bcrypt = require("bcrypt");

const passwordHashing = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const comparePassword = async (user, password) => {
  try {
    const data = await bcrypt.compare(password, user.password);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = {
  passwordHashing,
  comparePassword,
};
