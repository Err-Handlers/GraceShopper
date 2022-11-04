const express = require("express");
const router = express.Router()


router.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

// place your routers here

const usersRouter = require("./users")
usersRouter.use("/users", usersRouter)

const pastriesRouter = require("./pastries")
pastriesRouter.use("/pastries", pastriesRouter)



router.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

module.exports = router;
