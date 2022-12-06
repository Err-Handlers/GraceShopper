const express = require("express");
const orderHistoryRouter = express.Router();
const { getProductById } = require("../db/models");
const { getCompletedOrdersByUserId, addPaymentInfo, addShippingInfo } = require("../db/models/order_history");

orderHistoryRouter.get("/", async (req, res, next) => {
    try {
        console.log("req.user => ", req.user);
        const completedOrders = await getCompletedOrdersByUserId(req.user.id);
        console.log('completedOrders :>> ', completedOrders);
        const productdata = await Promise.all(completedOrders.map(o => getProductById(o.productId)))
        console.log('productData :>> ', productdata);
        const result = completedOrders.map((p, i) => {
            return {...p, name: productdata[i].name, imageURL: productdata[i].imageURL}
        })
        res.send(result)
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
        res.send(addShippingDetails)
    } catch ({name, message}) {
        next({name, message})
    }
})


module.exports = orderHistoryRouter