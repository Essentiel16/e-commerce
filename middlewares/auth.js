const { verifyToken } = require('../utils');
const { getAllRatings } = require('../services');

const authenticate = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(401)
        .json({ status: 'fail', message: 'You need to be signed in' });
    }
    const token = authorization.split(' ')[1];
    const { err, data } = verifyToken(token);
    if (err) {
      return res
        .status(401)
        .json({ status: 'fail', message: 'You need to be signed in' });
    }
    req.user = data;
    return next();
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'fail', message: 'Oops! It\'s not you, it\'s us. Pls try again.' });
  }
};

const verifyProductDoesNotBelongToUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.product.owner_id) {
      return next();
    }
    return res.status(403).json({
      status: 'Fail',
      message: 'You cannot rate your own product.',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Fail',
      message: 'Oops! It\'s not you, it\'s us. Pls try again.',
    });
  }
};
const verifyIfUserHasRatedProduct = async (req, res, next) => {
  try {
    let rater = await getAllRatings(req.product.id);
    if (rater.length) {
      rater = rater.filter((el) => String(el.rater_id) === String(req.user.id));
      if (rater.length) {
        return res.status(500).json({
          status: 'You have already rated this product',
        });
      }
      return next();
    }
    return next();
  } catch (error) {
    return res.status(500).json({
      status: 'Fail',
      message: 'Oops! It\'s not you, it\'s us. Pls try again.',
    });
  }
};
module.exports = {
  authenticate,
  verifyIfUserHasRatedProduct,
  verifyProductDoesNotBelongToUser,
};
