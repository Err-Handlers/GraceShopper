const express = require("express");
const cartRouter = express.Router();
const { addProductToOrderProducts, findOrCreateCart, getProductById, getProductInCart, updateOrderQuantity, getOrderProductsByUserId } = require("../db/models");

cartRouter.get("/", async (req, res, next) => {
  try {
    console.log('req.user :>> ', req.user);
    const allProductsInCart = await getOrderProductsByUserId(req.user.id)
    console.log('theCart********** :>> ', allProductsInCart);
    const products = await Promise.all(allProductsInCart.map( product => getProductById(product.productId)))
    console.log('products :>> ', products);
    res.send(products);
  } catch ({ name, message }) {
    next({ name, message });
  }
});


cartRouter.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const { quantity, productId } = req.body;
    const cart = await findOrCreateCart(req.user.id)
    console.log('cart :>> ', cart);
    const product = await getProductById(productId)
    console.log('product :>> ', product);
    const productInCart = await getProductInCart({orderId: cart.id, productId})
    console.log('productInCart :>> ', productInCart);
    let result;
    if (!productInCart) {
        result = await addProductToOrderProducts({quantity, orderId: cart.id, productId, priceInCents: product.priceInCents})
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

cartRouter.delete("/", async (req, res, next) => {
  try {
    const updatedCart = await deleteProductFromCart(productId)
    res.send(updatedCart)
  } catch (error) {
    
  }
})

module.exports = cartRouter;
