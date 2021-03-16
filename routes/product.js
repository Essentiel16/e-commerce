const { Router } = require('express');

const {
  createProduct,
  getProduct,
  deleteSelectedProduct,
  allProducts,
  rateProduct,
  modifyProduct,
} = require('../controllers');

const {
  validateProductDetails,
  authenticate,
  checkIfProductExists,
  checkIfOwner,
  verifyIfUserHasRatedProduct,
  verifyProductDoesNotBelongToUser,
} = require('../middlewares');

const productRouter = Router();

productRouter.get('/product/:productId', checkIfProductExists, getProduct);
productRouter.get('/product', allProducts);
productRouter.post('/product', authenticate, validateProductDetails, createProduct);
productRouter.put('/product/:productId', authenticate, checkIfProductExists, checkIfOwner, modifyProduct);
productRouter.delete('/product/:productId', authenticate, checkIfProductExists, checkIfOwner, deleteSelectedProduct);
productRouter.put('/product/rating/:productId', authenticate, checkIfProductExists, verifyProductDoesNotBelongToUser, verifyIfUserHasRatedProduct, rateProduct);

module.exports = productRouter;
