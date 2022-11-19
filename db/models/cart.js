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

async function getProductInCart({ orderId, pastryId }) {
  const {
    rows: [product],
  } = await client.query(
    `
      SELECT * FROM order_pastries
      WHERE "orderId" = $1 AND "pastryId" = $2
    `,
    [orderId, pastryId]
  );
  return product;
}

async function addPastryToOrderPastries({
  quantity,
  orderId,
  pastryId,
  priceInCents,
}) {
  try {
      const {
        rows: [cartPastry],
      } = await client.query(
        `
      INSERT INTO order_pastries(quantity, "orderId", "pastryId", "priceInCents")
      VALUES ($1, $2, $3, $4)
      RETURNING *;
  `,
        [quantity, orderId, pastryId, priceInCents]
      );

      return cartPastry;
  } catch (error) {
    console.log(error);
  }
}

async function updateOrderQuantity(quantity, orderPastryId) {
  try {
    const {
      rows: [order],
    } = await client.query(`
        UPDATE order_pastries
        SET quantity = ${quantity}
        WHERE id = ${orderPastryId}
        RETURNING *
      `);
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
      const order = await createOrder({ userId: userId, status: "cart" });
      // return cart
      return order;
    }

    return cart;
  } catch (err) {
    console.log(err);
  }
}

async function getOrderPastryByOrderId(orderId) {
  try {
    const { rows } = await client.query(
      `
      SELECT * FROM order_pastries
      WHERE "orderId" = $1 
    `,
      [orderId]
    );
    return rows;
  } catch (error) {
   console.log(error); 
  }
}

async function getAllOrderPastriesByOrderId(orderId){
  try {
    const { rows } = await client.query(
      `
      SELECT * FROM order_pastries
      WHERE "orderId" = $1
    `,
      [orderId]
    );
    return rows;
  } catch (error) {
   console.log(error); 
  }
}

//get cartPastriesbyCartId
//(cartId: 1, pastryId: 1, quantity: 3)
//(cartId: 1, pastrId: 2, quantity: 2)

//need to get pastries by cartId through cart_pastries

module.exports = {
  getOrderByUserId,
  addPastryToOrderPastries,
  createOrder,
  findOrCreateCart,
  updateOrderQuantity,
  getProductInCart,
  getOrderPastryByOrderId
};
