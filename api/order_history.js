const express = require("express");
const orderHistoryRouter = express.Router();
const { getProductById, getOrdersByUserId } = require("../db/models");
const { getCompletedOrdersByUserId, addPaymentInfo, addShippingInfo, getShippingDetailsAndOrdersByOrderId, addDateToOrder, getCompletedOrderProductsByOrderId, getPaymentAndShippingDetails } = require("../db/models/order_history");

orderHistoryRouter.get("/", async (req, res, next) => {
    try {
        console.log('req.user :>> ', req.user);
        const completedOrders = await getOrdersByUserId(req.user.id);
        res.send(completedOrders)
    } catch ({name, message}) {
        next({name, message})
    }
})

orderHistoryRouter.post("/payment", async (req, res, next) => {
    try {
        const { name, city, street, state, zipcode, orderId, cardNumber, cardCvc } = req.body
        const addPaymentDetails = await addPaymentInfo(orderId, name, city, street, state, zipcode, cardNumber, cardCvc)
        res.send(addPaymentDetails)
    } catch ({name, message}) {
        next({name, message})
    }
})
orderHistoryRouter.post("/shipping", async (req, res, next) => {
    try {
        const { firstName, lastName, city, street, state, zipcode, orderId } = req.body
        const addShippingDetails = await addShippingInfo(orderId, firstName, lastName, city, street, state, zipcode)
        console.log('addShippingDetails :>> ', addShippingDetails);
        const shippingDetails = await getShippingDetailsAndOrdersByOrderId(orderId)
        console.log('shippingDetails :>> ', shippingDetails);
        res.send(shippingDetails)
    } catch ({name, message}) {
        next({name, message})
    }
})

orderHistoryRouter.patch("/order_date", async (req, res, next) => {
    try {
        console.log('req.body :>> ', req.body);
        const { orderDate, orderId} = req.body
        const order = await addDateToOrder(orderDate, orderId);
        console.log('order :>> ', order);
        res.send(order)
    } catch ({name, message}) {
        next({name, message})
    }
})

orderHistoryRouter.get("/order_products", async (req, res, next) => {
    try {
        const orderProducts = await getCompletedOrderProductsByOrderId(req.body.orderId);
        res.send(orderProducts)
    } catch ({name, message}) {
        next({name, message})
    }
})

orderHistoryRouter.get("/shipping_details", async (req, res, next) => {
    try {
        const shippingAndPaymentDetails = await getPaymentAndShippingDetails(req.user.id)
        res.send(shippingAndPaymentDetails)
    } catch ({name, message}) {
        next({name, message})
    }
})

module.exports = orderHistoryRouter