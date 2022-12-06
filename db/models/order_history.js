const client = require("../client");


async function getCompletedOrdersByUserId(userId) {
    try {
      const {rows} = await client.query(`
          SELECT orders.*, order_products.* FROM orders
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
        INSERT INTO shipping_details("orderId", "firstName", "lastName", city, street, state, zipcode)
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
        INSERT INTO payment_details("orderId", name, city, state, street, zipcode, "cardNumber", "cardCvc")
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
    `, [orderId, name, city, state, street, zipcode, cardNumber, cardCvc])
    return info;
    } catch (err) {
        console.log(err);
    }
  }

  async function getPaymentAndShippingDetails() {
    try {
        const {rows} = await client.query(`
            SELECT payment_details.*, shipping_details.* FROM payment_details 
            JOIN shipping_details
            ON payment_details."orderId" = shipping_details."orderId"
        `)
        return rows
    } catch (err) {
        console.log(err);
    }

  }


  module.exports = {getCompletedOrdersByUserId, addShippingInfo, addPaymentInfo, getPaymentAndShippingDetails}