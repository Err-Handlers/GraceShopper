const express = require('express');
const pastriesRouter = express.Router();
const {
    getAllPastries,
    createPastry,
} = require('../db');
const { deletePastries } = require('../db/models/pastries');

pastriesRouter.use((req, res, next) => {
    console.log("A request is being made to /pastries");

    next();
}); 

pastriesRouter.get('/', async (req, res, next) => {
    const pastries = await getAllPastries();
    res.send(pastries);
});

//admin routes

pastriesRouter.post('/', async (req,res, next) => {
    try {
    const { name, description, isGlutenFree, isSweet, imageURL, inventory, priceInCents } = req.body.pastry;
    
    const newPastry = await createPastry({ 
        name: name,
        description: description,
        isGlutenFree: isGlutenFree,
        isSweet: isSweet,
        imageURL: imageURL,
        inventory: inventory,
        priceInCents: priceInCents
    } )
    console.log(req.user)
    if (!req.user.isAdmin) {
        throw "must be admin"
    }   
    res.send({pastry: newPastry})
    } catch (error) {
    console.log(error)
    next (error)
    }
} )

pastriesRouter.patch('/:pastryId', async(req, res, next) => {
    const {id} = req.params;
    const {name, description, isGlutenFree, isSweet, imageURL, inventory, priceInCents} = req.body;

    const updatedPastry = await updatedPastry({ 
        id: id,
        name: name,
        description: description,
        isGlutenFree: isGlutenFree,
        isSweet: isSweet,
        imageURL: imageURL,
        inventory: inventory,
        priceInCents: priceInCents
    })

    res.send(updatedPastry)
})

pastriesRouter.delete('/:pastryId', async(req, res, next) => {
    const {id} = req.params;
    const deletedPastry = await deletePastries({id})
    res.send(deletedPastry)
})

module.exports= pastriesRouter
