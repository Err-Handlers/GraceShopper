const {
  client,
  // declare your model imports here
  // for example, User
} = require("./");
const { createUsers } = require("./models/user");

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    await client.query(`
    DROP TABLE IF EXISTS pastries;
    DROP TABLE IF EXISTS users
  `);
    // build tables in correct order
    await client.query(`
    CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
  );

  CREATE TABLE pastries(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    "isGlutenFree" BOOLEAN DEFAULT false,
    "isSweet" BOOLEAN DEFAULT false,
    price INTEGER
   );

   CREATE TABLE cart(
    id SERIAL PRIMARY KEY
    "userId" INTEGER REFERENCES users(id)
    "pastriesId" INTEGER REFERENCES pastries(id)
   );
  `);
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
    const createdUsers = [
      {
        username: "Kim",
        password: "kimspassword",
        email: "kimsemail@email.com"
      },
      {
        username: "Erin",
        password: "erinspassword",
        email: "erinsemail@email.com"
      },
      {
        username: "Thuan",
        password: "thuanspassword",
        email: "thuansemail@email.com"
      },
    ];

    const users = await Promise.all(createdUsers.map(createUsers));
    console.log("Users being created");
    console.log(users);
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
