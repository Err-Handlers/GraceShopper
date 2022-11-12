const express = require('express');
const cartRouter = express.Router();
const { createCart } = require('../db/models')

cartRouter.get("/", async (req, res, next) => {
    try {
        // const { id } = req.body
        // console.log('req.body :>> ', req.body);
        // const newCart = await createCart({id})
        res.send("help")
    } catch (error) {
         console.log(error)
    next (error)
    }
})

module.exports = cartRouter;