const express = require("express");
const cartRouter = express.Router();
const { addPastryToOrderPastries, findOrCreateCart, getPastryById, getProductInCart, updateOrderQuantity, getOrderPastriesByUserId } = require("../db/models");

cartRouter.get("/", async (req, res, next) => {
  try {
    console.log('req.user :>> ', req.user);
    const allProductsInCart = await getOrderPastriesByUserId(req.user.id)
    console.log('theCart :>> ', allProductsInCart);
    const pastries = await Promise.all(allProductsInCart.map( product => getPastryById(product.pastryId)))
    console.log('pastries :>> ', pastries);
    res.send(pastries);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

cartRouter.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const { quantity, pastryId } = req.body;
    const cart = await findOrCreateCart(req.user.id)
    console.log('cart :>> ', cart);
    const pastry = await getPastryById(pastryId)
    console.log('pastry :>> ', pastry);
    const productInCart = await getProductInCart({orderId: cart.id, pastryId})
    console.log('productInCart :>> ', productInCart);
    let result;
    if (!productInCart) {
        result = await addPastryToOrderPastries({quantity, orderId: cart.id, pastryId, priceInCents: pastry.priceInCents})
    } else {
        const newQuantity = productInCart.quantity + Number(quantity)
        result = await updateOrderQuantity(newQuantity, productInCart.id)
    }
    console.log('result :>> ', result);
     res.send(result)
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = cartRouter;
