import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import config from "../config.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    isAdmin,
    street,
    apartment,
    zip,
    city,
    country,
  } = req.body;

  return User.create({
    name,
    email,
    passwordHash: bcrypt.hashSync(password, 10),
    phone,
    isAdmin,
    street,
    apartment,
    zip,
    city,
    country,
  })
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      console.error(`[ERROR] - register user failed: ${err.message}`);
      return res.status(400).send("the user cannot be created!");
    });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  return User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json("The user not found");
      }
      if (user && bcrypt.compareSync(password, user.passwordHash)) {
        const token = jwt.sign(
          {
            userId: user.id,
            isAdmin: user.isAdmin,
          },
          config.secret,
          { expiresIn: "1d" }
        );
        res.status(200).send({ user: user.email, token: token });
      } else {
        res.status(400).send("password is wrong!");
      }
    })
    .catch((err) => {
      console.error(`[ERROR] - user not found: ${err.message}`);
      return res.status(404).send("User not found !");
    });
});

router.get(`/`, async (req, res) => {
  return User.find()
    .select("-passwordHash")
    .then((userList) => {
      if (!userList) {
        return res.status(500).json({ success: false });
      }
      return res.status(200).json(userList);
    });
});

export default router;
