const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  console.log({ password });
  return await bcrypt.hash(password, 8);
};

const comparePassword = async (enterpassword, password) => {
  console.log({ enterpassword }, { password });
  return await bcrypt.compare(enterpassword, password);
};

module.exports = {
  hashPassword,
  comparePassword,
};
