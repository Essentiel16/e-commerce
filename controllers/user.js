const { addNewUser, getSingleUserByUsername } = require('../services');
const { hassPassword, comparePassword, tokenizeData } = require('../utils');

const registerUser = async (req, res) => {
  try {
    const hassedPassword = hassPassword(req.body.password);
    const userInput = await addNewUser({ ...req.body, password: hassedPassword });
    res
      .status(201)
      .json({ status: 'success', message: 'Registration successful', data: userInput });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: 'Oops! It\'s not you, it\'s us. Pls try again.' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await getSingleUserByUsername(username);
    if (user && comparePassword(password, user.password)) {
      delete user.password;
      const token = tokenizeData({ username, email: user.email, id: user.id });
      return res.status(200).json({ status: 'success', message: 'Login successful.', data: { token, user } });
    }
    return res.status(401).json({ status: 'fail', message: 'Invalid login details' });
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: 'Oops! It\'s not you, it\'s us. Pls try again.' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
