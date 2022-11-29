const {
  client,
  // declare your model imports here
  // for example, User
} = require("./");
const { createUser } = require("./models/user");
const { createProduct, updateProduct, getAllProducts, getProductById } = require("./models/products")
const { getOrderByUserId, addProductToOrderProducts, createOrder, getProductInCartDetails } = require("./models/cart")

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    await client.query(`
      DROP TABLE IF EXISTS order_products;
      DROP TABLE IF EXISTS orders;
      DROP TYPE IF EXISTS status;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS products;
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
      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        "imageURL" VARCHAR(255),
        inventory INTEGER NOT NULL,
        "priceInCents" INTEGER NOT NULL
      );
      CREATE TABLE reviews(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "productId" INTEGER REFERENCES products(id),
        "reviewDescription" TEXT NOT NULL,
        UNIQUE ("userId", "productId")
      );
      
      CREATE TYPE status AS ENUM (
        'cart', 'completed'
      );
      CREATE TABLE orders(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        status STATUS
      );
      CREATE TABLE order_products(
        id SERIAL PRIMARY KEY,
        quantity INTEGER NOT NULL,
        "priceInCents" INTEGER NOT NULL,
        "productId" INTEGER REFERENCES products(id),
        "orderId" INTEGER REFERENCES orders(id),
        UNIQUE ("orderId", "productId")
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
        email: "erinsemail@email.com",
        isAdmin: false
      },
      {
        password: "thuanspassword",
        email: "thuansemail@email.com",
        isAdmin: false
      },
    ];

    const createdUsers = await Promise.all(users.map(createUser));
    console.log("Users being created");
    console.log(createdUsers);

    //initial pastries data
    const products = [
      {
      name: "Plant Trees",
      description: "Arms wrapped around a tree",
      imageURL: "https://www.theflavorbender.com/wp-content/uploads/2020/05/French-Croissants-SM-2363.jpg",
      inventory: 23,
      priceInCents: 100
    },
    {
      name: "Koi Fish",
      description: "Minimal Koi Art",
      imageURL: "https://upload.wikimedia.org/wikipedia/commons/3/34/Bacon_maple_bar.jpg",
      inventory: 10,
      priceInCents: 500
    },
  ];

  const initialOrders = [
    {
      userId: 1,
      status: 'cart'
    },
    {
      userId: 2,
      status: 'completed'
    },
    {
      userId: 3,
      status: 'cart'
    }
  ]
  
      const createdProducts = await Promise.all(products.map(createProduct));
      console.log("Products being created");
      console.log(createdProducts);
  
      const createdOrders = await Promise.all(initialOrders.map(createOrder));
      console.log('createdOrders :>> ', createdOrders);
  
      // const test = await getProductInCartDetails(1);
      // console.log('test :>> ', test);
  
  
  // const addProductToOrderProducts = await addPastryToCartPastries({})
  
  
  
  // const getProductsInCart = await getProductsByCartId(createCarts[1].id)
  // console.log('getPastriesInCart :>> ', getProductsInCart);
  
  // const updatedPastry = await updateProduct(createdProducts[0].id, {description: "updated description"})
  // console.log('updatedPastry :>> ', updatedPastry);
  
  // const deletedPastry = await updateProduct(createdProducts[0].id)
  // console.log('deletedPastry :>> ', deletedPastry);
  
  // const gettingAllPastries = await getAllProducts();
  // console.log('gettingAllPastries :>> ', gettingAllPastries);
  
  // const pastryById = await getProductById(createdProducts[0].id)
  // console.log("pastry:", pastryById);
  
}
catch (error){
  console.log(error);
}
}
  
buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
