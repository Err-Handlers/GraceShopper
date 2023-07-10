const client = require("../client");

async function addShippingInfo(
  orderId,
  firstName,
  lastName,
  city,
  street,
  state,
  zipcode
) {
  try {
    const {
      rows: [data],
    } = await client.query(
      `
        INSERT INTO shipping_details("orderId", "shippingFirstName", "shippingLastName", "shippingCity", "shippingStreet", "shippingState", "shippingZipcode")
        VALUES($1, $2, $3, $4, $5, $6, $7 )
        RETURNING *;
    `,
      [orderId, firstName, lastName, city, street, state, zipcode]
    );
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function addPaymentInfo(
  orderId,
  name,
  city,
  street,
  state,
  zipcode,
  cardNumber,
  cardCvc
) {
  try {
    const {
      rows: [info],
    } = await client.query(
      `
        INSERT INTO payment_details("orderId", "paymentName", "paymentCity", "paymentState", "paymentStreet", "paymentZipcode", "cardNumber", "cardCvc")
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
    `,
      [orderId, name, city, state, street, zipcode, cardNumber, cardCvc]
    );
    return info;
  } catch (err) {
    console.log(err);
  }
}

async function getShippingDetailsAndOrdersByOrderId(orderId) {
  try {
    const { rows } = await client.query(
      `
        SELECT shipping_details.*, orders.* FROM shipping_details
        JOIN orders
        ON orders.id = shipping_details."orderId"
        WHERE shipping_details."orderId" = $1
      `,
      [orderId]
    );
    return rows;
  } catch (err) {
    console.log(err);
  }
}

async function addDateToOrder(orderDate, orderId) {
  const {
    rows: [order],
  } = await client.query(
    `
      UPDATE orders("orderDate")
      SET "orderDate" = $1
      WHERE id = $2
      RETURNING *;
    `,
    [orderDate, orderId]
  );
  return order;
}

async function getCompletedOrderProductsByOrderId(orderId) {
  try {
    const { rows } = await client.query(
      `
        SELECT order_products.*, orders.* 
        FROM order_products
        JOIN orders ON orders.id = order_products."orderId"
        WHERE orders.id = $1 AND orders.status = 'completed'
      `,
      [orderId]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getCompletedOrderProductsByOrderId,
  addShippingInfo,
  addPaymentInfo,
  getShippingDetailsAndOrdersByOrderId,
  addDateToOrder,
};
