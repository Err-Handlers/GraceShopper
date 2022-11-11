const {
  client,
  // declare your model imports here
  // for example, User
} = require("./");
const { createUser } = require("./models/user");
const { createPastry, updatePastry, deletePastry, getAllPastries } = require("./models/pastries")
const { createCart, getCartByUserId } = require("./models/cart")

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    await client.query(`
      DROP TABLE IF EXISTS order_pastries;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS cart_pastries;
      DROP TABLE IF EXISTS carts;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS pastries;
      DROP TABLE IF EXISTS users;
    `);

    // build tables in correct order
    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false
      );

      CREATE TABLE pastries(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        "isGlutenFree" BOOLEAN DEFAULT false,
        "isSweet" BOOLEAN DEFAULT false,
        "imageURL" VARCHAR(255),
        inventory INTEGER NOT NULL,
        "priceInCents" INTEGER NOT NULL
      );

      CREATE TABLE reviews(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "pastryId" INTEGER REFERENCES pastries(id),
        "reviewDescription" TEXT NOT NULL,
        UNIQUE ("userId", "pastryId")
      );

      CREATE TABLE carts(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id)
      );

      CREATE TABLE cart_pastries(
        id SERIAL PRIMARY KEY,
        quantity INTEGER NOT NULL,
        "pastryId" INTEGER REFERENCES pastries(id),
        "cartId" INTEGER REFERENCES carts(id),
        UNIQUE ("cartId", "pastryId")
      );

      CREATE TABLE orders(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id)
      );

      CREATE TABLE order_pastries(
        id SERIAL PRIMARY KEY,
        quantity INTEGER NOT NULL,
        "priceInCents" INTEGER NOT NULL,
        "pastryId" INTEGER REFERENCES pastries(id),
        "orderId" INTEGER REFERENCES orders(id),
        UNIQUE ("orderId", "pastryId")
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
    const users = [
      {
        password: "kimspassword",
        email: "kimsemail@email.com",
        isAdmin: true
      },
      {
        password: "erinspassword",
        email: "erinsemail@email.com"
      },
      {
        password: "thuanspassword",
        email: "thuansemail@email.com"
      },
    ];

    const createdUsers = await Promise.all(users.map(createUser));
    console.log("Users being created");
    console.log(createdUsers);

    //initial pastries data
    const pastries = [
      {
      name: "Croissant",
      description: "Buttery and Flakey",
      isGlutenFree: false,
      isSweet: false,
      imageURL: "https://www.theflavorbender.com/wp-content/uploads/2020/05/French-Croissants-SM-2363.jpg",
      inventory: 23,
      priceInCents: 100
    },
    {
      name: "Bacon Maple Bar",
      description: "Sugary Savory Goodness",
      isGlutenFree: false,
      isSweet: true,
      imageURL: "https://upload.wikimedia.org/wikipedia/commons/3/34/Bacon_maple_bar.jpg",
      inventory: 10,
      priceInCents: 500
    },
  ];

  carts = [
    { userId: 1},
    {userId: 2},
    {userId: 3}
   ]

    const createdPastries = await Promise.all(pastries.map(createPastry));
    console.log("Pastries being created");
    console.log(createdPastries);
    
    const createCarts = await Promise.all(carts.map(createCart));
    console.log('createCarts :>> ', createCarts);

    const getCart  = await getCartByUserId(createdUsers[1])
    console.log('getCart :>> ', getCart);


    // const updatedPastry = await updatePastry(createdPastries[0].id, {description: "updated description"})
    // console.log('updatedPastry :>> ', updatedPastry);

    // const deletedPastry = await deletePastry(createdPastries[0].id)
    // console.log('deletedPastry :>> ', deletedPastry);

    // gettingAllPastries = await getAllPastries();
    // console.log('gettingAllPastries :>> ', gettingAllPastries);

  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
