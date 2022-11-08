const express = require('express');
const pastriesRouter = express.Router();
const {getAllPastries,
    createPastries} = require('../db');
const { deletePastries } = require('../db/models/pastries');

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

//admin routes

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

module.exports= {
    pastriesRouter
}