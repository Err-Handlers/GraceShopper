const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    dropTables()
    // build tables in correct order
    createTables()
  } catch (error) {
    throw error;
  }
}

async function createTables() {
  console.log("Starting to create tables...");
  await client.query(`
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
  );

  CREATE TABLE pastries(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    isGlutenFree BOOLEAN DEFAULT false,
    isSweet BOOLEAN DEFAULT false,
    price INTEGER
   );

  `)
}

async function dropTables() {
  await client.query(`
    DROP TABLE IF EXISTS pastries;
    DROP TABLE IF EXISTS users
  `)
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
