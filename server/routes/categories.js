import express from "express";
import Category from "../models/category.js";

const router = express.Router();

router.get(`/`, (req, res) => {
  return Category.find().then((categoryList) => {
    if (!categoryList) {
      return res.status(500).json({ success: false });
    }
    return res.status(200).send(categoryList);
  });
});

export default router;
