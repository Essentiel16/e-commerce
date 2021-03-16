const { generateUUID } = require('../utils');
const db = require('../db/setup');
const {
  insertProduct,
  fetchAllProducts,
  fetchProductById,
  updateProductDetailsById,
  deleteProductById,
  insertProductRating,
  updateRatingsForAProduct,
  calculateAverageRating,
  fetchAllRatingsForAProduct,
} = require('../db/queries/product');

const addNewProduct = async (data, user) => {
  const id = generateUUID();
  const {
    productName, description, category, size,
  } = data;
  // const ownerId = user.id;
  return db.one(
    insertProduct, [id, productName, description, category, size, user],
  );
};

const displayAllProducts = async () => db.manyOrNone(fetchAllProducts);

const displaySingleProduct = async (productId) => db.oneOrNone(fetchProductById, [productId]);

const deleteProduct = async (productId) => db.none(deleteProductById, [productId]);

const getAllRatings = async (productId) => db.manyOrNone(fetchAllRatingsForAProduct, [productId]);

const calculateSingleProduct = async (id) => db.one(calculateAverageRating, [id]);

const updateSingleProductAvgRating = async (id, value) => db.one(
  updateRatingsForAProduct, [id, value],
);

const rateAProduct = async (product, rating, rater) => {
  // console.log(product);
  db.one(insertProductRating, [product.id, product.product_name, rater, rating, product.owner_id]);
  const calAverageRating = await calculateSingleProduct(product.id);
  const avgRating = parseFloat(calAverageRating.average_rating).toFixed(2);
  const update = await updateSingleProductAvgRating(product.id, avgRating);
  return update;
};

const updateProductById = async (product, data) => {
  const {
    productName, description, category, size,
  } = data;
  return db.one(
    updateProductDetailsById, [product.id, productName, description, category, size],
  );
};

module.exports = {
  addNewProduct,
  displayAllProducts,
  displaySingleProduct,
  deleteProduct,
  updateProductById,
  rateAProduct,
  getAllRatings,
};
