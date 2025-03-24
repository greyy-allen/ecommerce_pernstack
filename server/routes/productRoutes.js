import express from "express";
import { getAllProducts } from "../controllers/productController.js";
import { createProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/test", (req, res) => {
    res.send("test route")
});

// Get all
router.get("/", getAllProducts);

// Create a product
router.post("/", createProduct);


export default router;