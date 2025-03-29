import express from "express";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/test", (req, res) => {
    res.send("test route")
});

// Get all
router.get("/", getProducts);

// Get an item
router.get("/:id", getProduct);

// Create a product
router.post("/", createProduct);

// Update a product
router.put("/:id", updateProduct);

// Delete a product
router.delete("/:id", deleteProduct);

export default router;