const express = require("express");
const router = express.Router()
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { getUserById } = require("../db/models/user")


router.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  if (!auth) { 
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
      const { id } = jwt.verify(token, JWT_SECRET);
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${ prefix }`
    });
  }
});

// place your routers here

const usersRouter = require("./users")
router.use("/users", usersRouter)

const cartRouter = require("./cart")
router.use("/cart", cartRouter)

const productsRouter = require("./products")
router.use("/products", productsRouter);

const orderHistoryRouter = require("./order_history")
router.use("/order_history", orderHistoryRouter)

// const adminRouter = require("./admin")
// router.use("/admin", adminRouter);

router.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

module.exports = router;
