const express = require("express");
const guestRouter = express.Router();

const {addGuestEmail, addGuestOrder, addGuestOrderProducts, getProductById } = require("../db/models")

guestRouter.get("/products/:id", async (req, res, next) => {
    console.log('req.params.id :>> ', req.params.id);
    try {
      const productById = await getProductById(req.params.id)
      res.send(productById)
    } catch ({ name, message }) {
      next({ name, message })
    }
  } )

guestRouter.post("/email", async (req, res, next) => {
    try {
      const addEmail = await addGuestEmail(req.body.email)
      res.send(addEmail)
    } catch ({name, message}) {
      next({name, message})
    }
  })
  
  guestRouter.post("/order", async (req, res, next) => {
    try {
      const { userId, totalPriceInCents} = req.body 
      console.log(req.body);
      const addOrder = await addGuestOrder({userId, orderTotal: totalPriceInCents, status: 'completed'})
      console.log(addOrder);
      res.send(addOrder)
    } catch ({name, message}) {
      next({name, message})
    }
  })

  guestRouter.post("/orderProducts", async (req, res, next) => {
    try {
        const { quantity, priceInCents, productId, orderId } = req.body;
        console.log(req.body);
        const addOrderProducts = await addGuestOrderProducts({quantity, priceInCents, productId, orderId});
        res.send(addOrderProducts);
    } catch ({name, message}) {
        next({name, message})
    }
  })

  module.exports = guestRouter;