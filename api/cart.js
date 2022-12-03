const express = require("express");
const cartRouter = express.Router();
const { addProductToOrderProducts, findOrCreateCart, getProductById, getProductInCart, updateOrderQuantity, getOrderProductsByUserId, deleteProductFromCart, getProductAndOrderProductById } = require("../db/models");

cartRouter.get("/guest/products", async (req, res, next) => {
  try {
    const productById = await getProductById(id)
    res.send(productById)
  } catch ({ name, message }) {
    next({ name, message })
  }
} )

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
    console.log('newQuantity :>> ', newQuantity);
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
    const result = await addProductToOrderProducts({quantity, orderId: cart.id, productId, priceInCents: product.priceInCents})
    console.log('result :>> ', result);
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
