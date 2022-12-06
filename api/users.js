const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const { createUser, getUserByEmail, validateAndGetUser, getAllUsers } = require("../db/models/user");

router.post("/register", async (req, res, next) => {
  console.log("req.body :>> ", req.body);
  try {
    const { email, password } = req.body;
    const checkUser = await getUserByEmail(req.body);
    if (checkUser) {
      next({
        name: "Error signing up",
        message: "That email is already in use",
      });
    }
    if (password.length < 8) {
      next({ name: "Error signing up", message: "Password is too short" });
    }
    const user = await createUser(req.body);
    console.log("user :>> ", user);
    if (user) {
      console.log("process :>> ", process.env.JWT_SECRET);
      const token = jwt.sign(
        {
          id: user.id,
          email
        },
        process.env.JWT_SECRET
      );
      console.log("token :>> ", token);
      res.send({
        user,
        message: "Thank you for signing up!",
        token,
        ok: true, //what does this mean? -erin
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    console.log("HI");
    const { email, password } = req.body;

    if (!email || !password) {
      next({
        name: "MissingCredentialsError",
        message: "Please supply both an email and a password",
      });
    }

    const user = await validateAndGetUser({email, password});
    console.log(user);
    if (user) {
      const token = jwt.sign(
        { 
          id: user.id, 
          email: user.email 
        },
        process.env.JWT_SECRET
      );
      res.send({ 
        message: "you're logged in!", 
        token,
        user });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});


router.use((req, res, next) => {
  console.log("A request is being made to /users")

  next();
});

router.get('/users', async (req, res, next) => {
  const users = await getAllUsers();
  res.send(users);
});

router.post('/users', async (req,res, next) => {
  try {
  const { email, password } = req.body.user;
  console.log("reqqqq", req.body.user)
  
  const allUsers = await getAllUsers({ 
      email: email,
      password:password
  })

  // if (!req.user.isAdmin) {
  //     throw "must be admin"
  // }   
  res.send(allUsers)
  } catch (error) {
  console.log(error)
  next (error)
  }
} )

module.exports = router;
