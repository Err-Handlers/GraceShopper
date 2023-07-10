const express = require("express");
const orderHistoryRouter = express.Router();
const { getOrdersByUserId } = require("../db/models/cart");
const {
  addPaymentInfo,
  addShippingInfo,
  getShippingDetailsAndOrdersByOrderId,
  addDateToOrder,
} = require("../db/models/order_history");

orderHistoryRouter.get("/", async (req, res, next) => {
  try {
    const completedOrders = await getOrdersByUserId(req.user.id);
    res.send(completedOrders);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

orderHistoryRouter.post("/payment", async (req, res, next) => {
  try {
    const { name, city, street, state, zipcode, orderId, cardNumber, cardCvc } =
      req.body;
    const addPaymentDetails = await addPaymentInfo(
      orderId,
      name,
      city,
      street,
      state,
      zipcode,
      cardNumber,
      cardCvc
    );
    res.send(addPaymentDetails);
  } catch ({ name, message }) {
    next({ name, message });
  }
});
orderHistoryRouter.post("/shipping", async (req, res, next) => {
  try {
    const { firstName, lastName, city, street, state, zipcode, orderId } =
      req.body;
    const addShippingDetails = await addShippingInfo(
      orderId,
      firstName,
      lastName,
      city,
      street,
      state,
      zipcode
    );
    const shippingDetails = await getShippingDetailsAndOrdersByOrderId(orderId);
    res.send(shippingDetails);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

orderHistoryRouter.patch("/order_date", async (req, res, next) => {
  try {
    const { orderDate, orderId } = req.body;
    const order = await addDateToOrder(orderDate, orderId);
    res.send(order);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = orderHistoryRouter;
