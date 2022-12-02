const express = require("express");
const orderHistoryRouter = express.Router();
const { getOrdersIfCompleted } = require("../db/models")

orderHistoryRouter.get("/", async (req, res, next) => {
    try {
        const completedOrders = await getOrdersIfCompleted(req.user.id);
        res.send(completedOrders)
    } catch ({name, message}) {
        next({name, message})
    }
})


module.exports = orderHistoryRouter