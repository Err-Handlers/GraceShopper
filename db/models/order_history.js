const client = require("../client");


async function getCompletedOrdersByUserId(userId) {
    try {
      const {rows} = await client.query(`
          SELECT  orders
          JOIN order_products 
          ON orders.id = order_products."orderId"
          WHERE orders."userId" = $1 AND status = 'completed'
        `, [userId])
      return rows;
    } catch (err) {
      console.log(err);
    }
  }

  async function addShippingInfo(orderId, firstName, lastName, city, street, state, zipcode ) {
    try {
        const {rows: [data]} = await client.query(`
        INSERT INTO shipping_details("orderId", "shippingFirstName", "shippingLastName", "shippingCity", "shippingStreet", "shippingState", "shippingZipcode")
        VALUES($1, $2, $3, $4, $5, $6, $7 )
        RETURNING *;
    `, [orderId, firstName, lastName, city, street, state, zipcode])
    return data
    } catch (err) {
        console.log(err);
    }
  }

  async function addPaymentInfo(orderId, name, city, street, state, zipcode, cardNumber, cardCvc) {
    try {
        const {rows: [info]} = await client.query(`
        INSERT INTO payment_details("orderId", "paymentName", "paymentCity", "paymentState", "paymentStreet", "paymentZipcode", "cardNumber", "cardCvc")
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
    `, [orderId, name, city, state, street, zipcode, cardNumber, cardCvc])
    return info;
    } catch (err) {
        console.log(err);
    }
  }

  // async function getPaymentAndShippingDetails(userId) {
  //   try {
  //       const { rows } = await client.query(`
  //           SELECT payment_details.*, shipping_details.* FROM payment_details 
  //           JOIN shipping_details
  //           ON payment_details."orderId" = shipping_details."orderId"
  //           WHERE shipping_details."orderId" = ${userId} AND payment_details."orderId" = ${userId}
  //       `)
  //       return details
  //   } catch (err) {
  //       console.log(err);
  //   }

  // }

  async function getShippingDetailsAndOrdersByOrderId(orderId) {
    try {
      const {rows} = await client.query(`
        SELECT shipping_details.*, orders.* FROM shipping_details
        JOIN orders
        ON orders.id = shipping_details."orderId"
        WHERE shipping_details."orderId" = $1
      `, [orderId])
      return rows
    } catch(err) {
      console.log(err);
    }
  }

  async function addDateToOrder(orderDate, orderId) {
    const { rows: [order] } = await client.query(`
      UPDATE orders("orderDate")
      SET "orderDate" = $1
      WHERE id = $2
      RETURNING *;
    `, [orderDate, orderId])
    return order;
  }

  async function getCompletedOrderProductsByOrderId(orderId) {
    const { rows } = await client.query(`
      SELECT * FROM order_products
      WHERE "orderId" = $1 AND status = 'completed'
    `)
    return rows;
  }


  module.exports = {getCompletedOrderProductsByOrderId, getCompletedOrdersByUserId, addShippingInfo, addPaymentInfo, getShippingDetailsAndOrdersByOrderId, addDateToOrder}