import express from "express";
import Order from "../models/Order.js";

const ordersRoutes = express.Router();

ordersRoutes.get(`/`, (req, res) => {
  return Order.find()
    .populate("user", "name")
    .sort({ dateOrdered: -1 })
    .then(() => {
      if (!orderList) {
        res.status(500).json({ success: false });
      }
      res.status(200).json({ success: true, data: orderList });
    })
    .catch((err) =>
      res.status(500).json({ success: false, message: err.message })
    );
});

export default ordersRoutes;
