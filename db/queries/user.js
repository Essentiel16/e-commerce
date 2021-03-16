const userInfo = `
  CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR UNIQUE NOT NULL,
    created_at TIMESTAMPTZ default now(),
    updated_at TIMESTAMPTZ default now()
  );
`;

const insertUser = `
  INSERT INTO users (id, username, email, password)
  VALUES ($1, $2, $3, $4)
  RETURNING id, username, email, created_at;
`;

const fetchUserByUsername = `
  SELECT * FROM users WHERE username = $1;
`;

module.exports = {
  userInfo,
  insertUser,
  fetchUserByUsername,
};
