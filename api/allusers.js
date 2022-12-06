const express = require('express');
const allUsersRouter = express.Router();
const { getAllUsers } = require('../db/models/user');


allUsersRouter.use((req, res, next) => {
    next();
}); 

allUsersRouter.get('/', async (req, res, next) => {
    const users = await getAllUsers();
    res.send(users);
});

module.exports= allUsersRouter
