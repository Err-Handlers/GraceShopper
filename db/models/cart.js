const client = require("../client");

async function createOrder({ userId, status }) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
    INSERT INTO orders("userId", status)
    VALUES ($1, $2)
    RETURNING *;
  `,
      [userId, status]
    );
    return order;
  } catch (err) {
    console.log(err);
  }
}

async function getOrderByUserId({ id }) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
            SELECT * FROM orders
            WHERE "userId" = $1
        `,
      [id]
    );
    return order;
  } catch (error) {
    console.log(error);
  }
}

async function getOrdersByUserId(userId) {
  try {
    const {rows} = await client.query(`
      SELECT * FROM orders
      WHERE userId = ${userId}
    `)
    return rows
  } catch (err) {
    console.log(err);
  }
}

async function getProductInCart({ orderId, productId }) {
  const {
    rows: [product],
  } = await client.query(
    `
      SELECT * FROM order_products
      WHERE "orderId" = $1 AND "productId" = $2
    `,
    [orderId, productId]
  );
  return product;
}


async function addProductToCart({
  quantity,
  orderId,
  productId,
  priceInCents,
}) {
  try {
      const {
        rows
      } = await client.query(
        `
      INSERT INTO order_products(quantity, "orderId", "productId", "priceInCents")
      VALUES ($1, $2, $3, $4)
      RETURNING *;
  `,
        [quantity, orderId, productId, priceInCents]
      );

      return rows;
  } catch (error) {
    console.log(error);
  }
}

async function updateOrderQuantity(quantity, productId, orderId) {
  try {
    const {
      rows: [order],
    } = await client.query(`
        UPDATE order_products
        SET quantity = $1
        WHERE "productId" = $2 AND "orderId" = $3
        RETURNING *
      `, [quantity, productId, orderId] );
    return order;
  } catch (err) {
    console.log(err);
  }
}


async function findOrCreateCart(userId) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
            SELECT *
            FROM orders
            WHERE "userId" = $1 AND status = 'cart';
        `,
      [userId]
    );
    if (!cart) {
      // create cart
      const order = await createOrder({ userId, status: "cart" });
      // return cart
      return order;
    }

    return cart;
  } catch (err) {
    console.log(err);
  }
}

async function getOrderProductByOrderId(orderId) {
  try {
    const { rows } = await client.query(
      `
      SELECT * FROM order_products
      WHERE "orderId" = $1 
    `,
      [orderId]
    );
    return rows;
  } catch (error) {
   console.log(error); 
  }
}

async function addProductToOrderProducts({
  quantity,
  orderId,
  productId,
  priceInCents,
}) {
  try {
      const {
        rows: [product],
      } = await client.query(
        `
      INSERT INTO order_products(quantity, "orderId", "productId", "priceInCents")
      VALUES ($1, $2, $3, $4)
      RETURNING *;
  `,
        [quantity, orderId, productId, priceInCents]
      );

      return product;
  } catch (error) {
    console.log(error);
  }
}

async function getOrderProductsByUserId(userId){
  try {
    const {
      rows
    } = await client.query(
      `
        SELECT orders.*, order_products.* FROM orders
        JOIN order_products ON order_products."orderId" = orders.id
        WHERE orders."userId" = $1 AND orders.status = 'cart';
      `, [userId])
      return rows;
  } catch (error) {
    console.log(error)
  }
}

async function getProductInCartDetails(orderId){
  try {
    const { rows } = await client.query(`
    SELECT products.* FROM products
    JOIN order_products 
    ON products.id = order_products."productId"
    WHERE order_products."orderId" = ${orderId}
    `)
    console.log('rows :>> ', rows);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function deleteProductFromCart(productId, orderId){
  try {
    await client.query(`
      DELETE FROM order_products
      WHERE "productId" = $1 AND "orderId" = $2
    `, [productId, orderId])
  } catch (error) {
    console.log(error);
  }
}

async function updateOrderStatus(orderId) {
  try {
    const {
      rows: [order],
    } = await client.query(`
        UPDATE orders
        SET status = 'completed'
        WHERE id = $1 AND status = 'cart'
        RETURNING *
      `, [orderId])
    return order;
  } catch (err) {
    console.log(err);
  }
}

async function getCompletedOrders(userId) {
  try {
    const {rows} = await client.query(`
        SELECT orders.*, order_products FROM orders
        JOIN order_products 
        ON orders.id = order_products."orderId"
        WHERE orders."userId" = $1 AND status = 'completed'
        RETURNING *
      `, [userId])
    return rows;
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  getOrdersByUserId,
  updateOrderStatus,
  getCompletedOrders,
  getOrderByUserId,
  addProductToCart,
  createOrder,
  findOrCreateCart,
  updateOrderQuantity,
  getProductInCart,
  getOrderProductByOrderId,
  getOrderProductsByUserId,
  getProductInCartDetails,
  deleteProductFromCart,
  addProductToOrderProducts
};
