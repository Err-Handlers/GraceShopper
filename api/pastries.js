const express = require('express');
const pastriesRouter = express.Router();
const {getAllPastries,
    createPastries} = require('../db');

pastriesRouter.use((req, res, next) => {
    console.log("A request is being made to /pastries");

    next();
}); 

pastriesRouter.get('/pastries', async (req, res) => {

    const pastries = await getAllPastries();

    res.send({
        pastries
    });
});

//admin route



module.exports= {
    pastriesRouter
}