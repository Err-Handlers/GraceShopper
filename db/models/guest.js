const client = require("../client");

async function addGuestEmail(email){
    try {
      const {rows: [user]} = await client.query(`
        INSERT INTO users(email)
        VALUES ($1)
        RETURNING *;
      `, [email])
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  
  async function addGuestOrder({userId, orderTotal, status}){
    try {
      const {rows: [order]} = await client.query(`
        INSERT INTO orders("userId", "totalPriceInCents", status)
        VALUES ($1, $2, $3)
        RETURNING *;
      `,[userId, orderTotal, status])
      return order;
    } catch (error) {
      console.log(error);
    }
  }
  
  async function addGuestOrderProducts({quantity, priceInCents, productId, orderId}){
    try {
      const {rows: [orderProduct]} = await client.query(`
        INSERT INTO order_products(quantity, "priceInCents", "productId", "orderId")
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `, [quantity, priceInCents, productId, orderId])
      return orderProduct;
    } catch (error) {
      console.log(error);
    }
  }

  module.exports = {
    addGuestEmail,
  addGuestOrder,
  addGuestOrderProducts
  }