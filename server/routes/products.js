import express from "express";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import uploadFile from "../helpers/uploadFile.js";

const router = express.Router();

router.get(`/`, (req, res) => {
  let filter = {};
  if (req.query.categories) {
    console.log(req.query.categories);
    filter = { category: req.query.categories.split(",") };
  }

  return Product.find(filter)
    .populate("category")
    .then((productList) => {
      if (!productList) {
        return res.status(500).json({ success: false });
      }
      return res.status(200).json(productList);
    });
});

router.get(`/:id`, (req, res) => {
  return Product.findById(req.params.id)
    .populate("category")
    .then((product) => {
      if (!product) {
        return res.status(500).json({ success: false });
      }
      return res.status(200).json(product);
    });
});

router.post(`/`, uploadFile().single("image"), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send("No image in the request");
  }

  return Category.findById(req.body.category)
    .then((category) => {
      if (!category) {
        return res.status(400).send("Invalid Category");
      }
      if (category) {
        return Product.create({
          name: req.body.name,
          description: req.body.description,
          richDescription: req.body.richDescription,
          brand: req.body.brand,
          price: req.body.price,
          image: file.filename,
          category: req.body.category,
          countInStock: req.body.countInStock,
          rating: req.body.rating,
          numReviews: req.body.numReviews,
          isFeatured: req.body.isFeatured,
        })
          .then((product) => res.status(200).json(product))
          .catch(() => {
            return res.status(500).send("The product cannot be created");
          });
      }
    })
    .catch(() => {
      return res.status(400).send("Invalid Category");
    });
});

export default router;
