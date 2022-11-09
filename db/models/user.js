// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require("bcrypt")

async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
  const { rows } = await client.query(`
    SELECT * FROM users
  `)
  return rows
}

async function createUser({password, email }) {
  const hashedPassword = await bcrypt.hash(password, 10)

  const { rows: [user] } = await client.query(`
    INSERT INTO users (password, email)
    VALUES ($1, $2)
    RETURNING *;
  `, [hashedPassword, email])
  delete user.password
  return user;
}

async function getLoggedInUser({ email, password }) {
  const user = await getUserByEmail(email);
  if(!user){
    throw new Error("Incorrect email or password")
  }
  const hashedPassword = user.password;
  const isValid = bcrypt.compare(await bcrypt.hash(password, 10), hashedPassword);
  console.log(isValid);
  if (isValid) {
    delete user.password;
    return user;
  }
} //the reason we can't just use getUserByEmail is because there is no password in that response? -erin

async function getUserById({ id }) {
  const { rows: [user] } = await client.query(`
    SELECT * FROM users 
    WHERE id = $1
  `, [id])
  return user;
}


async function getUserByEmail( email ) {
    const { rows: [user] } = await client.query(`
      SELECT * FROM users
      WHERE email = $1
    `, [email])
    return user;
}





module.exports = {
  // add your database adapter fns here
  getAllUsers,
  getUserByEmail,
  getUserById,
  createUser,
  getLoggedInUser
};