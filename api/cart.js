const express = require("express");
const cartRouter = express.Router();
const { addProductToOrderProducts, findOrCreateCart, getProductById, getProductInCart, updateOrderQuantity, getOrderProductsByUserId, deleteProductFromCart, getProductAndOrderProductById, updateOrderStatus, getOrderByUserId, getOrdersByUserId } = require("../db/models");


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
    const product = await getProductById(productId)
    const productInCart = await getProductInCart({orderId: cart.id, productId})
    let result;
    if (!productInCart) {
        result = await addProductToOrderProducts({quantity, orderId: cart.id, productId, priceInCents: product.priceInCents})
    } else {
        const newQuantity = productInCart.quantity + Number(quantity)
        result = await updateOrderQuantity(newQuantity, productInCart.id, productInCart.orderId)
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

cartRouter.patch("/checkout", async (req, res, next) => {
  try {
    const updateStatus = await updateOrderStatus(req.body.orderId)
    console.log('updateStatus :>> ', updateStatus);
    res.send(updateStatus)
  } catch ({name, message}) {
    next({name, message})
  }
})

// cartRouter.get("")


cartRouter.get("/test", async (req, res, next) => {
  try {
    const data = await getOrdersByUserId(req.user.id)
    res.send(data)
  } catch ({name, message}) {
    next({name, message})
  }
})

module.exports = cartRouter;
