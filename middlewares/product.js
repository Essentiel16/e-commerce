const { productDetailsSchema } = require('../validation');
const { displaySingleProduct } = require('../services');

const validateProductDetails = (req, res, next) => {
  try {
    const { error } = productDetailsSchema.validate(req.body);
    if (!error) {
      return next();
    }
    return res.status(400).json({ status: 'fail', message: error.message });
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: 'Oops! It\'s not you, it\'s us. Pls try again.' });
  }
};

const checkIfProductExists = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await displaySingleProduct(productId);
    if (product) {
      req.product = product;
      return next();
    }
    return res.status(404).json({ status: 'Fail', message: 'Product doesn\'t exist or is no longer available.' });
  } catch (error) {
    return res.status(500).json({ status: 'Fail', message: 'Oops! It\'s not you, it\'s us. Pls try again.' });
  }
};

const checkIfOwner = async (req, res, next) => {
  try {
    if (req.product.owner_id === req.user.id) {
      return next();
    }
    return res.status(404).json({ status: 'fail', message: 'You can\'t edit or delete someone else\'s product' });
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: 'Oops! It\'s not you, it\'s us. Pls try again' });
  }
};

module.exports = {
  validateProductDetails,
  checkIfProductExists,
  checkIfOwner,
};
