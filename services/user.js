const db = require('../db/setup');
const { insertUser, fetchUserByUsername } = require('../db/queries/user');
const { generateUUID } = require('../utils');

const addNewUser = async (data) => {
  const id = generateUUID();
  const { username, email, password } = data;
  return db.one(insertUser, [id, username, email, password]);
};

const getSingleUserByUsername = async (username) => db.oneOrNone(fetchUserByUsername, [username]);

module.exports = {
  addNewUser,
  getSingleUserByUsername,
};
