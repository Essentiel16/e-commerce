const { Router } = require('express');
const { registerUser, loginUser } = require('../controllers');
const { validateSignupDetails, validateLoginDetails, checkIfUserExists } = require('../middlewares');

const userRouter = Router();

userRouter.post('/register', validateSignupDetails, checkIfUserExists, registerUser);
userRouter.post('/login', validateLoginDetails, loginUser);

module.exports = userRouter;
