import express from "express";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import uploadFile from "../helpers/uploadFile.js";

const productsRoutes = express.Router();

productsRoutes.get(`/`, (req, res) => {
  let filter = {};
  if (req.query.categories) {
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

productsRoutes.get(`/:id`, (req, res) => {
  return Product.findById(req.params.id)
    .populate("category")
    .then((product) => {
      if (!product) {
        return res.status(500).json({ success: false });
      }
      return res.status(200).json(product);
    });
});

// create a new product
productsRoutes.post(`/`, uploadFile().single("image"), (req, res) => {
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

// Update Product
productsRoutes.put("/:id", uploadFile().single("image"), (req, res) => {
  return Category.findById(req.body.category)
    .then((category) => {
      if (!category) {
        return res.status(400).json({ message: "Invalid Category" });
      }
      return Product.findById(req.params.id)
        .then((product) => {
          if (!product) {
            return res.status(400).json({ message: "Invalid Product!" });
          }

          const file = req.file ? req.file.filename : product.image;

          return product
            .update({
              name: req.body.name,
              description: req.body.description,
              richDescription: req.body.richDescription,
              image: file,
              brand: req.body.brand,
              price: req.body.price,
              category: req.body.category,
              countInStock: req.body.countInStock,
              rating: req.body.rating,
              numReviews: req.body.numReviews,
              isFeatured: req.body.isFeatured,
            })
            .then(() =>
              res.status(200).json({ message: "Product updated successfully!" })
            )
            .catch(() =>
              res
                .status(500)
                .json({ message: "the product cannot be updated!" })
            );
        })
        .catch(() => res.status(400).json({ message: "Invalid Product!" }));
    })
    .catch(() => res.status(400).json({ message: "Invalid Category" }));
});

// delete product
productsRoutes.delete("/:id", (req, res) => {
  return Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "product not found!" });
      }
      return res
        .status(200)
        .json({ success: true, message: "the product is deleted!" });
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

productsRoutes.get(`/get/count`, (req, res) => {
  return Product.countDocuments()
    .then((productCount) => {
      if (!productCount) {
        return res.status(500).json({ success: false });
      }
      return res.status(200).json({
        success: true,
        productCount,
      });
    })
    .catch(() => {
      return res.status(500).json({ success: false });
    });
});

productsRoutes.put(
  "/gallery_images/:id",
  uploadFile().array("images", 10),
  (req, res) => {
    const images = req.files.map((file) => file.filename);

    return Product.findByIdAndUpdate(
      req.params.id,
      {
        images,
      },
      { new: true }
    )
      .then(() =>
        res
          .status(200)
          .json({ success: true, message: "gallery updated successfully!" })
      )
      .catch((err) => {
        console.log(err.message);
        return res.status(500).json({
          success: false,
          message: "the gallery cannot be updated!",
        });
      });
  }
);

export default productsRoutes;
