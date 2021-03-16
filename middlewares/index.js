const { validateSignupDetails, checkIfUserExists, validateLoginDetails } = require('./user');
const { validateProductDetails, checkIfProductExists, checkIfOwner } = require('./product');
const {
  authenticate, verifyIfUserHasRatedProduct,
  verifyProductDoesNotBelongToUser,
} = require('./auth');

module.exports = {
  validateSignupDetails,
  validateLoginDetails,
  checkIfUserExists,
  authenticate,
  verifyIfUserHasRatedProduct,
  verifyProductDoesNotBelongToUser,
  validateProductDetails,
  checkIfProductExists,
  checkIfOwner,
};
