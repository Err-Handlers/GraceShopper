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
        `, [id])
        console.log('cart :>> ', cart);
        return cart;
    } catch (error) {
        console.log(error);
    }
}

async function addPastryToCartPastries (quantity, pastryId, cartId) {
    try {
        const { rows: [cartPastry] } = await client.query(`
            INSERT INTO cart_pastries(quantity, "pastryId", "cartId")
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [quantity, pastryId, cartId])
        return cartPastry
    } catch (error) {
        console.log(error);
    }
}

async function updateOrderQuantity(quantity, orderPastryId) {
  try {
      const { rows: [order] } = await client.query(`
        UPDATE order_pastries
        SET quantity = ${quantity}
        WHERE id = ${orderPastryId}
      `)
      return order;
  } catch (err) {
    console.log(err);
  }
}

async function getOrderPastryIdByOrderId() {
  
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
    console.log('cart :>> ', cart);
    if (!cart) {
      // create cart
      const order = await createOrder({ userId: userId, status: "cart" });
      console.log('order :>> ', order);
      // return cart
      return order;
    }
    return cart;
  } catch (err) {
    console.log(err);
  }
}


async function getOrderPastriesByOrderId(orderId) {
  const { rows } = await client.query(`
    SELECT * FROM order_pastries
    WHERE id = $1
  `, [orderId])
  return rows;
}



//get cartPastriesbyCartId
//(cartId: 1, pastryId: 1, quantity: 3)
//(cartId: 1, pastrId: 2, quantity: 2)

//need to get pastries by cartId through cart_pastries

module.exports = {
  getOrderByUserId,
  addPastryToOrderPastries,
  getPastriesByUserId,
  getOrdersInCart,
  createOrder,
  findOrCreateCart
};
