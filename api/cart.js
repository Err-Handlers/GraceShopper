const express = require("express");
const cartRouter = express.Router();
const { addProductToOrderProducts, findOrCreateCart, getProductById, getProductInCart, updateOrderQuantity, getOrderProductsByUserId, deleteProductFromCart, getProductAndOrderProductById } = require("../db/models");


cartRouter.get("/products", async (req, res, next) => {
  try {
    const allProductsInCart = await getOrderProductsByUserId(req.user.id)
    res.send(allProductsInCart)
  } catch ({ name, message }) {
    next({ name, message })
  }
})

cartRouter.get("/", async (req, res, next) => {
  try {
    const allProductsInCart = await getOrderProductsByUserId(req.user.id)
    const products = await Promise.all(allProductsInCart.map( product => getProductAndOrderProductById(product.orderId, product.productId)))
    console.log('products :>> ', products);
    res.send(products);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

cartRouter.patch("/", async (req, res, next) => {
  try {
    const { quantity, productId, orderId} = req.body;
    const newQuantity = await updateOrderQuantity(quantity, productId, orderId)
    res.send(newQuantity)
  } catch ({ name, message }) {
    next({ name, message })
  }
})

cartRouter.post("/", async (req, res, next) => {
  try {
    const { quantity, productId } = req.body;
    const cart = await findOrCreateCart(req.user.id)
    console.log('cart :>> ', cart);
    const product = await getProductById(productId)
    console.log('product :>> ', product);
    const productInCart = await getProductInCart({orderId: cart.id, productId})
    let result;
    if (!productInCart) {
        result = await addProductToOrderProducts({quantity, orderId: cart.id, productId, priceInCents: product.priceInCents})
    }
    res.send(result)
  } catch ({ name, message }) {
    next({ name, message });
  }
});



cartRouter.delete("/", async (req, res, next) => {
  try {
    const { productId, orderId } = req.body
    await deleteProductFromCart(productId, orderId)
    res.send({message: "deleted product"})
  } catch ({ name, message }) {
    next({ name, message });
  }
})

module.exports = cartRouter;
