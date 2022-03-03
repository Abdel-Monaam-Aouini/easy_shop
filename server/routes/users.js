import express from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt';

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, phone, isAdmin,
    street, apartment, zip, city, country } = req.body;

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

export default router;
