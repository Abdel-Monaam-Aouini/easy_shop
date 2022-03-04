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
      path: "orderItems",
      populate: {
        path: "product",
        populate: "category",
      },
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

export default ordersRoutes;
