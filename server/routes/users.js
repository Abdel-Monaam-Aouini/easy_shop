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

// get Users List
router.get(`/`, (req, res) => {
  return User.find()
    .select("-passwordHash")
    .then((userList) => {
      if (!userList) {
        return res.status(500).json({ success: false });
      }
      return res.status(200).json(userList);
    });
});

router.get("/:id", (req, res) => {
  return User.findById(req.params.id)
    .select("-passwordHash")
    .then((user) => {
      if (!user) {
        return res
          .status(500)
          .json({ message: "The user with the given ID was not found." });
      }
      return res.status(200).json(user);
    })
    .catch(() => {
      return res
        .status(500)
        .json({ message: "The user with the given ID was not found." });
    });
});

// Update the user
router.put("/:id", (req, res) => {
  return User.findById(req.params.id)
    .then((userExist) => {
      let newPassword;
      if (req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10);
      } else {
        newPassword = userExist.passwordHash;
      }
      return userExist
        .update({
          name: req.body.name,
          email: req.body.email,
          passwordHash: newPassword,
          phone: req.body.phone,
          isAdmin: req.body.isAdmin,
          street: req.body.street,
          apartment: req.body.apartment,
          zip: req.body.zip,
          city: req.body.city,
          country: req.body.country,
        })
        .then(() => res.status(200).json("User update successfully !"));
    })
    .catch(() => {
      return res.status(400).send("User not found!");
    });
});

export default router;
