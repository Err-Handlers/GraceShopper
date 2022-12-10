const client = require("../client");
const bcrypt = require("bcrypt");

async function getAllUsers() {
  const { rows } = await client.query(`
    SELECT * FROM users
  `);
  return rows;
}

async function createUser({ password, email, isAdmin }) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const {
    rows: [user],
  } = await client.query(
    `
    INSERT INTO users (password, email, "isAdmin")
    VALUES ($1, $2, $3)
    RETURNING *;
  `,
    [hashedPassword, email, isAdmin]
  );
  delete user.password;
  return user;
}

async function validateAndGetUser({ email, password }) {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("Incorrect email or password");
  }
  const hashedPassword = user.password;
  const isValid = bcrypt.compare(
    await bcrypt.hash(password, 10),
    hashedPassword
  );
  if (isValid) {
    delete user.password;
    return user;
  }
}

async function getUserById(id) {
  const {
    rows: [user],
  } = await client.query(
    `
    SELECT * FROM users 
    WHERE id = $1
  `,
    [id]
  );
  return user;
}

async function getUserByEmail(email) {
  const {
    rows: [user],
  } = await client.query(
    `
      SELECT * FROM users
      WHERE email = $1
    `,
    [email]
  );
  return user;
}

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserById,
  createUser,
  validateAndGetUser,
};
