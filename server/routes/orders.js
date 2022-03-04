import express from "express";
import Order from "../models/Order.js";

const ordersRoutes = express.Router();

// GET Orders List
ordersRoutes.get(`/`, (req, res) => {
  return Order.find()
    .populate("user", "name")
    .sort({ dateOrdered: -1 })
    .then(() => {
      if (!orderList) {
        return res.status(500).json({ success: false });
      }
      return res.status(200).json({ success: true, data: orderList });
    })
    .catch((err) =>
      res.status(500).json({ success: false, message: err.message })
    );
});

// get Order By id
ordersRoutes.get(`/:id`, (req, res) => {
  return Order.findById(req.params.id)
    .populate("user", "name")
    .populate({
      path: "product",
      populate: "category",
    })
    .then((order) => {
      if (!order) {
        return res.status(500).json({ success: false });
      }
      return res.status(200).json({ success: true, data: order });
    })
    .catch((err) =>
      res.status(500).json({ success: false, message: err.message })
    );
});

// create a new order
ordersRoutes.post("/", (req, res) => {
  const {
    city,
    products,
    country,
    status,
    totalPrice,
    phone,
    user,
    quantity,
    zip,
    address,
  } = req.body;

  return Order.create({
    address,
    city,
    zip,
    country,
    phone,
    status,
    totalPrice,
    user,
    quantity,
    products,
  })
    .then((order) => res.status(200).json({ success: true, data: order }))
    .catch((err) =>
      res.status(400).json({ success: false, message: err.message })
    );
});

// update Status of order
router.put("/:id", (req, res) => {
  return Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true }
  )
    .then(() => res.status(200).json({ success: true }))
    .catch(() => res.status(400).send("the order cannot be updated!"));
});

export default ordersRoutes;
