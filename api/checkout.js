const express = require("express");
const checkoutRouter = express.Router();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const { getOrderProductsByUserId} = "../db/models"
checkoutRouter.get("/", async (req, res, next) => {
    try {
      const allProductsInCart = await getOrderProductsByUserId(req.user.id);
      res.send(allProductsInCart);
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  checkoutRouter.get("/config", async (req, res, next) => {
    try {
       res.send({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    })
    } catch (err) {
      console.error(err);
    }
    
  })
  
  checkoutRouter.post("/create-payment-intent", async (req, res) => {
    try {
      
      const paymentIntent = await stripe.paymentIntents.create({
        currency: "usd",
        amount: 1000,
        automatic_payment_methods: { enabled: true }
      }) 
      res.send({clientSecret: paymentIntent.client_secret})
    } catch (err) {
      console.error('err :>> ', err);
      return res.status(400).send({error: {message: err.message}})
    }
  })

module.exports = checkoutRouter;