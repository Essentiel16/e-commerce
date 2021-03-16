const {
  addNewUser,
  getSingleUserByUsername,
} = require('./user');

const {
  addNewProduct,
  displayAllProducts,
  displaySingleProduct,
  deleteProduct,
  updateProductById,
  rateAProduct,
  getAllRatings,
} = require('./product');

module.exports = {
  addNewUser,
  getSingleUserByUsername,
  addNewProduct,
  displayAllProducts,
  displaySingleProduct,
  deleteProduct,
  updateProductById,
  rateAProduct,
  getAllRatings,
};
