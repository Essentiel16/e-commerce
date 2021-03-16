const {
  addNewProduct,
  displayAllProducts,
  deleteProduct,
  updateProductById,
  rateAProduct,
} = require('../services');

const { constants } = require('../utils');

const {
  OOPS, FAIL, PRODUCT, CREATED, ACTION_SUCCESS,
} = constants;

const createProduct = async (req, res) => {
  try {
    const product = await addNewProduct(req.body, req.user.id);
    // console.log(req.user);
    res
      .status(201)
      .json({
        status: 'success',
        message: ACTION_SUCCESS(PRODUCT, CREATED),
        data: product,
      });
  } catch (error) {
    res.status(500).json({ status: FAIL, message: OOPS });
  }
};

const getProduct = async (req, res) => {
  try {
    res
      .status(200)
      .json({ status: 'success', message: 'Product has been fetched.', data: req.product });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: 'Oops! It\'s not you, it\'s us. Pls try again' });
  }
};

const allProducts = async (req, res) => {
  try {
    const productList = await displayAllProducts();
    res.status(200).json({
      status: 'success',
      message: 'Products fetched successfully.',
      data: productList,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Oops! It\'s not you, it\'s us. Pls try again',
    });
  }
};

const deleteSelectedProduct = async (req, res) => {
  try {
    await deleteProduct(req.product.id);
    res.status(200).json({ status: 'success', message: 'Product has been deleted' });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: 'Oops! It\'s not you, it\'s us. Pls try again' });
  }
};

const rateProduct = async (req, res) => {
  try {
    const updatedRating = await rateAProduct(req.product, req.body.rating, req.user.id);
    return res.status(200).json({
      status: 'success',
      message: 'Product rating updated successfully',
      data: updatedRating,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Oops! It\'s not you, it\'s us. Pls try again',
    });
  }
};

const modifyProduct = async (req, res) => {
  try {
    const updatedProduct = await updateProductById(req.product, req.body);
    res.status(200).json({ status: 'success', message: 'Product has been updated', data: updatedProduct });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: 'Oops! It\'s not you, it\'s us. Pls try again' });
  }
};

module.exports = {
  createProduct,
  getProduct,
  deleteSelectedProduct,
  allProducts,
  rateProduct,
  modifyProduct,
};
