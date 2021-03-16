const { v4: uuid } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateUUID = () => uuid();

const jwtSecret = process.env.JWT_SECRET;
const tokenizeData = (data) => jwt.sign(data, jwtSecret);
const verifyToken = (token) => jwt.verify(token, jwtSecret, (err, data) => ({ err, data }));

const salt = bcrypt.genSaltSync(10);
const hassPassword = (password) => bcrypt.hashSync(password, salt);
const comparePassword = (plainPassword, hassedPassword) => (
  bcrypt.compareSync(plainPassword, hassedPassword));

module.exports = {
  tokenizeData,
  verifyToken,
  hassPassword,
  generateUUID,
  comparePassword,
};
