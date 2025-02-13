const bcrypt = require("bcrypt");

const saltRounds = 11;

// 비밀번호 암호화
const bcryptPassword = (password) => {
  return bcrypt.hashSync(password, saltRounds);
};

// 일치여부 비교
const compareFunc = (password, dbPassword) => {
  return bcrypt.compareSync(password, dbPassword);
};

module.exports = {
  bcryptPassword,
  compareFunc,
};