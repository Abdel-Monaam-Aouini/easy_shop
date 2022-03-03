import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

// get categories List
router.get(`/`, (req, res) => {
  return Category.find()
    .then((categoryList) => res.status(200).json(categoryList))
    .catch(() => {
      return res.status(500).json({ success: false });
    });
});

// find Category with ID
router.get("/:id", (req, res) => {
  return Category.findById(req.params.id)
    .then((category) => {
      if (!category) {
        return res
          .status(500)
          .json({ message: "The category with the given ID was not found." });
      }
      return res.status(200).json(category);
    })
    .catch(() => {
      return res
        .status(500)
        .json({ message: "The category with the given ID was not found." });
    });
});

// create a new category
router.post("/", (req, res) => {
  const { name, icon, color } = req.body;
  return Category.create({ name, icon, color })
    .then((category) => res.status(200).json(category))
    .catch((err) => {
      console.log(`[ERROR] - error creating category: ${err.message}`);
      return res.status(400).send("the category cannot be created!");
    });
});

// Update category
router.put("/:id", (req, res) => {
  const { name, icon, color } = req.body;
  return Category.findByIdAndUpdate(
    req.params.id,
    {
      name,
      icon: icon || category.icon,
      color,
    },
    { new: true }
  )
    .then((category) => res.status(200).json(category))
    .catch(() => res.status(400).send("the category cannot be created!"));
});

//delete Category
router.delete("/:id", (req, res) => {
  console.log(req.params);
  return Category.findByIdAndRemove(req.params.id)
    .then(() => {
      return res
        .status(200)
        .json({ success: true, message: "the category is deleted!" });
    })
    .catch((err) => {
      console.log(err.message);
      return res
        .status(404)
        .json({ success: false, message: "category not found!" });
    });
});

export default router;
