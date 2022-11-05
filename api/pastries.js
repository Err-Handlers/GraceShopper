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
pastriesRouter.post('/pastries', async (req,res, next) => {
    try {
    const { name, description, isGlutenFree, isSweet, imageURL, inventory, priceInCents } = req.body;
    
    const newPastry = await createPastries({ 
        name: name,
        description: description,
        isGlutenFree: isGlutenFree,
        isSweet: isSweet,
        imageURL: imageURL,
        inventory: inventory,
        priceInCents: priceInCents
    } )
    if (!req.user.isAdmin) {
        throw "must be admin"
    }   
    res.send({newPastry})
    } catch (error) {
    console.log(error)
    next (error)
    }
} )


module.exports= {
    pastriesRouter
}