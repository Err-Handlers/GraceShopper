const express = require('express');
const pastriesRouter = express.Router();
const {
    getAllPastries,
    createPastry,
    deletePastry,
    updatePastry
} = require('../db');


pastriesRouter.use((req, res, next) => {
    console.log("A request is being made to /pastries");

    next();
}); 

pastriesRouter.get('/', async (req, res, next) => {
    const pastries = await getAllPastries();
    res.send(pastries);
});

//admin routes

const requireAdmin = (req, res, next) => {
    if(!req.user || !req.user.isAdmin) {
        next({
            name: "MissingAdminError",
            message: "You must be an admin to perform this action"
        });
    }
    next();
}

pastriesRouter.post('/', requireAdmin, async (req,res, next) => {
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
    console.log(req.user, "hfkshfksa")
    if (!req.user.isAdmin) {
        throw "must be admin"
    }   
    res.send({pastry: newPastry})
    } catch (error) {
    console.log(error)
    next (error)
    }
} )

pastriesRouter.patch('/:pastryId', requireAdmin, async(req, res, next) => {
    console.log("fsdfsdfsdfdsfsdf")
    const {pastryId:id} = req.params
    const {name, description, isGlutenFree, isSweet, imageURL, inventory, priceInCents} = req.body;
    console.log("req", id)

    const updatedPastry = await updatePastry({ 
        id: id,
        name: name,
        description: description,
        isGlutenFree: isGlutenFree,
        isSweet: isSweet,
        imageURL: imageURL,
        inventory: inventory,
        priceInCents: priceInCents
    })
    console.log(updatedPastry)
    res.send(updatedPastry)
})

pastriesRouter.delete('/:pastryId', requireAdmin, async(req, res, next) => {
    const {pastryId} = req.params;
    const deletedPastry = await deletePastry(pastryId)
    console.log(deletedPastry)
    res.send(deletedPastry)
})

module.exports= pastriesRouter
