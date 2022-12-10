const express = require("express");
const productsRouter = express.Router();
const {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../db/models/products");

productsRouter.use((req, res, next) => {
  next();
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

const requireAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    next({
      name: "MissingAdminError",
      message: "You must be an admin to perform this action",
    });
  }
  next();
};

productsRouter.post("/", requireAdmin, async (req, res, next) => {
  try {
    const { name, description, imageURL, inventory, priceInCents } =
      req.body.product;

    const newProduct = await createProduct({
      name: name,
      description: description,
      imageURL: imageURL,
      inventory: inventory,
      priceInCents: priceInCents,
    });
    if (!req.user.isAdmin) {
      throw "must be admin";
    }
    res.send({ product: newProduct });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.patch("/:productId", requireAdmin, async (req, res, next) => {
  const { productId: id } = req.params;
  const { name, description, imageURL, inventory, priceInCents } = req.body;

  const updatedProduct = await updateProduct({
    id: id,
    name: name,
    description: description,
    imageURL: imageURL,
    inventory: inventory,
    priceInCents: priceInCents,
  });
  res.send(updatedProduct);
});

productsRouter.delete("/:productId", requireAdmin, async (req, res, next) => {
  const { productId } = req.params;
  const deletedProduct = await deleteProduct(productId);
  res.send({ message: "deletedProduct" });
});

module.exports = productsRouter;
