const { registerUser, loginUser } = require('./user');
const {
  createProduct,
  getProduct,
  deleteSelectedProduct,
  allProducts,
  rateProduct,
  modifyProduct,
} = require('./product');

module.exports = {
  loginUser,
  registerUser,
  createProduct,
  getProduct,
  deleteSelectedProduct,
  allProducts,
  rateProduct,
  modifyProduct,
};
