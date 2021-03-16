const {
  addNewProduct,
  displayAllProducts,
  deleteProduct,
  updateProductById,
  rateAProduct,
} = require('../services');

const { constants } = require('../utils');

const {
  OOPS, FAIL, SUCCESS, PRODUCT, CREATED, FETCH, DELETED, RATED, UPDATED, ACTION_SUCCESS,
} = constants;

const createProduct = async (req, res) => {
  try {
    const product = await addNewProduct(req.body, req.user.id);
    // console.log(req.user);
    res
      .status(201)
      .json({
        status: SUCCESS,
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
      .json({ status: SUCCESS, message: ACTION_SUCCESS(PRODUCT, FETCH), data: req.product });
  } catch (error) {
    res.status(500).json({ status: FAIL, message: OOPS });
  }
};

const allProducts = async (req, res) => {
  try {
    const productList = await displayAllProducts();
    res.status(200).json({
      status: SUCCESS,
      message: ACTION_SUCCESS(PRODUCT, FETCH),
      data: productList,
    });
  } catch (error) {
    res.status(500).json({
      status: FAIL,
      message: OOPS,
    });
  }
};

const deleteSelectedProduct = async (req, res) => {
  try {
    await deleteProduct(req.product.id);
    res.status(200).json({
      status: SUCCESS, message: ACTION_SUCCESS(PRODUCT, DELETED),
    });
  } catch (error) {
    res.status(500).json({ status: FAIL, message: OOPS });
  }
};

const rateProduct = async (req, res) => {
  try {
    const updatedRating = await rateAProduct(req.product, req.body.rating, req.user.id);
    return res.status(200).json({
      status: SUCCESS,
      message: ACTION_SUCCESS(PRODUCT, RATED),
      data: updatedRating,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      status: FAIL,
      message: OOPS,
    });
  }
};

const modifyProduct = async (req, res) => {
  try {
    const updatedProduct = await updateProductById(req.product, req.body);
    res.status(200).json({
      status: SUCCESS,
      message: ACTION_SUCCESS(PRODUCT, UPDATED),
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ status: FAIL, message: OOPS });
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
