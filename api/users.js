const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const { createUser, getUserByEmail } = require("../db/models/user");

router.post("/register", async (req, res, next) => {
    console.log('req.body :>> ', req.body);
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
    console.log('user :>> ', user);
    if (user) {
        console.log('process :>> ', process.env.JWT_SECRET);
      const token = jwt.sign(
        {
          id: user.id,
          email: email,
        },
        process.env.JWT_SECRET
      );
        console.log('token :>> ', token);
    res.send({
        user,
        message: "You're signed in",
        token
    });
}
  } catch ({name, message}) {
    next({name, message})
  }
});

module.exports = router