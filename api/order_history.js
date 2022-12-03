const express = require("express");
const orderHistoryRouter = express.Router();
const { getCompletedOrders } = require("../db/models")

orderHistoryRouter.get("/", async (req, res, next) => {
    try {
        const completedOrders = await getCompletedOrders(req.user.id);
        res.send(completedOrders)
    } catch ({name, message}) {
        next({name, message})
    }
})


module.exports = orderHistoryRouter