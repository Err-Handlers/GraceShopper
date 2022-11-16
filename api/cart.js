const express = require("express");
const cartRouter = express.Router();
const { getCartByUserId, getPastriesByUserId, addPastryToOrderPastries, findOrCreateCart, getPastryById } = require("../db/models");

cartRouter.get("/", async (req, res, next) => {
  try {
    console.log('req.user :>> ', req.user);
    const usersProducts = await getPastriesByUserId(1)
    console.log('newCart :>> ', usersProducts);
    res.send(usersProducts);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

cartRouter.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const { quantity, pastryId } = req.body;
    const cart = await findOrCreateCart(req.user.id)
    // console.log('cart :>> ', cart);
    const pastry = await getPastryById(pastryId)
    const orderProducts = await addPastryToOrderPastries(quantity, pastryId, cart.id, pastry.priceInCents)
    console.log('orderProducts :>> ', orderProducts);
    res.send(orderProducts);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = cartRouter;
