import express from "express";
import Category from "../models/category.js";

const router = express.Router();

// get categories List
router.get(`/`, (req, res) => {
  return Category.find().then((categoryList) => {
    if (!categoryList) {
      return res.status(500).json({ success: false });
    }
    return res.status(200).send(categoryList);
  });
});

// find Category with ID
router.get("/:id", (req, res) => {
  return Category.findById(req.params.id).then((category) => {
    if (!category) {
      res
        .status(500)
        .json({ message: "The category with the given ID was not found." });
    }
    res.status(200).send(category);
  });
});

export default router;
